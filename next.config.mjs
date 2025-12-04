/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.mediaeyenews.com',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
      {
        protocol: 'http',
        hostname: 'gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'gravatar.com',
      },
      {
        protocol: 'http',
        hostname: '0.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: '0.gravatar.com',
      },
      {
        protocol: 'http',
        hostname: '1.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: '1.gravatar.com',
      },
      {
        protocol: 'http',
        hostname: '2.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: '2.gravatar.com',
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
