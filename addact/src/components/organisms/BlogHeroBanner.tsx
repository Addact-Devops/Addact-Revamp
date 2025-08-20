"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAllBlogs } from "@/graphql/queries/getAllBlog";

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
        // Only set on mount or first render
        if (!localSearch && searchText) {
            setLocalSearch(searchText);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllBlogs();

                const banner = data.blogs?.blogBanner?.Banner?.[0];

                if (banner?.BannerImage?.url) {
                    const rawUrl = banner.BannerImage.url;
                    const fullUrl = rawUrl.startsWith("http")
                        ? rawUrl
                        : `${process.env.NEXT_PUBLIC_STRAPI_URL || ""}${rawUrl}`;
                    setBgImageUrl(fullUrl);
                }

                if (banner?.BannerTitle) setTitle(banner.BannerTitle);

                if (banner?.BannerDescription) {
                    const parser = new DOMParser();
                    const parsed = parser.parseFromString(banner.BannerDescription, "text/html");
                    setDescription(parsed.body.textContent || "");
                }

                const categoryList =
                    data.blogCategories
                        ?.map((cat) => cat?.Category?.CategoryTitle)
                        .filter((title) => title && title !== "All Blogs") || [];

                setCategories(categoryList);
            } catch (err) {
                console.error("Failed to load blog data", err);
            }
        };

        fetchData();
    }, []);

    const handleURLSearch = () => {
        const params = new URLSearchParams();
        if (localSearch.trim()) {
            params.set("query", localSearch.trim());
        }
        if (selectedCategory && selectedCategory !== "All Blogs") {
            params.set("category", selectedCategory);
        }
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`, { scroll: false });

        setSearchText(localSearch); // Sync with parent state
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
            className="relative bg-cover bg-center md:mt-[120px] bg-no-repeat text-white min-h-[538px] flex flex-col justify-between pt-[80px]"
            style={{ backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : "none" }}
        >
            <div className="container text-center pt-[80px]">
                <h1 className="text-[42px] md:text-[60px] font-bold mb-[20px] leading-[1.2]">{title}</h1>
                <p className="!text-[18px] !md:text-[20px] max-w-[800px] mx-auto mb-[40px] font-medium">
                    {description}
                </p>

                <div className="flex max-w-[500px] mx-auto rounded-full overflow-hidden shadow-md bg-white">
                    <span className="text-[#3C4CFF] pl-[15px] pr-[5px] flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.2}
                            stroke="currentColor"
                            className="w-5 h-5 font-bold text-[#3C4CFF]"
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
                        className="flex-1 text-black outline-none bg-transparent text-md font-medium py-[15px]"
                        value={localSearch}
                        onChange={(e) => {
                            const val = e.target.value;
                            setLocalSearch(val);
                            setSearchText(val);

                            const url = new URL(window.location.href);
                            if (val.trim()) {
                                url.searchParams.set("query", val.trim());
                            } else {
                                url.searchParams.delete("query");
                            }
                            url.searchParams.set("page", "1");
                            window.history.replaceState({}, "", url.toString());
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleURLSearch();
                        }}
                    />

                    <button
                        className="bg-[#3C4CFF] hover:bg-[#000000] text-white text-md font-semibold px-5 py-[15px] cursor-pointer"
                        onClick={handleURLSearch}
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="bg-[rgba(15,15,15,0.34)] backdrop-blur-md mt-[30px] pt-[11px] border border-[#2E2E2E]">
                <div
                    className="container overflow-x-auto custom-scrollbar scroll-smooth"
                    style={{ WebkitOverflowScrolling: "touch" }}
                >
                    <div
                        className="flex flex-nowrap justify-center min-w-max gap-[20px] xl:gap-[22px] 2xl:gap-[33px] text-[16px] md:text-[18px] font-medium px-4"
                        // Optional: Add `cursor-grab active:cursor-grabbing` for feedback
                    >
                        {["All Blogs", ...categories].map((cat, idx) => (
                            <span
                                key={idx}
                                className={`cursor-pointer whitespace-nowrap transition duration-200 ${
                                    selectedCategory === cat
                                        ? "text-white opacity-100 border-b-3 border-[#3C4CFF] pb-[8px]"
                                        : "text-white opacity-70 hover:text-[#3C4CFF]"
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
                                    url.searchParams.set("page", "1");
                                    window.history.pushState({}, "", url.toString());
                                }}
                            >
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
