// app/blogs/[slug]/page.tsx

import { getBlogBySlug } from "@/graphql/queries/getBlogBySlug";
import BlogPageClient from "./BlogPageClient";
import { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);
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

export default async function Page({ params }: { params: Params }) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);
    const structuredData = blog?.SEO?.structuredData;

    return (
        <>
            {structuredData && (
                <Script id='structured-data' type='application/ld+json'>
                    {JSON.stringify(structuredData)}
                </Script>
            )}
            <Suspense fallback={<div>Loading blogs...</div>}>
                <BlogPageClient blog={blog} />
            </Suspense>
        </>
    );
}
