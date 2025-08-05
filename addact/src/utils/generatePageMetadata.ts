// src/utils/generatePageMetadata.ts

import { fetchSinglePage } from "@/utils/fetchSinglePage";
import type { Metadata } from "next";

export async function generatePageMetadata(
    type: string, // e.g. "aboutUs" or "serviceLists"
    slugOrFallbackTitle?: string, // slug for collection, fallbackTitle for singles
    fallbackDescription = "Default description"
): Promise<Metadata> {
    let seoData;
    let fallbackTitle = "Default Title";

    if (type === "serviceLists" && slugOrFallbackTitle) {
        // ✅ Collection-type with slug
        seoData = await fetchSinglePage(type, slugOrFallbackTitle);
    } else if (type === "addactBlogs" && slugOrFallbackTitle) {
        // ✅ Blog dynamic page
        seoData = await fetchSinglePage(type, slugOrFallbackTitle);
    } else {
        // ✅ Single-type fallback
        fallbackTitle = slugOrFallbackTitle || fallbackTitle;
        seoData = await fetchSinglePage(type);
    }

    const seo = seoData?.SEO;

    console.log("🧠 Final SEO from Strapi:", JSON.stringify(seo, null, 2));
    console.log("💡 canonicalURL:", seo?.canonicalURL);

    const fullCanonicalURL = seo?.canonicalURL?.startsWith("http")
        ? seo.canonicalURL
        : `https://addact-revamp.vercel.app/${slugOrFallbackTitle || ""}`; // replace with your real domain

    return {
        title: seo?.metaTitle || fallbackTitle,
        description: seo?.metaDescription || fallbackDescription,
        robots: seo?.metaRobots || "index,follow",
        openGraph: {
            title: seo?.ogTitle || seo?.metaTitle || fallbackTitle,
            description: seo?.ogDescription || seo?.metaDescription || fallbackDescription,
            url: fullCanonicalURL,
            images: seo?.ogImage?.url
                ? [
                      {
                          url: seo.ogImage.url,
                          width: 800,
                          height: 600,
                          alt: seo?.ogTitle || seo?.metaTitle || "OG Image",
                      },
                  ]
                : [],
        },
        twitter: {
            title: seo?.twitterCardTitle || seo?.metaTitle || fallbackTitle,
            card: "summary_large_image",
        },
        alternates: {
            canonical: fullCanonicalURL,
        },
        other: {
            languageTag: seo?.languageTag || "en",
        },
    };
}
