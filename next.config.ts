import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all https hosts
      },
      {
        protocol: "http",
        hostname: "**", // allow all http hosts
      },
    ],
    dangerouslyAllowSVG: true, // optional if you want to support SVGs
  },
};

export default nextConfig;
