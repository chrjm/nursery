import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Images are pre-optimized to web-ready WebP at build time and committed to
    // public/, so we serve them as-is instead of paying for Vercel's runtime
    // image optimization (which stalled on first load with large sources).
    unoptimized: true,
  },
};

export default nextConfig;
