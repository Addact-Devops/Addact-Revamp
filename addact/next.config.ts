const redirects = require("./redirects");

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        domains: ["d3l7d9gtq0bnch.cloudfront.net"],
    },
    async redirects() {
        return redirects;
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    {
                        key: "Content-Security-Policy",
                        value: `
            default-src 'self';
            script-src 'self' 'unsafe-inline' 'unsafe-eval'
              https://www.googletagmanager.com
              https://www.google-analytics.com
              https://www.google.com
              https://www.gstatic.com
              https://code.tidio.co
              https://scripts.clarity.ms
              https://www.clarity.ms;
            script-src-elem 'self' 'unsafe-inline' 'unsafe-eval'
              https://www.googletagmanager.com
              https://www.google-analytics.com
              https://www.google.com
              https://www.gstatic.com
              https://code.tidio.co
              https://scripts.clarity.ms
              https://www.clarity.ms;
            script-src-attr 'self' 'unsafe-inline';
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
            style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
            style-src-attr 'self' 'unsafe-inline';
            img-src 'self' data: https:;
            font-src 'self' https://fonts.gstatic.com https://code.tidio.co;
            connect-src 'self'
              https://cms.addact.net
              https://www.google.com
              https://www.gstatic.com
              https://www.google-analytics.com
              https://analytics.google.com
              https://region1.google-analytics.com
              https://stats.g.doubleclick.net
              https://code.tidio.co
              https://*.clarity.ms
              wss://socket.tidio.co
              wss:;
            media-src 'self'
              https://cms.addact.net
              https://d3l7d9gtq0bnch.cloudfront.net
              https://code.tidio.co;
            frame-src 'self'
              https://www.google.com
              https://www.gstatic.com
              https://www.googletagmanager.com
              https://code.tidio.co
              https://www.youtube.com
              https://www.youtube-nocookie.com;
            object-src 'none';
            base-uri 'self';
            form-action 'self';
            frame-ancestors 'none';
            upgrade-insecure-requests;
          `
                            .replace(/\s{2,}/g, " ")
                            .trim(),
                    },
                    { key: "X-Frame-Options", value: "SAMEORIGIN" },
                    { key: "X-XSS-Protection", value: "1; mode=block" },
                ],
            },
        ];
    },
    poweredByHeader: false,
};

module.exports = nextConfig;
