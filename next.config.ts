import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  output: process.env.CONVEX_STATIC_EXPORT === "1" ? "export" : undefined,
  trailingSlash: process.env.CONVEX_STATIC_EXPORT === "1" ? true : undefined,
};

export default nextConfig;
