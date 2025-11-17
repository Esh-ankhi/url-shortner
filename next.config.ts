import type { NextConfig } from "next";
import { Flamenco } from "next/font/google";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: false,
  images: {
      domains: ['avatars.githubusercontent.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
          port: '',
          pathname: '/u/**',
        },
      ],
    },
};

export default nextConfig;
