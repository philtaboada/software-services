import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  transpilePackages: ["remotion", "@remotion/player"],
  turbopack: {
    root: projectRoot,
    resolveAlias: {
      tailwindcss: path.join(projectRoot, "node_modules/tailwindcss"),
    },
  },
  outputFileTracingRoot: projectRoot,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "*.supabase.com" },
      { protocol: "https", hostname: "universidadeuropea.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "i.imgur.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Content-Language", value: "es" }],
      },
      {
        source: "/",
        headers: [{ key: "Content-Language", value: "es" }],
      },
      {
        source: "/en",
        headers: [{ key: "Content-Language", value: "en" }],
      },
      {
        source: "/en/:path*",
        headers: [{ key: "Content-Language", value: "en" }],
      },
    ];
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
      {
        source: "/carta/fu-man-chu",
        destination: "/carta",
        permanent: false,
      },
      {
        source: "/cartas",
        destination: "/carta-digital",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
