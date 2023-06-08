const MUSIC_URL = process.env.MUSIC_URL || "http://localhost:3001";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `/:path*`
      },
      {
        source: "/music",
        destination: `${MUSIC_URL}/music`
      },
      {
        source: "/music/:path*",
        destination: `${MUSIC_URL}/music/:path*`
      }
    ];
  }
};

module.exports = nextConfig;
