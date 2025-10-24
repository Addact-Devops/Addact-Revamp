"use client";
import { useState } from "react";
import Image from "next/image";
import { Whyaddact } from "@/graphql/queries/getHomePage";
import RichText from "../atom/richText";

/** ✅ (Optional) industry variant type kept for reference; not required for the prop anymore */
type HeadingBlock = {
    id?: string;
    h1?: string;
    h2?: string;
    h3?: string;
    h5?: string;
    h6?: string;
    Richtext?: string;
};

type IndustryWhyAddact = {
    Title?: HeadingBlock[] | null;
    GlobalCard?: Array<{
        id?: string;
        Title?: string | null;
        Description?: string | null;
        Image?: {
            url?: string | null;
            alternativeText?: string | null;
            width?: number | null;
            height?: number | null;
        } | null;
    }> | null;
};

/** ⬇️ Loosened prop type to avoid TS mismatch between home & industry shapes */
interface IProps {
    // Using `any` here unblocks strict differences (nullability, missing fields) between the two sources
    data: any; // Whyaddact | IndustryWhyAddact | null | undefined;
}

const WhyAddact = ({ data }: IProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    /** ✅ Safely compute heading from any h1/h2/h3/h5/h6 (fallback to empty string) */
    const titleArray = (data as any)?.Title as HeadingBlock[] | null | undefined;
    const firstTitleBlock = Array.isArray(titleArray) ? titleArray[0] : null;
    const heading: string =
        firstTitleBlock?.h2 ??
        firstTitleBlock?.h1 ??
        firstTitleBlock?.h3 ??
        firstTitleBlock?.h5 ??
        firstTitleBlock?.h6 ??
        "";

    /** ✅ Normalize cards array (handles null/undefined) */
    const cardsRaw = (data as any)?.GlobalCard as any[] | null | undefined;
    const cards = Array.isArray(cardsRaw) ? cardsRaw : [];

    return (
        <section className="my-[60px] xl:my-[100px] 2xl:my-[200px]">
            <div className="container">
                <div className="flex flex-col">
                    <h2 className="border-after !text-[28px] md:!text-[40px] 2xl:!text-[60px] !pb-4 xl:!pb-10">
                        {heading}
                    </h2>

                    {/* Mobile Accordion */}
                    <div className="block sm:hidden mt-8 -mx-6 bg-[#1c1c1c]">
                        {cards.slice(0, 6).map((service: any, index: number) => (
                            <div
                                key={service?.id ?? index}
                                className={`${index === 0 ? "border-t" : ""} border-b border-gray-700`}
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="flex justify-between items-center w-full py-4 px-6 text-left text-white"
                                >
                                    <span className="text-lg font-[400] md:font-semibold">{service?.Title}</span>
                                    <svg
                                        className={`w-5 h-5 transform transition-transform duration-300 ${
                                            openIndex === index ? "rotate-180" : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {openIndex === index && (
                                    <div className="pb-4 px-6">
                                        {/* Icon removed in mobile */}
                                        <div className="text-[16px] text-white">
                                            <RichText
                                                html={(service?.Description ?? "")
                                                    .toString()
                                                    .replace(/^<p>|<\/p>$/g, "")}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Desktop Grid */}
                    <section className="hidden sm:block">
                        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 sm:mt-14 2xl:mt-24">
                            {cards.slice(0, 6).map((service: any, index: number) => (
                                <div key={service?.id ?? index} className="relative">
                                    <div className="text-white p-4 2xl:p-7">
                                        {/* Icon only for desktop */}
                                        <div className="w-10 lg:w-14 lg:h-14 2xl:w-20 h-10 2xl:h-20 rounded-sm mb-4">
                                            {service?.Image?.url && (
                                                <Image
                                                    src={service.Image.url}
                                                    alt={service.Image.alternativeText ?? ""}
                                                    width={service.Image.width ?? 0}
                                                    height={service.Image.height ?? 0}
                                                />
                                            )}
                                        </div>
                                        <h3 className="!text-[25px] 2xl:!text-3xl my-[30px]">{service?.Title}</h3>
                                        <div className="text-[18px] 2xl:text-[20px] text-white">
                                            <RichText
                                                html={(service?.Description ?? "")
                                                    .toString()
                                                    .replace(/^<p>|<\/p>$/g, "")}
                                            />
                                        </div>
                                    </div>
                                    {(index + 1) % 3 !== 0 && (
                                        <div className="absolute top-1/8 right-0 h-3/4 w-[1px] bg-white opacity-40"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default WhyAddact;
