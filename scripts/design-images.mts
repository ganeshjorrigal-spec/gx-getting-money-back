import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { pathToFileURL } from "node:url";

export const MODEL = "gpt-image-2.5-flare";
export const CAP = 40;
const source = "https://developers.openai.com/api/docs/guides/image-generation";
const logoIdeas = ["a receipt folded into a small genie lamp", "a lamp with a returning arrow as its handle", "a receipt curl forming a returning arrow", "a lamp silhouette with a receipt-shaped flame", "a folded receipt cradled by a return arrow", "a lamp spout and a receipt notch in one silhouette", "a circular return arrow enclosing a tiny lamp", "a single receipt ribbon forming a lamp"];
const scenes = [
  { id: "airport", subject: "A young Indian woman at an airport departures board, phone in hand. A crossed flight symbol conveys cancellation; absolutely no lettering.", alt: "A traveller checks her phone beside a cancelled-flight symbol at an airport." },
  { id: "on-hold", subject: "An Indian man at home on a phone call, waiting on hold with a tired but composed expression.", alt: "A traveller waits on hold with customer care." },
  { id: "refund-coming", subject: "An Indian person at home reading a phone with a calm, relieved expression.", alt: "A traveller feels relieved after reading a refund update." },
  { id: "family", subject: "An Indian family of three with travel bags looking at one phone together.", alt: "A family checks a travel update together beside their bags." },
];
export type Asset = { id: string; path: string; quality: "low" | "high"; size: string; outputUsd: number; prompt: string; alt?: string };
export type Ledger = { attempts: number; images: number; entries: { id: string; model: string; size: string; quality: string; status: string }[] };
type Approval = { paidRunApproved: boolean; pickedLogo: number | null; illustrationsApproved: boolean };

export function assets(anchor: string, stage: "draft" | "final", approval: Approval): Asset[] {
  const quality = stage === "draft" ? "low" : "high";
  // 816 is the smallest multiple of 16 whose square is at least 655,360 pixels.
  const size = stage === "draft" ? "816x816" : "1024x1024";
  // Official interactive calculator, checked 13 Oct 2026: 171 / 1,756 output tokens.
  const outputUsd = stage === "draft" ? 0.00513 : 0.05268;
  if (stage === "final" && (!approval.illustrationsApproved || !Number.isInteger(approval.pickedLogo) || approval.pickedLogo! < 1 || approval.pickedLogo! > 8)) throw new Error("Finals wait for Ganesh's logo pick and illustration approval.");
  const logos = stage === "draft" ? logoIdeas.map((idea, i) => ({ idea, n: i + 1 })) : [{ idea: logoIdeas[approval.pickedLogo! - 1], n: approval.pickedLogo! }];
  return [
    ...logos.map<Asset>(({ idea, n }) => ({ id: `logo-${n}-${stage}`, path: `docs/design/logo-candidates/logo-${n}${stage === "final" ? "-final" : ""}.png`, quality, size, outputUsd, prompt: `${anchor}\nSubject: A simple navy mark: ${idea}. Works at 32px; one silhouette, no letters or wordmark. Composition: centered mark on warm paper, clear margins. Light and materials as above. No gradients, 3D or embellishment.` })),
    ...scenes.map<Asset>(scene => ({ id: `${scene.id}-${stage}`, path: stage === "draft" ? `docs/design/logo-candidates/${scene.id}-draft.webp` : `public/illustrations/${scene.id}.webp`, quality, size, outputUsd, alt: scene.alt, prompt: `${anchor}\nSubject: ${scene.subject}\nComposition: simple square scene; subject in the right two thirds, left third remains clear. Light and matte materials as above. No text, brands, gradients, 3D, neon or photorealism.` })),
  ];
}
export function pendingAssets(list: Asset[], existing: (path: string) => boolean) { return list.filter(a => !existing(a.path) && !existing(a.path + ".source.png")); }
export function assertCapacity(ledger: Ledger, pending: number) {
  if (!Number.isInteger(ledger.attempts) || !Number.isInteger(ledger.images) || ledger.attempts < 0 || ledger.images < 0 || ledger.images > ledger.attempts || ledger.attempts + pending * 2 > CAP) throw new Error("40-image cap: not enough room, including one retry per asset. Stop and report.");
}
export function assertPaidApproval(approval: Approval, env: Record<string, string | undefined>) {
  if (env.CI || env.VITEST || !approval.paidRunApproved) throw new Error("Paid generation is locked. Ganesh must say go in chat; never run from tests, CI or deploy.");
}
export async function generateOnceWithRetry(call: () => Promise<Uint8Array>, attempt: () => void) {
  for (let n = 0; n < 2; n++) {
    attempt();
    try { return await call(); } catch { if (n === 1) throw new Error("Image API failed twice. Stopped; no response body or key logged."); }
  }
  throw new Error("Stopped.");
}
function saveLedger(root: string, ledger: Ledger) {
  writeFileSync(resolve(root, "docs/design/image-spend.json"), JSON.stringify(ledger, null, 2) + "\n");
  writeFileSync(resolve(root, "docs/design/image-spend.md"), `# Image spend\n\nImages made: ${ledger.images}\nAPI attempts reserved/made: ${ledger.attempts} / ${CAP}\n\nErrors and interrupted attempts also consume cap room. No raw API response, prompt, key or personal data is logged.\n\n| Asset | Model | Size | Quality | Status |\n|---|---|---|---|---|\n` + ledger.entries.map(e => `| ${e.id} | ${e.model} | ${e.size} | ${e.quality} | ${e.status} |`).join("\n") + "\n");
}
export function writeReview(root: string) {
  mkdirSync(resolve(root, "docs/design/logo-candidates"), { recursive: true });
  const image = (file: string, alt: string, width: number) => existsSync(resolve(root, `docs/design/logo-candidates/${file}`)) ? `<img src="${file}" alt="${alt}" width="${width}">` : `<span class="pending">Awaiting approved generation</span>`;
  const marks = logoIdeas.map((idea, i) => `<section><h2>Mark ${i + 1}: ${idea}</h2>${[32, 64, 48].map(width => `<div class="lockup">${image(`logo-${i + 1}.png`, `Logo candidate ${i + 1}`, width)}<span class="wordmark">Refund Genie</span><small>${width}px mark</small></div>`).join("")}</section>`).join("");
  const illustrations = scenes.map(scene => `<section><h2>${scene.id}</h2>${image(`${scene.id}-draft.webp`, scene.alt, 240)}<p>${scene.alt}</p></section>`).join("");
  writeFileSync(resolve(root, "docs/design/logo-candidates/index.html"), `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Refund Genie asset review</title><style>@font-face{font-family:Fraunces;src:url(fraunces-latin.woff2) format("woff2");font-weight:500 700;font-display:swap}body{background:#f7f6f1;color:#14213d;font:16px system-ui;margin:24px;max-width:1100px}h1,.wordmark{font-family:Fraunces,Georgia,serif}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}section{background:white;border:1px solid #d9d8ce;border-radius:12px;padding:16px}h2{font-size:18px}.lockup{display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin:16px 0}.wordmark{font-size:24px}small,.pending{color:#6a7067;font-size:12px}img{height:auto;max-width:100%}</style><h1>Refund Genie asset review</h1><p>Drafts wait for Ganesh's go. Nothing here is on the product pages. Pick one logo and approve the four illustrations before any high-quality final run. Wordmark is set in type; the chosen mark still needs SVG tracing and a favicon.</p><div class="grid">${marks}${illustrations}</div></html>`);
  writeFileSync(resolve(root, "docs/design/illustration-alt.json"), JSON.stringify(Object.fromEntries(scenes.map(scene => [scene.id, scene.alt])), null, 2) + "\n");
}
export async function main(args: string[], root = process.cwd()) {
  if (args.some(a => !["--dry-run", "--generate", "--final"].includes(a)) || args.includes("--dry-run") === args.includes("--generate")) throw new Error("Use --dry-run only tonight. Generation needs separately recorded chat approval.");
  const approval: Approval = JSON.parse(readFileSync(resolve(root, "docs/design/image-approval.json"), "utf8"));
  const ledger: Ledger = JSON.parse(readFileSync(resolve(root, "docs/design/image-spend.json"), "utf8"));
  const list = assets(readFileSync(resolve(root, "design/style-anchor.md"), "utf8"), args.includes("--final") ? "final" : "draft", approval);
  const pending = pendingAssets(list, p => existsSync(resolve(root, p)));
  assertCapacity(ledger, pending.length);
  const outputUsd = pending.reduce((sum, a) => sum + a.outputUsd, 0);
  const textTokenEstimate = pending.reduce((sum, a) => sum + Math.ceil(a.prompt.length / 4), 0);
  console.log(JSON.stringify({ mode: args.includes("--dry-run") ? "dry-run" : "generate", model: MODEL, count: pending.length, skippedExisting: list.length - pending.length, size: list[0].size, quality: list[0].quality, estimatedOutputUsd: Number(outputUsd.toFixed(5)), estimatedPromptUsd: textTokenEstimate * 5 / 1_000_000, estimateBasis: "Official calculator output + rough characters/4 text tokens; no image inputs, retries or tax. Actual usage may differ.", maxAttempts: pending.length * 2, cap: CAP, spentImages: ledger.images, source, paidRunApproved: approval.paidRunApproved }, null, 2));
  if (args.includes("--dry-run")) return; // No env access, network, writes or image work.
  assertPaidApproval(approval, process.env);
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("Missing local image API key. Stop; never paste it into chat.");
  // Load before any paid call so local dependencies cannot cause a paid rerun.
  const sharp = (await import("sharp")).default;
  for (const asset of pending) {
    const path = resolve(root, asset.path);
    if (existsSync(path) || existsSync(path + ".source.png")) continue;
    const bytes = await generateOnceWithRetry(async () => {
      const result = await fetch("https://api.openai.com/v1/images/generations", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: MODEL, prompt: asset.prompt, n: 1, size: asset.size, quality: asset.quality, output_format: "png" }), signal: AbortSignal.timeout(240_000) });
      if (!result.ok) throw new Error("Image request failed.");
      const payload = await result.json() as { data?: { b64_json?: string }[] };
      if (!payload.data?.[0]?.b64_json) throw new Error("Image missing.");
      return Buffer.from(payload.data[0].b64_json, "base64");
    }, () => {
      if (ledger.attempts >= CAP) throw new Error("40-image cap reached.");
      ledger.attempts++;
      ledger.entries.push({ id: asset.id, model: MODEL, size: asset.size, quality: asset.quality, status: "attempt reserved" });
      saveLedger(root, ledger); // Durable before the request, even if the process stops.
    });
    mkdirSync(dirname(path), { recursive: true });
    // Save the API source before local processing; an interrupted conversion never regenerates.
    const raw = path + ".source.png";
    writeFileSync(raw, bytes, { flag: "wx" });
    ledger.images++;
    ledger.entries[ledger.entries.length - 1].status = "source saved";
    saveLedger(root, ledger);
    if (path.endsWith(".webp")) {
      let converted = await sharp(bytes).resize({ width: 816, withoutEnlargement: true }).webp({ quality: 75 }).toBuffer();
      if (converted.length >= 120_000) converted = await sharp(bytes).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 60 }).toBuffer();
      if (converted.length >= 120_000) throw new Error("WebP exceeds 120 KB. Source saved; do not regenerate. Compress locally before resuming.");
      writeFileSync(path, converted, { flag: "wx" });
    } else writeFileSync(path, bytes, { flag: "wx" });
    ledger.entries[ledger.entries.length - 1].status = "file saved";
    saveLedger(root, ledger);
    writeReview(root);
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main(process.argv.slice(2)).catch(() => { console.error("Stopped. Check approvals, cap, files and local configuration. No key or API response logged."); process.exitCode = 1; });
}
