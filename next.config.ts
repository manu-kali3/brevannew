import type { NextConfig } from "next";

// React/Next dev tools (Fast Refresh, callstack reconstruction) need eval()
// in development only. Production keeps the strict policy.
const IS_DEV = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [
      // Long-lived caching for static media so repeat visits — and the
      // Lighthouse "efficient cache lifetimes" audit — don't re-download
      // them. CSS keeps a short cache so styling deploys land quickly.
      {
        source: "/assets/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/vendor/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/assets/css/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=600" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com${IS_DEV ? " 'unsafe-eval'" : ""}`,
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com",
              "frame-src 'self' https://www.youtube.com https://www.google.com https://maps.google.com https://www.googletagmanager.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
