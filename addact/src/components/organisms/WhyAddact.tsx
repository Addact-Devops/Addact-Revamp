"use client";
import { useState } from "react";
import Image from "next/image";
import type { Whyaddact } from "@/graphql/queries/getHomePage"; // use type-only import
import RichText from "../atom/richText";
import { motion } from "framer-motion";
import SpotlightCard from "../atom/SpotlightCard";
import TechReveal from "../atom/TechReveal";

/** ✅ (Optional) industry variant type kept for reference; now used in the prop union */
type HeadingBlock = {
    id?: string;
    h1?: string;
    h2?: string;
    h3?: string;
    h5?: string;
    h6?: string;
    Richtext?: string;
};

type CardImage = {
    url?: string | null;
    alternativeText?: string | null;
    width?: number | null;
    height?: number | null;
};

type CardItem = {
    id?: string;
    Title?: string | null;
    Description?: string | null;
    Image?: CardImage | null;
};

type IndustryWhyAddact = {
    Title?: HeadingBlock[] | null;
    GlobalCard?: CardItem[] | null;
};

/** ⬇️ Prop type: accept either home or industry shape (or null/undefined) */
interface IProps {
    data?: Whyaddact | IndustryWhyAddact | null;
}

const getHeading = (titleBlocks?: HeadingBlock[] | null): string => {
    const first = Array.isArray(titleBlocks) ? titleBlocks[0] : undefined;
    return first?.h2 ?? first?.h1 ?? first?.h3 ?? first?.h5 ?? first?.h6 ?? "";
};

const getCards = (maybeCards: unknown): CardItem[] => {
    const arr = maybeCards as { GlobalCard?: CardItem[] | null } | { cards?: CardItem[] } | null | undefined as
        | { GlobalCard?: CardItem[] | null }
        | null
        | undefined;

    const raw = arr?.GlobalCard;
    return Array.isArray(raw) ? raw : [];
};

const WhyAddact = ({ data }: IProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // ✅ Title (works for both shapes)
    const heading = getHeading(
        (data as IndustryWhyAddact | undefined)?.Title ?? (data as Whyaddact | undefined)?.Title
    );

    // ✅ Cards (works for both shapes)
    const cards = getCards(data as { GlobalCard?: CardItem[] | null } | null);

    return (
        <section className="my-[80px] lg:my-[100px] 2xl:my-[200px]">
            <div className="container">
                <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                        <motion.span
                            className="inline-block w-[10px] h-[10px] rounded-full bg-[#3C4CFF] shrink-0"
                            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.h2
                            className="border-after !text-[28px] md:!text-[40px] 2xl:!text-[60px] !pb-4 xl:!pb-10"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <TechReveal text={heading} duration={0.8} />
                        </motion.h2>
                    </div>

                    {/* Mobile Accordion */}
                    <div className="block sm:hidden mt-8 -mx-6 bg-[#1c1c1c]">
                        {cards.slice(0, 6).map((service: CardItem, index: number) => (
                            <div
                                key={service?.id ?? index}
                                className={`${index === 0 ? "border-t" : ""} border-b border-gray-700`}
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="flex justify-between items-center w-full py-4 px-6 text-left text-white"
                                >
                                    <span className="text-lg font-[400] md:font-semibold">{service?.Title ?? ""}</span>
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
                        <motion.div
                            className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 sm:mt-14 2xl:mt-24"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
                        >
                            {cards.slice(0, 6).map((service: CardItem, index: number) => (
                                <motion.div
                                    key={service?.id ?? index}
                                    className="relative h-full"
                                    variants={{ hidden: { opacity: 0, y: 35 }, visible: { opacity: 1, y: 0 } }}
                                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                >
                                    <SpotlightCard className="h-full">
                                        <div className="text-white p-4 2xl:p-7 h-full">
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
                                            <h3 className="!text-[25px] 2xl:!text-3xl my-[30px]">{service?.Title ?? ""}</h3>
                                            <div className="text-[18px] 2xl:text-[20px] text-white">
                                                <RichText
                                                    html={(service?.Description ?? "")
                                                        .toString()
                                                        .replace(/^<p>|<\/p>$/g, "")}
                                                />
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </motion.div>
                            ))}
                        </motion.div>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default WhyAddact;
