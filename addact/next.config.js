// next.config.js
/** @type {import('next').NextConfig} */
const redirects = require("./redirects");

/* -------------------- PER ROUTE CSP -------------------- */

const perRouteCsp = [
  {
    source: "/hire-certified-sitecore-developer(.*)",
    headers: [
      {
        key: "Content-Security-Policy",
        value:
          "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://www.googletagmanager.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://va.vercel-scripts.com https://widget-v4.tidiochat.com https://code.tidio.co; script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://va.vercel-scripts.com https://widget-v4.tidiochat.com https://code.tidio.co; script-src-attr 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://widget-v4.tidiochat.com; style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://widget-v4.tidiochat.com; style-src-attr 'self' 'unsafe-inline'; img-src 'self' data: https://googleads.g.doubleclick.net https://widget-v4.tidiochat.com https://www.googleadservices.com https://d3l7d9gtq0bnch.cloudfront.net https:; font-src 'self' https://fonts.gstatic.com https://code.tidio.co; connect-src 'self' https://cms.addact.net https://api.tidio.co https://widget-v4.tidiochat.com https://code.tidio.co wss://socket.tidio.co https://uatcms.addact.net:9443 https://www.google.com https://www.gstatic.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://stats.g.doubleclick.net https://googleads.g.doubleclick.net https://www.googleadservices.com https://va.vercel-scripts.com https://widget-v4.tidiochat.com https://www.googletagmanager.com https://*.clarity.ms wss://*.tawk.to; media-src 'self' https://cms.addact.net https://uatcms.addact.net:9443 https://d3l7d9gtq0bnch.cloudfront.net https://widget-v4.tidiochat.com https://code.tidio.co; frame-src 'self' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://widget-v4.tidiochat.com https://www.youtube.com https://www.youtube-nocookie.com; object-src 'none'; child-src https://widget-v4.tidiochat.com; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;",
      },
    ],
  },
];

/* -------------------- GLOBAL CSP -------------------- */

const globalCsp = [
  {
    source: "/(.*)",
    headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Content-Security-Policy",
        value:
          "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://scripts.clarity.ms https://www.clarity.ms https://va.vercel-scripts.com https://widget-v4.tidiochat.com https://code.tidio.co; script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://scripts.clarity.ms https://www.clarity.ms https://va.vercel-scripts.com https://widget-v4.tidiochat.com https://code.tidio.co; script-src-attr 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://widget-v4.tidiochat.com https://fonts.googleapis.com; style-src-elem 'self' 'unsafe-inline' https://widget-v4.tidiochat.com https://fonts.googleapis.com; style-src-attr 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com https://code.tidio.co; connect-src 'self' https://cms.addact.net https://uatcms.addact.net:9443 https://www.google.com https://api.tidio.co https://widget-v4.tidiochat.com https://code.tidio.co wss://socket.tidio.co https://www.gstatic.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://stats.g.doubleclick.net https://googleads.g.doubleclick.net https://www.googleadservices.com https://va.vercel-scripts.com https://widget-v4.tidiochat.com https://www.googletagmanager.com https://*.clarity.ms wss://socket.tidio.co; media-src 'self' https://cms.addact.net https://uatcms.addact.net:9443 https://d3l7d9gtq0bnch.cloudfront.net https://widget-v4.tidiochat.com https://code.tidio.co; frame-src 'self' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://widget-v4.tidiochat.com https://www.youtube.com https://www.youtube-nocookie.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests; child-src https://widget-v4.tidiochat.com;",
      },
      { key: "X-XSS-Protection", value: "1; mode=block" },
    ],
  },
];

const nextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: true,
    domains: ["d3l7d9gtq0bnch.cloudfront.net"],
  },

  async redirects() {
    return redirects;
  },

  async headers() {
    return [...perRouteCsp, ...globalCsp];
  },

  poweredByHeader: false,
};

module.exports = nextConfig;
