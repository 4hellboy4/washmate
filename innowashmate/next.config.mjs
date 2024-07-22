/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable CSS support
  webpack(config) {
    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        'style-loader',
        'css-loader?modules',
        'postcss-loader',
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
