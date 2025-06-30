// components/organisms/BlogDetailBanner.tsx
"use client";
import Image from "next/image";

type BannerImageType = {
    url?: string;
    width?: number;
    height?: number;
    name?: string;
    alternativeText?: string;
};

type BlogDetailBannerProps = {
    banner?: {
        BannerTitle?: string;
        BannerDescription?: string;
        BannerImage?: BannerImageType;
        PublishDate?: string;
        blogcategory?: {
            Category?: {
                CategoryTitle?: string;
            };
        };
    };
};

export default function BlogDetailBanner({ banner }: BlogDetailBannerProps) {
    if (!banner) return null;

    const { BannerTitle, BannerDescription, BannerImage, PublishDate, blogcategory } = banner;

    const imageUrl = BannerImage?.url
        ? BannerImage.url.startsWith("http")
            ? BannerImage.url
            : `${process.env.NEXT_PUBLIC_STRAPI_URL || ""}${BannerImage.url}`
        : null;

    const formattedDate = PublishDate
        ? new Date(PublishDate).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : null;

    return (
        <section className="bg-[#131318] py-[120px] max-[1300px]:py-[80px] max-[991px]:py-[60px]">
            <div className="container">
                <div className="flex !items-center flex-col min-[992px]:flex-row items-start justify-between gap-[150px] max-[1200px]:gap-[80px] max-[992px]:gap-[60px]">
                    <div className="w-full min-[992px]:w-1/2:w-1/2 order-1 min-[992px]:w-1/2:order-none text-white">
                        {blogcategory?.Category?.CategoryTitle && (
                            <span className="rounded-[7px] bg-[#424246] px-[20px] py-[3px] text-[20px] max-[991px]:text-[17px] text-white">
                                {blogcategory.Category.CategoryTitle}
                            </span>
                        )}
                        {BannerTitle && (
                            <h1 className="!font-semibold !text-white !mt-[33px] !mb-[40px]">{BannerTitle}</h1>
                        )}
                        {BannerDescription && <p className="!text-white">{BannerDescription}</p>}
                        <p className="!text-white !mt-[40px] ">
                            <b>Published:</b> {formattedDate && <>{formattedDate}</>}
                        </p>
                    </div>

                    {imageUrl && (
                        <div className="w-full min-[992px]:w-1/2:w-1/2 relative order-2">
                            {BannerImage?.url && BannerImage?.width && BannerImage?.height && (
                                <Image
                                    src={
                                        BannerImage.url.startsWith("http")
                                            ? BannerImage.url
                                            : `${process.env.NEXT_PUBLIC_STRAPI_URL}${BannerImage.url}`
                                    }
                                    alt={BannerImage.alternativeText || BannerImage.name || "Banner"}
                                    width={BannerImage.width}
                                    height={BannerImage.height}
                                    className="object-cover rounded-xl max-w-full h-auto !m-0 !w-full"
                                    priority
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
