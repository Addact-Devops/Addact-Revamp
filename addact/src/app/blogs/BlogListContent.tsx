"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogs } from "@/graphql/queries/getAllBlog";
import BlogHeroBanner from "@/components/organisms/BlogHeroBanner";
import Loader from "@/components/atom/loader";

type Props = { data?: unknown };

type BlogType = {
    Slug: string;
    documentId: string;
    BlogBanner?: {
        BannerTitle?: string;
        BannerDescription?: string;
        BannerImage?: {
            url: string;
            width: number;
            height: number;
            name: string;
            alternativeText?: string;
        };
        PublishDate?: string;
        author?: {
            Author?: { AuthorName?: string };
        };
        blogcategory?: {
            Category?: { CategoryTitle?: string };
        };
    }[];
    blog_category?: {
        Category?: { CategoryTitle?: string };
    };
};

export default function BlogListContent({}: Props) {
    const [addactBlogs, setAddactBlogs] = useState<BlogType[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<BlogType[]>([]);
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Blogs");
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(12); // initially load 12 blogs

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            const data = await getAllBlogs();
            setAddactBlogs(data.addactBlogs as BlogType[]);
            setLoading(false);
        };
        fetchBlogs();
    }, []);

    // Filter blogs based on search/category
    useEffect(() => {
        const query = searchText.toLowerCase();
        let filtered = addactBlogs.filter((blog) => {
            const banner = blog.BlogBanner?.[0];
            if (!banner) return false;

            const title = banner.BannerTitle?.toLowerCase() || "";
            const author = banner.author?.Author?.AuthorName?.toLowerCase() || "";

            // ✅ use both blogcategory (old) and blog_category (new)
            const category =
                banner.blogcategory?.Category?.CategoryTitle?.toLowerCase() ||
                blog.blog_category?.Category?.CategoryTitle?.toLowerCase() ||
                "";

            return title.includes(query) || author.includes(query) || category.includes(query);
        });

        if (selectedCategory !== "All Blogs") {
            filtered = filtered.filter((blog) => {
                const blogCategory =
                    blog.BlogBanner?.[0]?.blogcategory?.Category?.CategoryTitle ||
                    blog.blog_category?.Category?.CategoryTitle ||
                    "";
                return blogCategory.trim().toLowerCase() === selectedCategory.toLowerCase();
            });
        }

        setFilteredBlogs(filtered);
        setVisibleCount(12); // reset visible count when filters change
    }, [searchText, selectedCategory, addactBlogs]);

    // Infinite scroll using IntersectionObserver
    useEffect(() => {
        if (!loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount((prev) => {
                        if (prev >= filteredBlogs.length) return prev; // stop when all blogs loaded
                        return prev + 6; // load next 6 blogs
                    });
                }
            },
            { threshold: 1 }
        );

        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [filteredBlogs.length]);

    if (loading) return <Loader />;

    const currentBlogs = filteredBlogs.slice(0, visibleCount);

    return (
        <>
            <BlogHeroBanner
                searchText={searchText}
                setSearchText={setSearchText}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <div className="container">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-[50px] gap-x-[15px] [@media(min-width:1400px)]:gap-x-[30px] my-[80px]">
                    {currentBlogs.length === 0 && (
                        <p className="text-white !text-[35px] font-semibold col-span-full text-center">
                            {searchText.trim()
                                ? `No blogs found for "${searchText}"`
                                : selectedCategory !== "All Blogs"
                                ? `No blogs found in "${selectedCategory}"`
                                : "No blogs found"}
                        </p>
                    )}

                    {currentBlogs.map((blog) => {
                        const banner = blog.BlogBanner?.[0];
                        if (!banner) return null;

                        const imageUrl = banner.BannerImage?.url
                            ? banner.BannerImage.url.startsWith("http")
                                ? banner.BannerImage.url
                                : `${process.env.NEXT_PUBLIC_STRAPI_URL || ""}${banner.BannerImage.url}`
                            : "";

                        const title = banner.BannerTitle?.trim() || "Untitled";
                        const blogLink = `/blogs${blog.Slug}`;
                        const rawAuthor = banner.author?.Author?.AuthorName;

                        // ✅ support both blogcategory and blog_category
                        const rawCategory =
                            banner.blogcategory?.Category?.CategoryTitle || blog.blog_category?.Category?.CategoryTitle;

                        const author = typeof rawAuthor === "string" ? rawAuthor.trim() : "Addxp Technologies";
                        const category = typeof rawCategory === "string" ? rawCategory.trim() : "General";

                        return (
                            <Link key={blog.Slug} href={blogLink} className="group">
                                <div className="bg-[#0E0D0D] rounded-xl group-hover:shadow-xl transition duration-300 cursor-pointer">
                                    {imageUrl && (
                                        <div className="relative blogitem-h rounded-xl overflow-hidden mb-4">
                                            <Image
                                                src={imageUrl}
                                                alt={
                                                    banner.BannerImage?.alternativeText ||
                                                    banner.BannerImage?.name ||
                                                    "Blog Image"
                                                }
                                                fill
                                                className="object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-[rgb(60,76,255,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                    )}

                                    <div className="inline-block px-[10px] py-[2px] rounded-[10px] text-[15px] leading-[23px] text-[#fff] bg-[#3C4CFF] my-[15px] font-medium">
                                        {category}
                                    </div>

                                    <h2 className="text-white font-semibold !text-[35px] !leading-[45px] mb-[30px] line-clamp-2 [@media(max-width:1299px)]:!text-[25px] [@media(max-width:1299px)]:!leading-[34px]">
                                        {title}
                                    </h2>

                                    <p className="text-[#3C4CFF] font-bold">{author}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Loader trigger for infinite scroll */}
                {visibleCount < filteredBlogs.length && (
                    <div ref={loadMoreRef} className="h-10 flex justify-center items-center mt-8">
                        <span className="text-gray-400">Loading more blogs...</span>
                    </div>
                )}
            </div>
        </>
    );
}
