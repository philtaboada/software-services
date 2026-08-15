import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "*.supabase.com" },
      { protocol: "https", hostname: "universidadeuropea.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "i.imgur.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/wavys-os",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wavys-os/:path*",
        destination: "/",
        permanent: true,
      },
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
