// src/app/blog/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBlogBySlug } from "@/graphql/queries/getBlogBySlug";
import BlogContentRenderer from "@/components/organisms/BlogContentRenderer";

export default function BlogPage() {
    const { slug } = useParams();
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof slug === "string") {
            const fetchData = async () => {
                const result = await getBlogBySlug(slug);
                setBlog(result);
                setLoading(false);
            };
            fetchData();
        }
    }, [slug]);

    if (loading) return <p className="p-6">Loading...</p>;
    if (!blog) return <p className="p-6 text-red-600">Blog not found.</p>;

    return (
        <main className="bg-black">
            <h1 className="text-3xl font-bold mb-6">{blog.HeadingSection?.[0]?.PageTitle || "Untitled Blog"}</h1>
            {Array.isArray(blog.BlogContent) ? (
                <BlogContentRenderer blocks={blog.BlogContent} />
            ) : (
                <p>No content available.</p>
            )}
        </main>
    );
}
