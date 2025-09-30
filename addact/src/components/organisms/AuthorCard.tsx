// components/organisms/AuthorCard.tsx
import Image from "next/image";

type Author = {
    AuthorName?: string;
    AuthorDescription?: string;
    AuthorImage?: {
        url?: string;
        width?: number;
        height?: number;
        name?: string;
        alternativeText?: string;
    };
    designation?: {
        DesignationTitle?: string;
    };
};

export default function AuthorCard({ author }: { author: Author }) {
    if (!author) return null;

    const AuthorName = author?.AuthorName || "Unknown Author";
    const designationText = author?.designation?.DesignationTitle || "Author";
    const AuthorDescription = author?.AuthorDescription || "";

    const imageUrl = author?.AuthorImage?.url
        ? author.AuthorImage.url.startsWith("http")
            ? author.AuthorImage.url
            : `${process.env.NEXT_PUBLIC_STRAPI_URL || ""}${author.AuthorImage.url}`
        : null;

    const cleanedDescription = AuthorDescription.replace(/^<p>/i, "")
        .replace(/<\/p>$/i, "")
        .replace(/<br\s*\/?>\s*(&nbsp;)?/gi, "")
        .trim();

    return (
        <div className="bg-[#DEE0FD] rounded-[20px] p-[40px] max-[991px]:p-[20px] mt-[100px] max-[991px]:mt-[60px]">
            <div className="min-[991px]:flex gap-[40px]">
                <div>
                    {imageUrl && (
                        <div>
                            <Image
                                src={imageUrl}
                                alt={author.AuthorImage?.alternativeText || author.AuthorImage?.name || "Author Image"}
                                width={120}
                                height={120}
                                className="object-cover rounded-full !m-[0] max-[991px]:!mb-[10px] !w-[120px] !min-w-[120px] h-[120px]"
                                priority
                            />
                        </div>
                    )}
                </div>

                <div>
                    <p className="!text-[#5865F2] !mb-[15px] !mt-0 !text-[25px] max-[1320px]:!text-[21px] max-[991px]:!text-[20px] font-bold">
                        {AuthorName}
                    </p>
                    <p className="!text-[25px] max-[1320px]:!text-[21px] max-[991px]:!text-[20px] font-bold">
                        {designationText}
                    </p>
                </div>
            </div>

            {cleanedDescription && (
                <p
                    className="mt-[40px] max-[991px]:mt-[20px]"
                    dangerouslySetInnerHTML={{ __html: cleanedDescription }}
                />
            )}
        </div>
    );
}
