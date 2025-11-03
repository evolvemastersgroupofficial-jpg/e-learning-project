/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  // 👇 ADD THIS
  tailwindConfig: "./tailwind.config.ts",
};

export default nextConfig;
