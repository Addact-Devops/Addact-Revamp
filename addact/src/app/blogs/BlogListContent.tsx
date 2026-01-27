"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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

  console.log("filteredBlogs", filteredBlogs);
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

      <div className="container">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-[50px] gap-x-[15px] [@media(min-width:1400px)]:gap-x-[30px] my-[80px]">
          {filteredBlogs.length === 0 && !loadingMore && !hasMore && (
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
              <Link
                key={blog.Slug || blog.documentId}
                href={blogLink}
                className="group"
              >
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

                  <p className="text-white !text-[14px] xl:!text-[18px]">
                    {author}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Load more trigger */}
        {hasMore && (
          <div
            ref={loadMoreRef}
            className="h-10 flex justify-center items-center m-8"
          >
            {loadingMore && <Loader />}
          </div>
        )}
      </div>
    </>
  );
}
