import type { NextConfig } from 'next';

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
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Add fallbacks for node: protocol imports
    config.resolve.fallback = {
      ...config.resolve.fallback,
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      buffer: require.resolve('buffer'),
      fs: false,
      path: false,
    };
    
    return config;
  },
};

export default nextConfig;
// inaccessible