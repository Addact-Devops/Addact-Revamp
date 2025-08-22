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
                source: "/(.*)", // apply to all routes
                headers: [
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "Content-Security-Policy",
                        value: `default-src 'self';
                                script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com;
                                style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                                font-src 'self' https://fonts.gstatic.com;
                                img-src 'self' data: https:;
                                connect-src 'self' https://www.google-analytics.com https://api.example.com;
                                frame-src 'self' https://www.youtube.com https://player.vimeo.com;
                                object-src 'none';
                                base-uri 'self';
                                form-action 'self';
                                frame-ancestors 'none';
                                upgrade-insecure-requests;`
                            .replace(/\s{2,}/g, " ")
                            .trim(),
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                ],
            },
        ];
    },
    poweredByHeader: false,
};

module.exports = nextConfig;
