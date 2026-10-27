import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const IMMUTABLE_CACHE = [
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
];

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  turbopack: {
    rules: {
      "*.css": {
        // Tailwind loader only for plain stylesheets. `*.module.css` must be
        // skipped, otherwise Turbopack stops treating them as CSS Modules and
        // `styles.*` resolves to `undefined`. `path` is matched against the
        // project-relative path, so use a RegExp (a glob like `*.module.css`
        // would never match `src/components/X.module.css`).
        condition: { not: { path: /\.module\.css$/ } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      // The /bikes listing page was removed; keep old links working by
      // sending them to the "Discover your ride" section on the home page.
      { source: "/bikes", destination: "/#ride", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      { source: "/assets/:path*", headers: IMMUTABLE_CACHE },
      { source: "/tvs/:path*", headers: IMMUTABLE_CACHE },
      { source: "/Website_Logo/:path*", headers: IMMUTABLE_CACHE },
      { source: "/Favicons/:path*", headers: IMMUTABLE_CACHE },
      { source: "/360/:path*", headers: IMMUTABLE_CACHE },
      { source: "/models/:path*", headers: IMMUTABLE_CACHE },
    ];
  },
};

export default nextConfig;
