import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const env = { ...process.env };
if (env.VITE_CONVEX_URL) {
  env.NEXT_PUBLIC_CONVEX_URL = env.VITE_CONVEX_URL;
  env.CONVEX_STATIC_EXPORT = "1";
}
const result = spawnSync(process.execPath, [require.resolve("next/dist/bin/next"), "build"], {
  stdio: "inherit",
  env,
});
process.exit(result.status ?? 1);
