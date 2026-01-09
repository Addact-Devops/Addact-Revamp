// next.config.js
/** @type {import('next').NextConfig} */
const redirects = require("./redirects");

const perRouteCsp = [
  {
    // match path, trailing slash and subpaths
    source: "/hire-certified-sitecore-developer(.*)",
    headers: [
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self';",
          // minimal script hosts required for gtag/ads on this page
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://va.vercel-scripts.com  https://embed.tawk.to https://va.tawk.to;",
          "script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://va.vercel-scripts.com ;",
          "script-src-attr 'self' 'unsafe-inline' https://embed.tawk.to;",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://embed.tawk.to;",
          "style-src-elem 'self' 'unsafe-inline' https://embed.tawk.to https://fonts.googleapis.com;",
          "style-src-attr 'self' 'unsafe-inline';",
          // allow images from ad hosts & your cloudfront
          "img-src 'self' data: https://googleads.g.doubleclick.net https://www.googleadservices.com https://d3l7d9gtq0bnch.cloudfront.net https://embed.tawk.to https:;",
          "font-src 'self' https://fonts.gstatic.com https://embed.tawk.to;",
          // connect-src for analytics/ads
          "connect-src 'self' https://cms.addact.net https://www.google.com https://www.gstatic.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://stats.g.doubleclick.net https://googleads.g.doubleclick.net https://www.googleadservices.com https://va.vercel-scripts.com https://embed.tawk.to https://va.tawk.to https://*.clarity.ms wss://*.tawk.to;",
          "media-src 'self' https://cms.addact.net https://d3l7d9gtq0bnch.cloudfront.net https://va.tawk.to https://embed.tawk.to;",
          "frame-src 'self' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com  https://embed.tawk.to https://va.tawk.to https://www.youtube.com https://www.youtube-nocookie.com;",
          "object-src 'none';",
          "child-src https://embed.tawk.to https://va.tawk.to;",
          "base-uri 'self';",
          "form-action 'self';",
          "frame-ancestors 'none';",
          "upgrade-insecure-requests;",
        ].join(" "),
      },
    ],
  },
];

const globalCsp = [
  {
    source: "/(.*)",
    headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Content-Security-Policy",
        value: `
          default-src 'self';
          script-src
            'self' 'unsafe-inline' 'unsafe-eval'
              https://www.googletagmanager.com
              https://www.google-analytics.com
              https://www.google.com
              https://www.gstatic.com
              https://googleads.g.doubleclick.net
              https://www.googleadservices.com
              https://scripts.clarity.ms
              https://www.clarity.ms
              https://va.vercel-scripts.com
              https://va.tawk.to
              https://embed.tawk.to;

              script-src-elem
              'self' 'unsafe-inline' 'unsafe-eval'
              https://www.googletagmanager.com
              https://www.google-analytics.com
              https://www.google.com
              https://www.gstatic.com
              https://googleads.g.doubleclick.net
              https://www.googleadservices.com
              https://scripts.clarity.ms
              https://www.clarity.ms
              https://va.vercel-scripts.com
              https://va.tawk.to
              https://embed.tawk.to;

          script-src-attr 'self' 'unsafe-inline';

          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://embed.tawk.to;
          style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://embed.tawk.to;
          style-src-attr 'self' 'unsafe-inline';

          img-src 'self' data: https://embed.tawk.to https:;

          font-src 'self' https://embed.tawk.to https://fonts.gstatic.com;

          connect-src
            'self'
            https://cms.addact.net
            https://www.google.com
            https://www.gstatic.com
            https://www.google-analytics.com
            https://analytics.google.com
            https://region1.google-analytics.com
            https://stats.g.doubleclick.net
            https://googleads.g.doubleclick.net
            https://www.googleadservices.com
            https://va.vercel-scripts.com
            https://embed.tawk.to
            https://va.tawk.to
            https://*.clarity.ms
            wss://*.tawk.to
            wss:;

          media-src
            'self'
          https://cms.addact.net
          https://d3l7d9gtq0bnch.cloudfront.net
          https://va.tawk.to
          https://embed.tawk.to;

          frame-src
            'self'
          https://www.google.com
          https://www.gstatic.com
          https://www.googletagmanager.com
          https://embed.tawk.to
          https://va.tawk.to
          https://www.youtube.com
          https://www.youtube-nocookie.com;
          object-src 'none';
          base-uri 'self';
          form-action 'self';
          frame-ancestors 'none';
          upgrade-insecure-requests;

          child-src
          https://embed.tawk.to
          https://va.tawk.to;
        `
          .replace(/\s{2,}/g, " ")
          .trim(),
      },
      { key: "X-XSS-Protection", value: "1; mode=block" },
    ],
  },
];

const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["d3l7d9gtq0bnch.cloudfront.net"],
  },
  async redirects() {
    return redirects;
  },
  async headers() {
    // per-route header first (so it takes precedence), then the global header
    return [...perRouteCsp, ...globalCsp];
  },
  poweredByHeader: false,
};

module.exports = nextConfig;
