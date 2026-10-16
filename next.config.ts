import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
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
};

export default nextConfig;
