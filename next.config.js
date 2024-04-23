/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["cdn.discordapp.com", "live.staticflickr.com"],
  },
};

module.exports = nextConfig;
