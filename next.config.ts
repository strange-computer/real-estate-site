import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wordpress-1244217-5800239.cloudwaysapps.com",
      },
    ],
  },
};

export default nextConfig;
