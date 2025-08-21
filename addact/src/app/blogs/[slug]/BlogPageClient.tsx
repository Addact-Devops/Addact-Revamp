"use client";

import { useEffect, useState } from "react";
import { BlogBySlugResponse } from "@/graphql/queries/getBlogBySlug";
import BlogContentRenderer from "@/components/organisms/BlogContentRenderer";
import "../../../styles/components/blogdetail-wrapper.scss";
import AuthorCard from "@/components/organisms/AuthorCard";
import BlogContactCard from "@/components/organisms/BlogContactCard";
import BlogDetailBanner from "@/components/organisms/BlogDetailBanner";
import SimilarBlog from "@/components/organisms/SimilarBlogs";

type BlogPageClientProps = {
    blog: BlogBySlugResponse["addactBlogs"][number] | null;
};

export default function BlogPageClient({ blog }: BlogPageClientProps) {
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!blog) return <p className="p-6 text-red-600 mt-32">Blog not found.</p>;

    return (
        <main className="blogdetail-wrapper bg-white">
            {/* ✅ Blog Banner */}
            {blog?.BlogBanner?.[0] && <BlogDetailBanner banner={blog.BlogBanner[0]} />}

            <div className="container !mt-[70px] !mb-[70px] blogdetail-container">
                <div className="flex gap-[100px] max-[1400px]:gap-[50px] relative">
                    <div className="w-[70%] max-[1300px]:w-[64%] max-[1200px]:w-[62%] max-[1120px]:w-[60%] max-[1101px]:w-[100%]">
                        {/* ✅ Blog Content */}
                        {Array.isArray(blog.BlogContent) ? (
                            <BlogContentRenderer blocks={blog.BlogContent} />
                        ) : (
                            <p>No content available.</p>
                        )}

                        {/* ✅ Author Card */}
                        {blog.author?.Author && <AuthorCard author={blog.author.Author} />}
                    </div>

                    {/* ✅ Contact Card (Sticky on desktop) */}
                    {windowWidth > 1100 && (
                        <div className="w-[30%] sticky top-[120px] self-start z-[20]">
                            <BlogContactCard card={blog.contactCard?.ContactCard?.[0]} />
                        </div>
                    )}
                </div>

                {/* ✅ Similar Blogs */}
                <SimilarBlog similarBlogs={blog?.similarBlogs} />
            </div>

            {/* ✅ Fixed Social Icons (Desktop only) */}
            {Array.isArray(blog?.socialicons) && blog.socialicons.length > 0 && windowWidth >= 992 && (
                <div className="flex flex-col gap-[15px] fixed top-1/2 left-[5px] 2xl:left-[1%] -translate-y-1/2 z-[3]">
                    {blog.socialicons.flatMap((item, i: number) => {
                        const icons = item?.SocialIcon ?? [];

                        return icons.map(
                            (
                                icon: {
                                    Title?: string;
                                    ClassName?: string;
                                    Links?: {
                                        id?: string;
                                        href?: string;
                                        label?: string;
                                        target?: string;
                                        isExternal?: boolean;
                                    };
                                    Icons?: {
                                        alternativeText?: string;
                                        url?: string;
                                    };
                                    HoverIcon?: {
                                        alternativeText?: string;
                                        url?: string;
                                    };
                                },
                                j: number
                            ) => {
                                const link = icon?.Links;
                                const iconUrl = icon?.Icons?.url;
                                const hoverUrl = icon?.HoverIcon?.url || iconUrl;

                                if (!link?.href || !iconUrl) return null;

                                return (
                                    <a
                                        key={`social-${i}-${j}`}
                                        href={link.href}
                                        target={link.target === "blank" ? "_blank" : link.target}
                                        rel={link.isExternal ? "noopener noreferrer" : undefined}
                                        className="group w-[25px] h-[25px] bg-black rounded-full relative overflow-hidden"
                                    >
                                        <img
                                            src={iconUrl}
                                            alt={icon.Icons?.alternativeText || icon.Title || ""}
                                            className="w-[19px] h-[19px] !m-0 object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 group-hover:opacity-0 transition-opacity duration-300"
                                        />
                                        <img
                                            src={hoverUrl}
                                            alt={icon.HoverIcon?.alternativeText || icon.Title || ""}
                                            className="w-[19px] h-[19px] !m-0 object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        />
                                    </a>
                                );
                            }
                        );
                    })}
                </div>
            )}
        </main>
    );
}
