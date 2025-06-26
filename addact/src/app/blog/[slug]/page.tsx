// src/app/blog/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBlogBySlug } from "@/graphql/queries/getBlogBySlug";
import BlogContentRenderer from "@/components/organisms/BlogContentRenderer";
import "../../../styles/components/blogdetail-wrapper.scss";
import AuthorCard from "@/components/organisms/AuthorCard";
import BlogContactCard from "@/components/organisms/BlogContactCard";

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
        <main className="blogdetail-wrapper bg-white">
            <div className="container">
                <h2>{blog.HeadingSection?.[0]?.PageTitle || "Untitled Blog"}</h2>
                {Array.isArray(blog.BlogContent) ? (
                    <BlogContentRenderer blocks={blog.BlogContent} />
                ) : (
                    <p>No content available.</p>
                )}
                {blog.author?.Author && <AuthorCard author={blog.author.Author} />}
            </div>

            <div>
                {blog?.contactcard?.ContactCard && <BlogContactCard contactCards={blog.contactcard.ContactCard} />}
            </div>
        </main>
    );
}
