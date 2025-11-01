/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: "/",      // for next/font compatibility
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
