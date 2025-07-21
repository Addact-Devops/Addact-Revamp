import Image from "next/image";

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
        };
    };
};

export default function SimilarBlog({ similarBlogs, similarstorytitle }: SimilarBlogProps) {
    if (!Array.isArray(similarBlogs) || similarBlogs.length === 0) return null;

    const flattenedBlogs =
        similarBlogs
            ?.flatMap((item) => (Array.isArray(item?.BlogBanner) ? item.BlogBanner : []))
            ?.filter(
                (b) => b?.BannerTitle && b?.BannerImage?.url && b?.ReadNow?.href // You can customize which fields are "required"
            )
            ?.slice(0, 2) || [];

    if (flattenedBlogs.length === 0) return null;

    const sectionTitle = similarstorytitle?.CommonTitle?.Title?.trim();
    const sectionDescription = similarstorytitle?.CommonTitle?.Description?.trim();

    return (
        <div className='mt-[80px]'>
            {sectionTitle && <h2 className='text-[32px] font-bold text-[#5865F2] mb-[10px]'>{sectionTitle}</h2>}
            {sectionDescription && <p className='text-[#555] text-[18px] mb-[40px]'>{sectionDescription}</p>}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-[40px]'>
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
                    const author = blog.author?.Author?.AuthorName?.trim();

                    const imageUrl = blog.BannerImage?.url
                        ? blog.BannerImage.url.startsWith("http")
                            ? blog.BannerImage.url
                            : `${process.env.NEXT_PUBLIC_STRAPI_URL || ""}${blog.BannerImage.url}`
                        : null;

                    const readLink = blog.ReadNow?.href;
                    const target = blog.ReadNow?.isExternal ? "_blank" : "_self";
                    const rel = blog.ReadNow?.isExternal ? "noopener noreferrer" : undefined;

                    // Ensure minimum required fields exist
                    if (!readLink || !imageUrl || !title) return null;

                    return (
                        <a key={index} href={readLink} target={target} rel={rel} className='group block'>
                            <div className='overflow-hidden rounded-[16px]'>
                                <Image
                                    src={imageUrl}
                                    alt={
                                        blog.BannerImage?.alternativeText?.trim() ||
                                        blog.BannerImage?.name?.trim() ||
                                        "Blog Image"
                                    }
                                    width={800}
                                    height={500}
                                    className='w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-300'
                                />
                            </div>

                            <div className='mt-[20px]'>
                                {category && (
                                    <span className='inline-block text-[14px] px-[12px] py-[4px] bg-[#EEF0FF] text-[#5865F2] rounded-full mb-[10px]'>
                                        {category}
                                    </span>
                                )}

                                {title && (
                                    <h3 className='text-[22px] font-semibold text-[#1E1E1E] mb-[12px] leading-snug'>
                                        {title}
                                    </h3>
                                )}

                                {(publishDate || author) && (
                                    <div className='text-[#666] text-[14px]'>
                                        {publishDate && <span>{publishDate}</span>}
                                        {publishDate && author && <span className='mx-2'>•</span>}
                                        {author && <span className='text-[#5865F2]'>{author}</span>}
                                    </div>
                                )}
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
