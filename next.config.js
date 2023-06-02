/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["jsx", "js"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8081",
        pathname: "/api/**/**",
      },
    ],
  },
};

module.exports = nextConfig;
