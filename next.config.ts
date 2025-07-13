import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.*.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "husgscknsf.ufs.sh",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "replicate.com",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
    ],
  },
};

export default nextConfig;
