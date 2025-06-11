/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  output: 'export',
  distDir: 'build',
  images: {
    unoptimized: true,
  },
  // Optional: Change the output directory to 'out' if you prefer
  // distDir: 'out',
};

module.exports = nextConfig;
