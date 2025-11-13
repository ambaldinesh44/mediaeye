/** @type {import('next').NextConfig} */
const nextConfig = {
   basePath: "/beta",
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
