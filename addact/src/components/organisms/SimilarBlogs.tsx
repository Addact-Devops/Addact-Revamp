import Image from "next/image";
import Link from "next/link";
import { RightArrowUpIcon } from "../atom/icons";

type SimilarBlogProps = {
    similarBlogs?: {
        BlogBanner?: {
            BannerTitle?: string;
            PublishDate?: string;
            BannerImage?: {
                alternativeText?: string;
                name?: string;
                url?: string;
                width?: number;
                height?: number;
            };
            ReadNow?: {
                id?: string;
                href?: string;
                label?: string;
                target?: string;
                isExternal?: boolean;
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
    }[];
    similarstorytitle?: {
        CommonTitle?: {
            Title?: string;
            Description?: string;
        }[];
    };
};

export default function SimilarBlog({ similarBlogs, similarstorytitle }: SimilarBlogProps) {
    if (!Array.isArray(similarBlogs) || similarBlogs.length === 0) return null;

    const flattenedBlogs =
        similarBlogs
            ?.flatMap((item) => (Array.isArray(item?.BlogBanner) ? item.BlogBanner : []))
            ?.filter((b) => b?.BannerTitle && b?.BannerImage?.url && b?.ReadNow?.href)
            ?.slice(0, 3) || [];

    if (flattenedBlogs.length === 0) return null;

    const sectionTitle = similarstorytitle?.CommonTitle?.[0]?.Title?.trim() || "";

    return (
        <div className="py-[80px]">
            <div className="mb-4 relative inline-block">
                <h2 className="!text-[28px] md:!text-[40px] 2xl:!text-[60px] font-bold text-black">{sectionTitle}</h2>
                <div className="w-[160px] h-[5px] bg-[#5865F2] mt-[40px] rounded"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px] mt-[80px]">
                {flattenedBlogs.map((blog, index) => {
                    const title = blog.BannerTitle?.trim();
                    const category = blog.blogcategory?.Category?.CategoryTitle?.trim();
                    const publishDate = blog.PublishDate
                        ? new Date(blog.PublishDate).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                          })
                        : null;

                    const imageUrl = blog.BannerImage?.url
                        ? blog.BannerImage.url.startsWith("http")
                            ? blog.BannerImage.url
                            : `${process.env.NEXT_PUBLIC_STRAPI_URL || ""}${blog.BannerImage.url}`
                        : null;

                    const readLink = blog.ReadNow?.href;

                    if (!readLink || !imageUrl || !title) return null;

                    return (
                        <div key={index} className={`border border-[#3c4cff59] p-7 relative flex flex-col h-full`}>
                            <div className={`bg-gray-300 overflow-hidden w-full mb-7 max-h-[350px]`}>
                                {imageUrl && (
                                    <Image
                                        src={imageUrl}
                                        alt={blog.BannerImage?.alternativeText || blog.BannerImage?.name || ""}
                                        width={blog.BannerImage?.width}
                                        height={blog.BannerImage?.height}
                                        className=" object-cover"
                                    />
                                )}
                            </div>

                            <div className="flex flex-col flex-1 justify-start">
                                {category && (
                                    <span className="px-5 py-2 border border-[#3c4cff59] text-[#3C4CFF] rounded-lg w-fit text-sm mb-2 font-medium">
                                        {category}
                                    </span>
                                )}
                                <h4 className="md:!text-3xl text-black font-medium mb-4 leading-tight line-clamp-3">
                                    {title}
                                </h4>
                                <p className="text-base text-black">{publishDate}</p>
                            </div>

                            <div className="mt-auto self-end">
                                <Link href={`/blogs${blog.ReadNow!.href!}`} target="_self">
                                    <div className="group w-14 h-14 bg-blue-600 text-black flex items-center justify-center absolute bottom-0 right-0 transition-all duration-300 hover:w-16 hover:h-16">
                                        <RightArrowUpIcon className="transition-transform duration-300 group-hover:scale-110" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
