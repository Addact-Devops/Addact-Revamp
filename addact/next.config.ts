const redirects = require("./redirects");

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["d3l7d9gtq0bnch.cloudfront.net"],
    },
    async redirects() {
        return redirects;
    },
};

module.exports = nextConfig;
