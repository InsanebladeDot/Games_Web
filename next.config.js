/** @type {import('next').NextConfig} */
const nextConfig = {
  // 添加实验性配置以解决client-reference-manifest问题
  experimental: {
    // 关闭部分优化以避免manifest问题
    optimizePackageImports: [],
  },
  // 使用正确的配置名称
  serverExternalPackages: [],
  // 配置图片域
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig; 