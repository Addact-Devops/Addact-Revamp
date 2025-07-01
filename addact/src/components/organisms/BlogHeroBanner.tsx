"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAllBlogs } from "@/graphql/queries/getAllBlog";

type BlogType = {
    Slug: string;
    BlogBanner?: {
        BannerTitle?: string;
        BannerImage?: {
            url: string;
            width: number;
            height: number;
            name: string;
            alternativeText?: string;
        };
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

export default function BlogHeroBanner({
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
}: {
    searchText: string;
    setSearchText: (value: string) => void;
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
}) {
    const [localSearch, setLocalSearch] = useState(searchText || "");
    const [categories, setCategories] = useState<string[]>([]);
    const [bgImageUrl, setBgImageUrl] = useState<string | null>(null);
    const [title, setTitle] = useState("The think tank");
    const [description, setDescription] = useState("");

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setLocalSearch(searchText);
    }, [searchText]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllBlogs();
                const categoryList =
                    data.blogCategories
                        ?.map((cat) => cat?.Category?.CategoryTitle)
                        .filter((title) => title && title !== "All Blogs") || [];

                setCategories(categoryList);

                const banner = data.blogs?.blogBanner?.Banner?.[0];
                if (banner?.BannerImage?.url) setBgImageUrl(banner.BannerImage.url);
                if (banner?.BannerTitle) setTitle(banner.BannerTitle);

                if (banner?.BannerDescription) {
                    const parser = new DOMParser();
                    const parsed = parser.parseFromString(banner.BannerDescription, "text/html");
                    setDescription(parsed.body.textContent || "");
                }
            } catch (err) {
                console.error("Failed to load blog data", err);
            }
        };

        fetchData();
    }, []);

    const handleURLSearch = () => {
        const params = new URLSearchParams();
        if (localSearch.trim()) params.set("query", localSearch.trim());
        if (selectedCategory && selectedCategory !== "All Blogs") {
            params.set("category", selectedCategory);
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    useEffect(() => {
        if (localSearch.trim() === "") {
            const url = new URL(window.location.href);
            url.searchParams.delete("query");
            window.history.replaceState({}, "", url.toString());
        }
    }, [localSearch]);

    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat text-white min-h-[538px] flex flex-col justify-between pt-[80px]"
            style={{ backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : "none" }}
        >
            <div className="container text-center pt-[80px]">
                <h1 className="text-[42px] md:text-[60px] font-bold mb-[20px] leading-[1.2]">{title}</h1>
                <p className="!text-[18px] !md:text-[20px] max-w-[800px] mx-auto mb-[40px]">{description}</p>

                <div className="flex max-w-[500px] mx-auto rounded-full overflow-hidden shadow-md bg-white">
                    <span className="text-[#e97777] pl-[15px] pr-[5px] py-[15px] flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.2}
                            stroke="currentColor"
                            className="w-5 h-5 font-bold text-[#e97777]"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 15.75L19.5 19.5M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                            />
                        </svg>
                    </span>

                    <input
                        type="text"
                        placeholder="Search blogs"
                        className="flex-1 text-black outline-none bg-transparent text-md font-medium"
                        value={localSearch}
                        onChange={(e) => {
                            setLocalSearch(e.target.value);
                            setSearchText(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleURLSearch();
                        }}
                    />

                    <button
                        className="bg-[#e97777] hover:bg-[#e56d6d] text-white text-md font-semibold px-5 py-[15px] cursor-pointer rounded-full"
                        onClick={handleURLSearch}
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="container overflow-x-auto mt-[30px]">
                <div className="flex flex-nowrap justify-center min-w-max gap-[20px] text-[16px] font-medium px-4">
                    {["All Blogs", ...categories].map((cat, idx) => (
                        <span
                            key={idx}
                            className={`cursor-pointer whitespace-nowrap transition duration-200 ${
                                selectedCategory === cat
                                    ? "text-white border-b-2 border-[#e97777] pb-[2px]"
                                    : "text-white hover:text-[#e97777]"
                            }`}
                            onClick={() => {
                                setSelectedCategory(cat);
                                const url = new URL(window.location.href);
                                if (cat === "All Blogs") {
                                    url.searchParams.delete("category");
                                } else {
                                    url.searchParams.set("category", cat);
                                }
                                if (localSearch.trim()) {
                                    url.searchParams.set("query", localSearch.trim());
                                }
                                window.history.pushState({}, "", url.toString());
                            }}
                        >
                            {cat}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
