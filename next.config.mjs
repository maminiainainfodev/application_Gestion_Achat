import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.pexels.com" }],
  },
  // Configuration pour Ubuntu/Linux
  serverExternalPackages: ['@prisma/client'],

  // Webpack : en mode test (USE_MOCK_DB=true), on remplace le vrai client
  // Prisma par le mock JSON afin de pouvoir builder sans MySQL
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    return config;
  },
  // Turbopack configuration
  turbopack: {},
  experimental: {},
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;

