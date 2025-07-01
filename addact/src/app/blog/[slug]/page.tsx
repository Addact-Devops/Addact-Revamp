"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogBySlugResponse, getBlogBySlug } from "@/graphql/queries/getBlogBySlug";
import BlogContentRenderer from "@/components/organisms/BlogContentRenderer";
import "../../../styles/components/blogdetail-wrapper.scss";
import AuthorCard from "@/components/organisms/AuthorCard";
import BlogContactCard from "@/components/organisms/BlogContactCard";
import BlogDetailBanner from "@/components/organisms/BlogDetailBanner";
import SimilarBlog from "@/components/organisms/SimilarBlogs";

export default function BlogPage() {
    const { slug } = useParams();
    const [blog, setBlog] = useState<BlogBySlugResponse["addactBlogs"][number]>();
    const [loading, setLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
            {blog?.BlogBanner?.[0] && <BlogDetailBanner banner={blog.BlogBanner[0]} />}

            <div className="container !mt-[70px] !mb-[70px]">
                <div className="flex gap-[100px] max-[1400px]:gap-[50px] relative">
                    <div className="w-[70%] max-[1300px]:w-[64%] max-[1200px]:w-[62%] max-[1120px]:w-[60%] max-[1101px]:w-[100%]">
                        {Array.isArray(blog.BlogContent) ? (
                            <BlogContentRenderer blocks={blog.BlogContent} />
                        ) : (
                            <p>No content available.</p>
                        )}

                        {blog.author?.Author && <AuthorCard author={blog.author.Author} />}
                    </div>

                    {windowWidth > 1100 && (
                        <div className="w-[30%] sticky top-[30px] self-start z-[20]">
                            <BlogContactCard card={blog.card} />
                        </div>
                    )}
                </div>

                <SimilarBlog similarBlogs={blog?.similarBlogs} />
            </div>
        </main>
    );
}
