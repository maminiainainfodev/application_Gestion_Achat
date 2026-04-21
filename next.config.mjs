import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration des images
  images: {
    remotePatterns: [{ hostname: "images.pexels.com" }],
  },

  // Webpack configuration
  webpack: (config) => {
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
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
