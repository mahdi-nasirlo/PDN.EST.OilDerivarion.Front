/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  reactStrictMode: false,
  experimental: {
    serverActions: true,
  }
};

module.exports = nextConfig;
