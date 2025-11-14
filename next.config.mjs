/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.mediaeyenews.com',
      },
    ],
  },
};

export default nextConfig;
