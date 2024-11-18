/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Add .jsx extension support
    config.resolve.extensions = ['.js', '.jsx', '.json'];
    
    // Configure the @ alias to point to root directory
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '.',
    };

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true, // This will ignore ESLint errors during production build
  },
};

export default nextConfig;
