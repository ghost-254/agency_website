/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['oldvineyardbhs.com', 's33929.pcdn.co', 'www.pinerest.org', 'www.pexels.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
