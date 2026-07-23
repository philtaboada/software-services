import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/presencia-digital",
        destination: "/",
        permanent: true,
      },
      {
        source: "/presencia-digital/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/presencia-catalogo",
        destination: "/",
        permanent: true,
      },
      {
        source: "/presencia-catalogo/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
