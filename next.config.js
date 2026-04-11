/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Allow images from AutoTrader's CDN
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.autotrader.co.uk',
      },
      {
        protocol: 'https',
        hostname: '**.autoimg.eu',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // remove after going live
      },
    ],
  },
};

module.exports = nextConfig;
