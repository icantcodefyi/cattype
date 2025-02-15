import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cdn2.thecatapi.com',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
