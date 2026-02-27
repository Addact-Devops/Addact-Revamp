"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Badge from "@/components/atom/badge";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { getInitialBlogs, getNextBlogs } from "@/graphql/queries/getAllBlog";
import BlogHeroBanner from "@/components/organisms/BlogHeroBanner";
import Loader from "@/components/atom/loader";

// ...existing types...
type BannerType = {
  BannerTitle?: string;
  BannerDescription?: string;
  BannerImage?: {
    url: string;
    width?: number;
    height?: number;
    name?: string;
    alternativeText?: string;
  };
  PublishDate?: string;
  author?: {
    Author?: { AuthorName?: string };
  };
  blogcategory?: {
    Category?: { CategoryTitle?: string };
  };
};

type BlogType = {
  Slug: string;
  documentId?: string;
  BlogBanner?: BannerType[];
  blog_category?: {
    Category?: { CategoryTitle?: string };
  };
  PublishDate?: string;
  publishDate?: string;
  updatedAt?: string;
  createdAt?: string;
  [k: string]: unknown;
};

type Props = { data?: unknown };

export default function BlogListContent({}: Props) {
  const searchParams = useSearchParams();
  const [addactBlogs, setAddactBlogs] = useState<BlogType[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Blogs");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [bgImageUrl, setBgImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("The think tank");
  const [description, setDescription] = useState("");

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // ...existing getBlogDate helper...
  const getBlogDate = (blog: BlogType): number => {
    const banner: BannerType | undefined = blog.BlogBanner?.[0];

    const candidates: (string | undefined)[] = [
      banner?.PublishDate,
      blog.PublishDate,
      blog.publishDate,
      blog.updatedAt,
      blog.createdAt,
    ];

    for (const c of candidates) {
      if (typeof c === "string" && c.trim()) {
        const parsed = Date.parse(c);
        if (!isNaN(parsed)) return parsed;
      }
    }
    return 0;
  };

  // Read category and search query from URL params
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory("All Blogs");
    }

    const queryFromUrl = searchParams.get("query");
    if (queryFromUrl) {
      setSearchText(queryFromUrl);
    } else {
      setSearchText("");
    }
  }, [searchParams]);

  // Initial load
  useEffect(() => {
    const fetchInitialBlogs = async () => {
      try {
        const data = await getInitialBlogs();
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
          const parsed = parser.parseFromString(
            banner.BannerDescription,
            "text/html",
          );
          setDescription(parsed.body.textContent || "");
        }

        const categoryList =
          data.blogCategories
            ?.map((cat) => cat?.Category?.CategoryTitle)
            .filter((title) => title && title !== "All Blogs") || [];

        setCategories(categoryList);
        const blogs = data.addactBlogs || [];
        const sorted = blogs
          .slice()
          .sort((a, b) => getBlogDate(b) - getBlogDate(a));

        setAddactBlogs(sorted);
        setFilteredBlogs(sorted);
        setHasMore(data.hasMore);
        setCurrentPage(2);
      } catch (error) {
        console.error("Error fetching initial blogs:", error);
        setAddactBlogs([]);
        setFilteredBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialBlogs();
  }, []);

  // Load more blogs on scroll
  const loadMoreBlogs = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const data = await getNextBlogs(currentPage);
      const newBlogs = data.blogs || [];

      setAddactBlogs((prev) => [...prev, ...newBlogs]);
      setHasMore(data.hasMore);
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error loading more blogs:", error);
    } finally {
      setLoadingMore(false);
    }
  }, [currentPage, hasMore, loadingMore]);

  // Filter blogs
  useEffect(() => {
    const query = searchText.toLowerCase();
    let filtered = addactBlogs.filter((blog) => {
      const banner = blog.BlogBanner?.[0];
      if (!banner) return false;

      const title = banner.BannerTitle?.toLowerCase() || "";
      const author = banner.author?.Author?.AuthorName?.toLowerCase() || "";
      const category =
        banner.blogcategory?.Category?.CategoryTitle?.toLowerCase() ||
        blog.blog_category?.Category?.CategoryTitle?.toLowerCase() ||
        "";

      return (
        title.includes(query) ||
        author.includes(query) ||
        category.includes(query)
      );
    });

    if (selectedCategory !== "All Blogs") {
      filtered = filtered.filter((blog) => {
        const blogCategory =
          blog.BlogBanner?.[0]?.blogcategory?.Category?.CategoryTitle ||
          blog.blog_category?.Category?.CategoryTitle ||
          "";
        return (
          blogCategory.trim().toLowerCase() === selectedCategory.toLowerCase()
        );
      });
    }

    filtered = filtered.slice().sort((a, b) => getBlogDate(b) - getBlogDate(a));

    setFilteredBlogs(filtered);
  }, [searchText, selectedCategory, addactBlogs]);

  // Infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && hasMore) {
          loadMoreBlogs();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [loadingMore, hasMore, loadMoreBlogs]);

  if (loading) return <Loader />;

  return (
    <>
      <BlogHeroBanner
        searchText={searchText}
        setSearchText={setSearchText}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        bgImageUrl={bgImageUrl}
        title={title}
        description={description}
        setCategories={setCategories}
        setBgImageUrl={setBgImageUrl}
        setTitle={setTitle}
        setDescription={setDescription}
      />

      <div className="container overflow-visible">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-[40px] gap-x-[15px] [@media(min-width:1400px)]:gap-x-[25px] my-[60px]">
          {filteredBlogs.length === 0 && !loadingMore && !hasMore && (
            <p className="text-zinc-900 !text-[35px] font-bold col-span-full text-center">
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
                : `${process.env.NEXT_PUBLIC_STRAPI_URL || ""}${
                    banner.BannerImage.url
                  }`
              : "";

            const title = banner.BannerTitle?.trim() || "Untitled";
            const rawSlug = blog.Slug || "";
            const slug = rawSlug.startsWith("/") ? rawSlug.slice(1) : rawSlug;
            const blogLink = `/blogs/${slug}`;
            const rawAuthor = banner.author?.Author?.AuthorName;
            const rawCategory =
              banner.blogcategory?.Category?.CategoryTitle ||
              blog.blog_category?.Category?.CategoryTitle;

            const author =
              typeof rawAuthor === "string"
                ? rawAuthor.trim()
                : "Addact Technologies";
            const category =
              typeof rawCategory === "string" ? rawCategory.trim() : "General";

            return (
              <motion.div
                key={blog.Slug || blog.documentId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  href={blogLink}
                  className="group block h-full"
                >
                  <div className="relative h-full bg-white border border-zinc-100 rounded-2xl overflow-hidden hover:border-[#3C4CFF]/50 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(60,76,255,0.12)] flex flex-col">
                    {/* Image Container */}
                    {imageUrl && (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={
                            banner.BannerImage?.alternativeText ||
                            banner.BannerImage?.name ||
                            "Blog Image"
                          }
                          fill
                          className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        {/* Interactive Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-zinc-900/40 via-transparent to-transparent opacity-60" />
                        <div className="absolute inset-0 bg-[#3C4CFF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1 bg-white">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-[#3C4CFF] border-[#3C4CFF]/20 font-bold">
                          {category}
                        </Badge>
                        <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold tracking-wide">
                          <CalendarDays size={14} className="text-[#3C4CFF]" />
                          <span>
                            {new Date(getBlogDate(blog)).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>

                      <h2 className="text-zinc-900 font-bold text-[16px]! md:text-[20px]! xl:text-[24px]! leading-[1.3] md:leading-[1.4] mb-3 group-hover:text-[#3C4CFF] transition-colors duration-300 line-clamp-2">
                        {title}
                      </h2>

                      <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-[#3C4CFF]/10 border border-[#3C4CFF]/20 flex items-center justify-center overflow-hidden shrink-0 mt-0.5">
                            <span className="text-[#3C4CFF] text-[9px] font-black">
                              {author.charAt(0)}
                            </span>
                          </div>
                          <span className="text-zinc-500 text-[13px]! xl:text-[15px]! font-semibold leading-tight">
                            {author}
                          </span>
                        </div>
                        
                        <div className="text-[#3C4CFF] opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Load more trigger */}
        {hasMore && (
          <div
            ref={loadMoreRef}
            className="h-10 flex justify-center items-center m-8"
          >
            {loadingMore && <Loader fullPage={false} />}
          </div>
        )}
      </div>
    </>
  );
}
