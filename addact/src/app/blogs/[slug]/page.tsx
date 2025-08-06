// app/blog/[slug]/page.tsx

import { getBlogBySlug } from "@/graphql/queries/getBlogBySlug";
import BlogPageClient from "./BlogPageClient";
import { Metadata } from "next";
import Script from "next/script"; // ✅ for injecting structured data

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const blog = await getBlogBySlug(params.slug);
    const seo = blog?.SEO;
    if (!seo) return { title: "Blog" };

    return {
        title: seo.metaTitle,
        description: seo.metaDescription,
        openGraph: {
            title: seo.ogTitle,
            description: seo.ogDescription,
            images: seo.ogImage?.url ? [{ url: seo.ogImage.url }] : [],
        },
        twitter: {
            title: seo.twitterCardTitle,
        },
        alternates: {
            canonical: seo.canonicalURL || undefined,
        },
        robots: seo.metaRobots
            ? {
                  index: seo.metaRobots.includes("index"),
                  follow: seo.metaRobots.includes("follow"),
              }
            : {
                  index: true,
                  follow: true,
              },
    };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const blog = await getBlogBySlug(params.slug);
    const structuredData = blog?.SEO?.structuredData;

    return (
        <>
            {/* ✅ Inject structured data in <head> */}
            {structuredData && (
                <Script id="structured-data" type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </Script>
            )}

            <BlogPageClient blog={blog} />
        </>
    );
}
