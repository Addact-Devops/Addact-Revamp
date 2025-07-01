"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllBlogs } from "@/graphql/queries/getAllBlog";
import BlogHeroBanner from "@/components/organisms/BlogHeroBanner";
import { useSearchParams } from "next/navigation";

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
            Author?: {
                AuthorName?: string;
            };
        };
        blogcategory?: {
            Category?: {
                CategoryTitle?: string;
            };
        };
    }[];
};

export default function BlogListPage() {
    const [addactBlogs, setAddactBlogs] = useState<BlogType[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<BlogType[]>([]);
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Blogs");

    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchBlogs = async () => {
            const data = await getAllBlogs();
            setAddactBlogs(data.addactBlogs as BlogType[]);
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        const query = searchParams.get("query")?.trim() || "";
        const categoryParam = searchParams.get("category")?.trim() || "All Blogs";

        if (query && !searchText) setSearchText(query);
        if (categoryParam && categoryParam !== selectedCategory) {
            setSelectedCategory(categoryParam);
        }
    }, [searchParams]);

    useEffect(() => {
        const query = searchText.toLowerCase();
        let filtered = addactBlogs.filter((blog) => {
            const banner = blog.BlogBanner?.[0];
            if (!banner) return false;

            const title = banner.BannerTitle?.toLowerCase() || "";
            const author = banner.author?.Author?.AuthorName?.toLowerCase() || "";
            const category = banner.blogcategory?.Category?.CategoryTitle?.toLowerCase() || "";

            return title.includes(query) || author.includes(query) || category.includes(query);
        });

        if (selectedCategory !== "All Blogs") {
            filtered = filtered.filter((blog) => {
                const blogCategory = blog.BlogBanner?.[0]?.blogcategory?.Category?.CategoryTitle || "";
                return blogCategory.trim().toLowerCase() === selectedCategory.toLowerCase();
            });
        }

        setFilteredBlogs(filtered);
    }, [searchText, selectedCategory, addactBlogs]);

    return (
        <main className="bg-[#0E0D0D]">
            <BlogHeroBanner
                searchText={searchText}
                setSearchText={setSearchText}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[50px] gap-x-[15px] [@media(min-width:1400px)]:gap-x-[30px] my-[80px]">
                    {filteredBlogs.length === 0 && (
                        <p className="text-white !text-[35px] font-semibold col-span-full text-center">
                            {searchText.trim()
                                ? `No blogs found for "${searchText}"`
                                : selectedCategory !== "All Blogs"
                                ? `No blogs found in "${selectedCategory}"`
                                : "No blogs found"}
                        </p>
                    )}
                    {filteredBlogs.map((blog) => {
                        const banner = blog.BlogBanner?.[0];
                        if (!banner) return null;

                        const imageUrl = banner.BannerImage?.url
                            ? banner.BannerImage.url.startsWith("http")
                                ? banner.BannerImage.url
                                : `${process.env.NEXT_PUBLIC_STRAPI_URL || ""}${banner.BannerImage.url}`
                            : "";

                        const title = banner.BannerTitle?.trim() || "Untitled";
                        const blogLink = `/blog${blog.Slug}`;
                        const rawAuthor = banner.author?.Author?.AuthorName;
                        const rawCategory = banner.blogcategory?.Category?.CategoryTitle;
                        const author = typeof rawAuthor === "string" ? rawAuthor.trim() : "Addxp Technologies";
                        const category = typeof rawCategory === "string" ? rawCategory.trim() : "General";

                        return (
                            <Link key={blog.Slug} href={blogLink} className="group">
                                <div className="bg-[#0E0D0D] rounded-xl group-hover:shadow-xl transition duration-300 cursor-pointer">
                                    {imageUrl && (
                                        <div className="rounded-xl overflow-hidden mb-4">
                                            <img
                                                src={imageUrl}
                                                alt={
                                                    banner.BannerImage?.alternativeText ||
                                                    banner.BannerImage?.name ||
                                                    "Blog Image"
                                                }
                                                className="w-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                                            />
                                        </div>
                                    )}

                                    <div className="inline-block px-[10px] py-[2px] rounded-[10px] text-[15px] leading-[23px] text-[#e97777] bg-[hsla(0,72%,69%,0.2)] my-[15px] font-medium">
                                        {category}
                                    </div>

                                    <h2 className="text-white font-semibold !text-[35px] !leading-[45px] mb-[30px] line-clamp-2 [@media(max-width:1299px)]:!text-[30px] [@media(max-width:1299px)]:!leading-[40px]">
                                        {title}
                                    </h2>

                                    <p className="text-[#e97777] font-bold">{author}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
