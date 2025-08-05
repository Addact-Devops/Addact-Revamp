// app/blog/[slug]/page.tsx

import { getBlogBySlug } from "@/graphql/queries/getBlogBySlug";
import BlogPageClient from "./BlogPageClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const blog = await getBlogBySlug(params.slug);
    if (!blog || !blog.SEO) return { title: "Blog" };

    const seo = blog.SEO;

    return {
        title: seo.metaTitle || "Blog",
        description: seo.metaDescription || "",
        openGraph: {
            title: seo.ogTitle || seo.metaTitle || "Blog",
            description: seo.ogDescription || seo.metaDescription || "",
            images: seo.ogImage?.url ? [{ url: seo.ogImage.url }] : [],
        },
        twitter: {
            title: seo.twitterCardTitle || seo.metaTitle || "Blog",
        },
        alternates: {
            canonical: seo.canonicalURL || undefined,
        },
        robots: seo.metaRobots || "index, follow",
    };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const blog = await getBlogBySlug(params.slug);

    return <BlogPageClient blog={blog} />;
}
