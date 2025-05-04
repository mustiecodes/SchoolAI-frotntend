// next.config.ts

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:3000/api/v1/:path*", // Proxy to backend
      },
    ];
  },
};

export default nextConfig;
