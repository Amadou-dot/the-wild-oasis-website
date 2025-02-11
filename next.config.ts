import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'deoggkjujqaqtmcjyocp.supabase.co',
        pathname: '/storage/v1/object/public/cabin-images/*',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
  },
}

export default nextConfig;
