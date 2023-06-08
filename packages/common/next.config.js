const MUSIC_URL = process.env.MUSIC_URL || "http://localhost:3001";
const TICKET_URL = process.env.TICKET_URL || "http://localhost:3002";

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
      },
      {
        source: "/ticket",
        destination: `${TICKET_URL}/ticket`
      },
      {
        source: "/ticket/:path*",
        destination: `${TICKET_URL}/ticket/:path*`
      }
    ];
  }
};

module.exports = nextConfig;
