/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' to enable server environment
  // This allows middleware, API routes, and full Next.js features
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/images/**',
      },
    ],
  },
  // Removed experimental.appDir - no longer needed in Next.js 15+
};

module.exports = nextConfig;
