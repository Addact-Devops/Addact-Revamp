"use client";
import Link from "next/link";

type ContactCard = {
    id: string;
    CardTitle: string;
    CardDescription: string;
    CardLink?: {
        href: string;
        label: string;
        isExternal: boolean;
        target: string;
    };
    BgImage?: {
        url: string;
        width: number;
        height: number;
        name: string;
        alternativeText?: string;
    };
};

export default function BlogContactCard({ card }: { card?: ContactCard }) {
    if (!card) return null;

    const { CardTitle, CardDescription, CardLink, BgImage } = card;

    return (
        <div className="bg-[#23272A] px-[30px] py-[60px]  max-[1300px]:py-[30px]  relative rounded-[20px] w-[400px] max-[1400px]:w-[380px]">
            {BgImage?.url && (
                <img
                    src={BgImage.url}
                    alt={BgImage.alternativeText || BgImage.name}
                    width={BgImage.width}
                    height={BgImage.height}
                    className="absolute max-h-[140px] right-0 bottom-[30px]"
                />
            )}

            {CardTitle && <div className="text-white text-[30px] font-bold mb-10 relative">{CardTitle}</div>}

            {CardDescription && <p className="!text-white !mb-[40px] relative">{CardDescription}</p>}

            {CardLink?.href && CardLink?.label && (
                <Link
                    href={CardLink.href}
                    target={CardLink.target || "_self"}
                    rel={CardLink.isExternal ? "noopener noreferrer" : undefined}
                    className="inline-block px-[50px] py-[17px] rounded-[30px] bg-[#F4F4F4] text-[17px] text-[#23272A] font-semibold relative"
                >
                    {CardLink.label}
                </Link>
            )}
        </div>
    );
}
