/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  reactStrictMode: false,
  output: "standalone",
  experimental: {
    serverActions: true,
  }
};

module.exports = nextConfig;
