import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ⚠️ Warning: this will skip ESLint checks at build time
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  // Important: ensure Next.js uses relative URLs for assets
  assetPrefix: '',
  basePath: '',
};

export default nextConfig;
