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
};

export default nextConfig;
