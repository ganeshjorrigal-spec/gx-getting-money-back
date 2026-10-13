import { describe, it, expect, vi } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { d045Assets, d047Assets,assertFinalCapacity,assets, pendingAssets, assertCapacity, assertPaidApproval, generateOnceWithRetry, main } from "../scripts/design-images.mjs";

const locked = { paidRunApproved: false, pickedLogo: null, illustrationsApproved: false };
it('D-047 edits only the five selected drafts at high quality, with transparency only for the mascot',()=>{const list=d047Assets('paper');expect(list).toHaveLength(5);expect(list.filter(a=>a.transparent).map(a=>a.id)).toEqual(['mascot']);expect(list[0].reference).toBe('d045-mascot-6.webp.source.png');expect(list.every(a=>a.prompt.includes('preserve composition'))).toBe(true);expect(list.some(a=>a.id.includes('logo'))).toBe(false);});
it('one-attempt finals policy fits within the existing cap without widening it',()=>{expect(()=>assertFinalCapacity({attempts:31,images:31,entries:[]},5)).not.toThrow();expect(()=>assertFinalCapacity({attempts:37,images:37,entries:[]},4)).toThrow();expect(()=>assertFinalCapacity({attempts:40,images:40,entries:[]},1)).toThrow();expect(()=>assertFinalCapacity({attempts:1,images:2,entries:[]},0)).toThrow();});
describe("manual build-time images", () => {
  it("plans twelve low-quality drafts at the smallest valid square", () => {
    const plan = assets("paper", "draft", locked);
    expect(plan).toHaveLength(12);
    expect(plan.every(a => a.size === "816x816" && a.quality === "low")).toBe(true);
    expect(816 * 816).toBeGreaterThanOrEqual(655360);
    expect(800 * 800).toBeLessThan(655360);
  });
  it("skips final files and raw sources after interrupted local processing", () => {
    const plan = assets("paper", "draft", locked);
    const present = new Set([plan[0].path, plan[1].path + ".source.png"]);
    expect(pendingAssets(plan, p => present.has(p)).map(a => a.id)).not.toContain(plan[0].id);
    expect(pendingAssets(plan, p => present.has(p))).toHaveLength(10);
  });
  it("reserves cap room for retries and rejects invalid spend records", () => {
    expect(() => assertCapacity({ attempts: 39, images: 30, entries: [] }, 1)).toThrow();
    expect(() => assertCapacity({ attempts: 0, images: 1, entries: [] }, 0)).toThrow();
    expect(() => assertCapacity({ attempts: 16, images: 12, entries: [] }, 12)).not.toThrow();
  });
  it("locks paid work in CI/tests and finals before picks", () => {
    expect(() => assertPaidApproval(locked, {})).toThrow();
    expect(() => assertPaidApproval({ ...locked, paidRunApproved: true }, { CI: "true" })).toThrow();
    expect(() => assertPaidApproval({ ...locked, paidRunApproved: true }, { VITEST: "true" })).toThrow();
    expect(() => assets("paper", "final", locked)).toThrow();
    expect(assets("paper", "final", { paidRunApproved: true, pickedLogo: 2, illustrationsApproved: true })).toHaveLength(5);
  });
  it("makes at most two attempts and stops the batch on failure", async () => {
    const call = vi.fn().mockRejectedValue(new Error("synthetic"));
    const reserve = vi.fn();
    await expect(generateOnceWithRetry(call, reserve)).rejects.toThrow("failed twice");
    expect(call).toHaveBeenCalledTimes(2);
    expect(reserve).toHaveBeenCalledTimes(2);
  });
  it("dry run does not call the network or change the ledger", async () => {
    const root = mkdtempSync(join(tmpdir(), "refundgenie-images-"));
    mkdirSync(join(root, "docs/design"), { recursive: true });
    mkdirSync(join(root, "design"));
    const ledger = '{"attempts":0,"images":0,"entries":[]}';
    writeFileSync(join(root, "docs/design/image-spend.json"), ledger);
    writeFileSync(join(root, "docs/design/image-approval.json"), JSON.stringify(locked));
    writeFileSync(join(root, "design/style-anchor.md"), "paper");
    const network = vi.fn().mockRejectedValue(new Error("Network must not run"));
    vi.stubGlobal("fetch", network);
    const output = vi.spyOn(console, "log").mockImplementation(() => {});
    try {
      await main(["--dry-run"], root);
      expect(network).not.toHaveBeenCalled();
      expect(readFileSync(join(root, "docs/design/image-spend.json"), "utf8")).toBe(ledger);
      expect(JSON.parse(output.mock.calls[0][0]).count).toBe(12);
      await expect(main(["--generate"], root)).rejects.toThrow("locked");
      expect(network).not.toHaveBeenCalled();
    } finally { output.mockRestore(); vi.unstubAllGlobals(); rmSync(root, { recursive: true }); }
  });
});

it('D-045 plans only twelve new low drafts and original-character constraints',()=>{const list=d045Assets('paper');expect(list).toHaveLength(12);expect(list.filter(a=>a.id.includes('logo'))).toHaveLength(4);expect(list.filter(a=>a.id.includes('mascot'))).toHaveLength(6);expect(list.every(a=>a.quality==='low'&&a.size==='816x816'&&a.path.startsWith('docs/design/'))).toBe(true);expect(list.every(a=>a.prompt.includes('no reference image copied'))).toBe(true);expect(list.filter(a=>a.id.includes('on-hold')||a.id.includes('refund-coming')).every(a=>/no airport/i.test(a.prompt))).toBe(true);expect(()=>assertCapacity({attempts:12,images:12,entries:[]},list.length)).not.toThrow();});
