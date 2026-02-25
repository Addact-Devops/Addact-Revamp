"use client";
import { useState } from "react";
import Image from "next/image";
import type { Whyaddact } from "@/graphql/queries/getHomePage"; // use type-only import
import RichText from "../atom/richText";
import { motion } from "framer-motion";
import SpotlightCard from "../atom/SpotlightCard";
import TechReveal from "../atom/TechReveal";

import { MessageSquare, Users, Clock, ShieldCheck, Sparkles, Zap, HeartHandshake, CheckCircle2 } from "lucide-react";

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

/** Helper to get a relevant icon based on title keywords */
const getFallbackIcon = (title: string = "") => {
    const t = title.toLowerCase();
    if (t.includes("communication") || t.includes("dialogue")) return <MessageSquare className="w-8 h-8 md:w-10 md:h-10 text-brand-blue" />;
    if (t.includes("collaboration") || t.includes("team") || t.includes("partner")) return <Users className="w-8 h-8 md:w-10 md:h-10 text-brand-blue" />;
    if (t.includes("hour") || t.includes("clock") || t.includes("time") || t.includes("free")) return <Clock className="w-8 h-8 md:w-10 md:h-10 text-brand-blue" />;
    if (t.includes("secure") || t.includes("trust") || t.includes("safety")) return <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-brand-blue" />;
    if (t.includes("expert") || t.includes("premium") || t.includes("quality")) return <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-brand-blue" />;
    if (t.includes("centric")) return <HeartHandshake className="w-8 h-8 md:w-10 md:h-10 text-brand-blue" />;
    if (t.includes("fast") || t.includes("speed")) return <Zap className="w-8 h-8 md:w-10 md:h-10 text-brand-blue" />;
    return <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-brand-blue" />;
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
        <section className="my-[80px] lg:my-[100px] 2xl:my-[200px] bg-white">
            <div className="container">
                <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                        <motion.h2
                            className="border-after text-[28px]! md:text-[40px]! 2xl:text-[60px]! pb-4! xl:pb-10! text-black border-black/10"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <TechReveal text={heading || "Why Partner With Us"} duration={0.8} />
                        </motion.h2>
                    </div>

                    {/* Mobile Accordion */}
                    <div className="block sm:hidden mt-8 -mx-6 bg-brand-blue-light/20">
                        {cards.slice(0, 6).map((service: CardItem, index: number) => (
                            <div
                                key={service?.id ?? index}
                                className={`${index === 0 ? "border-t" : ""} border-b border-black/5`}
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="flex justify-between items-center w-full py-5 px-6 text-left text-black"
                                >
                                    <span className="text-lg font-bold text-black">{service?.Title ?? ""}</span>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <svg
                                            className="w-5 h-5 text-brand-blue"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.div>
                                </button>
                                {openIndex === index && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="pb-6 px-6"
                                    >
                                        <div className="text-[16px] text-zinc-600 leading-relaxed font-medium">
                                            <RichText
                                                html={(service?.Description ?? "")
                                                    .toString()
                                                    .replace(/^<p>|<\/p>$/g, "")}
                                            />
                                        </div>
                                    </motion.div>
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
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -8, transition: { duration: 0.25 } }}
                                >
                                    <SpotlightCard className="h-full group rounded-3xl transition-shadow duration-300 hover:shadow-2xl hover:shadow-brand-blue/5">
                                        <div className="p-8 2xl:p-10 h-full flex flex-col">
                                            {/* Icon with background */}
                                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-brand-blue/5 group-hover:bg-brand-blue/10 flex items-center justify-center mb-8 transition-colors duration-300">
                                                {service?.Image?.url ? (
                                                        <Image
                                                            src={service.Image.url}
                                                            alt={service.Image.alternativeText ?? ""}
                                                            width={service.Image.width ?? 0}
                                                            height={service.Image.height ?? 0}
                                                            className="w-10 h-10 md:w-12 md:h-12 object-contain brand-blue-filter opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                                                        />
                                                ) : (
                                                    <div className="group-hover:scale-110 transition-transform duration-300">
                                                        {getFallbackIcon(service?.Title || "")}
                                                    </div>
                                                )}
                                            </div>

                                            <h3 className="text-2xl 2xl:text-3xl mb-4 font-black tracking-tight text-black group-hover:text-brand-blue transition-colors duration-300">
                                                {service?.Title ?? ""}
                                            </h3>

                                            <div className="text-[17px] 2xl:text-[20px] text-zinc-600 leading-relaxed font-medium">
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
