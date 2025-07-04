"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogs } from "@/graphql/queries/getAllBlog";
import BlogHeroBanner from "@/components/organisms/BlogHeroBanner";
import { useSearchParams, useRouter } from "next/navigation";

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

function BlogListContent() {
    const [addactBlogs, setAddactBlogs] = useState<BlogType[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<BlogType[]>([]);
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Blogs");

    const searchParams = useSearchParams();
    const router = useRouter();

    const blogsPerPage = 12;
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    const [currentPage, setCurrentPage] = useState(pageParam);

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
        const pageParam = parseInt(searchParams.get("page") || "1", 10);

        if (query !== searchText) setSearchText(query);
        if (categoryParam !== selectedCategory) setSelectedCategory(categoryParam);
        if (!isNaN(pageParam)) setCurrentPage(pageParam);
    }, [searchParams, searchText, selectedCategory]);

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
        setCurrentPage(1);
    }, [searchText, selectedCategory, addactBlogs]);

    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const goToPage = (page: number) => {
        setCurrentPage(page);
        router.push(`?page=${page}`, { scroll: false });
    };

    return (
        <>
            <BlogHeroBanner
                searchText={searchText}
                setSearchText={setSearchText}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[50px] gap-x-[15px] [@media(min-width:1400px)]:gap-x-[30px] my-[80px]">
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
                                            <Image
                                                src={imageUrl}
                                                alt={
                                                    banner.BannerImage?.alternativeText ||
                                                    banner.BannerImage?.name ||
                                                    "Blog Image"
                                                }
                                                width={600}
                                                height={400}
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

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-10 flex-wrap text-white">
                        <button
                            className="px-3 py-2 bg-gray-800 rounded disabled:opacity-50"
                            onClick={() => goToPage(Math.max(currentPage - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>

                        {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
                            .filter((page) => page >= 1 && page <= totalPages)
                            .map((page) => (
                                <button
                                    key={page}
                                    className={`px-3 py-2 rounded ${
                                        page === currentPage ? "bg-[#e97777]" : "bg-gray-700"
                                    }`}
                                    onClick={() => goToPage(page)}
                                >
                                    {page}
                                </button>
                            ))}

                        {currentPage < totalPages - 1 && (
                            <>
                                {currentPage < totalPages - 2 && <span className="px-2">...</span>}
                                <button
                                    className={`px-3 py-2 rounded ${
                                        currentPage === totalPages ? "bg-[#e97777]" : "bg-gray-700"
                                    }`}
                                    onClick={() => goToPage(totalPages)}
                                >
                                    {totalPages}
                                </button>
                            </>
                        )}

                        <button
                            className="px-3 py-2 bg-gray-800 rounded disabled:opacity-50"
                            onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default function BlogListPage() {
    return (
        <main className="bg-[#0E0D0D]">
            <Suspense fallback={<div className="text-white text-center py-10">Loading...</div>}>
                <BlogListContent />
            </Suspense>
        </main>
    );
}
