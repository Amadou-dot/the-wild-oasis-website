import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dclaevazetcjjkrzczpc.supabase.co',
        port: '',
        // pathname: '/storage/v1/object/public/cabin-images/cabin-001.jpg',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        port: '',
        // pathname: '/w20/sn.png',
        search: '',
      },
    ],
  },
}

export default nextConfig;
