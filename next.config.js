/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  api: {
    bodyParser: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],

    domains: ["localhost", "*", "img.youtube.com", "storage.googleapis.com"],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*", // path 주소
        destination: "http://api-liferary.duckdns.org/api/:path*",
        // destination: "http://localhost:8080/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
