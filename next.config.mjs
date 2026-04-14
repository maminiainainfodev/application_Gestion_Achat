
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.pexels.com" }],
  },
  // Configuration pour Ubuntu/Linux
  serverExternalPackages: ['@prisma/client'],

  // Optimisation pour le développement
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  // Turbopack configuration to avoid error when webpack is also configured
  turbopack: {

  },
  experimental: {
    // Optimisation pour les environnements Linux
  },
  // Variables d'environnement pour Ubuntu
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
