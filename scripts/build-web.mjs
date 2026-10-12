import { spawnSync } from "node:child_process";

const result = spawnSync(process.execPath, ["scripts/build.mjs"], {
  stdio: "inherit",
  env: { ...process.env, CONVEX_STATIC_EXPORT: "1" },
});
process.exit(result.status ?? 1);
