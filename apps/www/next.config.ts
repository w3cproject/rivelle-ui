import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@rivelle/registry-source", "motion"],
};

export default nextConfig;
