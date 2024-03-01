/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'genesis-api.keungz.com',
            port: '',
            pathname: '/ygpz/image/**',
         },
         {
            protocol: 'https',
            hostname: 'nft-cdn.alchemy.com',
            port: '',
            pathname: '/eth-mainnet/**',
         },
         {
            protocol: 'https',
            hostname: 'yogapetz.com',
            port: '',
            pathname: '/images/**',
         },
      ],
   },
};

export default nextConfig;
