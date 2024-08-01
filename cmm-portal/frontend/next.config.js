/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable React Strict Mode
  images: {
    domains: ["lh3.googleusercontent.com", "images.unsplash.com","cdn.dribbble.com",],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    if (config.cache && !dev) {
      config.cache = Object.freeze({
        type: 'memory'
      });
      config.cache.maxMemoryGenerations = 0;
    }
    return config;
  },
};

module.exports = nextConfig;