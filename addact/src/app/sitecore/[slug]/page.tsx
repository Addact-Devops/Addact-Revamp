// src/app/sitecore/[slug]/page.tsx
import { Metadata } from "next";
import { getServiceDetailBySlug } from "@/graphql/queries/getServieceDetail";
import SiteDetailClient from "./SiteDetailClient";
type Params = Promise<{ slug: string }>;
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    // const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const data = await getServiceDetailBySlug(slug);

    if (!data || !data.SEO) return {};

    const {
        metaTitle,
        metaDescription,
        ogTitle,
        ogDescription,
        ogImage,
        metaRobots,
        twitterCardTitle,
        canonicalURL,
        structuredData,
        languageTag,
    } = data.SEO;

    return {
        title: metaTitle || data.ReferenceTitle,
        description: metaDescription || "",
        alternates: {
            canonical: canonicalURL || undefined,
        },
        openGraph: {
            title: ogTitle || metaTitle || "",
            description: ogDescription || metaDescription || "",
            images: ogImage?.url ? [{ url: ogImage.url }] : [],
            type: "website",
            locale: languageTag || "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title: twitterCardTitle || metaTitle || "",
            description: metaDescription || "",
            images: ogImage?.url ? [ogImage.url] : [],
        },
        robots: metaRobots || "index, follow",
        other: structuredData
            ? {
                  "structured-data":
                      typeof structuredData === "string" ? structuredData : JSON.stringify(structuredData),
              }
            : undefined,
    };
}

export default async function Page({ params }: { params: Params }) {
    const { slug } = await params;
    // const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const data = await getServiceDetailBySlug(slug);

    if (!data) {
        return <div className='text-white p-8'>Page Not Found</div>;
    }

    return <SiteDetailClient data={data} />;
}
