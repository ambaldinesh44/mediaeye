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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://static.cloudflareinsights.com; connect-src 'self' https://static.cloudflareinsights.com https://cloudflareinsights.com https://www.mediaeyenews.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
