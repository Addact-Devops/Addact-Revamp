import { NextResponse } from "next/server";
import { gql } from "graphql-request";
import client from "@/graphql/client";

import { getAllBlogs } from "@/graphql/queries/getAllBlog";
import { getAllCaseStudyData } from "@/graphql/queries/getAllCaseStudy";
import { getEventListPageData } from "@/graphql/queries/getEventList";
import { getRecentPressRelease } from "@/graphql/queries/getRecentPressRelease";

// Utility to escape special characters
function escapeXml(str: string) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// GraphQL: Careers
const GET_ALL_CAREER_SLUGS = gql`
    query GetAllCareers {
        careerDetails(pagination: { page: 1, pageSize: 100 }) {
            Slug
        }
    }
`;

// GraphQL: Sub-Service Pages (slugs only)
const GET_ALL_SUB_SERVICE_SLUGS = gql`
    query GetAllSubServiceSlugs {
        subServicePages(pagination: { page: 1, pageSize: 100 }) {
            Slug
        }
    }
`;

export async function GET() {
    const baseUrl = "https://addact.net/";

    const staticUrls = [
        "",
        "about-us",
        "blogs",
        "brand-guidelines",
        "careers",
        "contact-us",
        "contentful-cms-development",
        "contentstack-cms-development",
        "events",
        "kentico-cms-development",
        "portfolio",
        "press-releases",
        "privacy-policy",
        "sitecore-cms-development",
        "strapi-cms-development",
        "terms-of-use",
        "sitemap",
        "umbraco-cms-development",
        "videos",
        "webinar",
    ];

    // Blogs
    const blogData = await getAllBlogs();
    const blogUrls = blogData.addactBlogs
        .map((b) => b.Slug?.replace(/^\//, ""))
        .filter(Boolean)
        .map((slug) => `blogs/${slug}`);

    // Case Studies
    const caseStudyData = await getAllCaseStudyData();
    const caseStudyUrls = caseStudyData.addactCaseStudies
        .map((s) => `portfolio/${s.Slug?.replace(/^\//, "")}`)
        .filter(Boolean);

    // Careers
    const careerData = await client.request<{ careerDetails: { Slug: string }[] }>(GET_ALL_CAREER_SLUGS);
    const careerUrls = careerData.careerDetails.map((c) => c.Slug?.replace(/^\//, "")).filter(Boolean);

    // Events
    const eventData = await getEventListPageData();
    const eventUrls = eventData.addactsEvents.map((e) => `events/${e.Slug?.replace(/^\//, "")}`).filter(Boolean);

    // Press Releases
    const pressData = await getRecentPressRelease({
        pagination: { limit: 100 },
        sort: ["createdAt:desc"],
    });
    const pressUrls = pressData.addactPressReleases
        .map((p) => `press-releases/${p.Slug?.replace(/^\//, "")}`)
        .filter(Boolean);

    // Sub-Service Pages – use mapping based on slug name
    const subServiceData = await client.request<{ subServicePages: { Slug: string }[] }>(GET_ALL_SUB_SERVICE_SLUGS);

    const platformKeywords = [
        "sitecore-cms-development",
        "kentico-cms-development",
        "strapi-cms-development",
        "umbraco-cms-development",
        "contentful-cms-development",
        "contentstack-cms-development",
    ];

    const subServiceUrls = subServiceData.subServicePages
        .map((s) => s.Slug?.replace(/^\//, "").trim())
        .filter(Boolean)
        .map((slug) => {
            const keyword = platformKeywords.find((k) => slug.toLowerCase().includes(k));
            return keyword ? `${keyword}/${slug}` : null;
        })
        .filter(Boolean) as string[];

    // Combine all
    const allUrls = [
        ...staticUrls,
        ...blogUrls,
        ...caseStudyUrls,
        ...careerUrls,
        ...eventUrls,
        ...pressUrls,
        ...subServiceUrls,
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
    .map((path) => {
        const url = `${baseUrl}${path}`;
        return `
  <url>
    <loc>${escapeXml(url)}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`;
    })
    .join("")}
</urlset>`;

    return new NextResponse(sitemap, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
