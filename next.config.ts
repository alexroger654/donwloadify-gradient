import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ⚠️ Warning: this will skip ESLint checks at build time
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
