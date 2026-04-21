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

  // Webpack : configuration pour éviter les erreurs de modules côté client
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@prisma/client": false,
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
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

