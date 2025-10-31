"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import RichText from "../atom/richText";

/** Shared shapes */
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

type DataLike = {
    Title?: HeadingBlock[] | null;
    GlobalCard?: CardItem[] | null;
};

/** Prop type: accept home/industry-like shape */
interface IProps {
    data?: DataLike | null;
}

const getHeading = (titleBlocks?: HeadingBlock[] | null): string => {
    const first = Array.isArray(titleBlocks) ? titleBlocks[0] : undefined;
    return first?.h2 ?? first?.h1 ?? first?.h3 ?? first?.h5 ?? first?.h6 ?? "";
};

const getCards = (data?: DataLike | null): CardItem[] => {
    const raw = data?.GlobalCard;
    return Array.isArray(raw) ? raw : [];
};

const WhyAddactWithAnimation = ({ data }: IProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [play, setPlay] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    /** Heading & cards (works for both shapes) */
    const heading = getHeading(data?.Title);
    const cards = getCards(data);

    // ▶️ Start the slide-in animation when this section enters the viewport
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        if (!("IntersectionObserver" in window)) {
            setPlay(true);
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPlay(true);
                    io.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`my-[80px] lg:my-[100px] 2xl:my-[200px] whyaddact-anim ${play ? "play" : ""}`}
        >
            <div className="container">
                <div className="flex flex-col">
                    <h2 className="border-after !text-[28px] md:!text-[40px] 2xl:!text-[60px] !pb-4 xl:!pb-10">
                        {heading}
                    </h2>

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
                        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 sm:mt-14 2xl:mt-24">
                            {cards.slice(0, 6).map((service: CardItem, index: number) => (
                                <div key={service?.id ?? index} className="relative">
                                    <div className="text-white p-4 2xl:p-7 overflow-hidden">
                                        {/* Icon only for desktop (no animation on icon) */}
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

                                        {/* 🔥 Animate ONLY these two elements */}
                                        <h3 className="slide-x !text-[25px] 2xl:!text-3xl my-[30px]">
                                            {service?.Title ?? ""}
                                        </h3>

                                        <div className="slide-x text-[18px] 2xl:text-[20px] text-white">
                                            <RichText
                                                html={(service?.Description ?? "")
                                                    .toString()
                                                    .replace(/^<p>|<\/p>$/g, "")}
                                            />
                                        </div>
                                    </div>

                                    {/* ✅ Responsive dividers:
                      - Below lg (sm–md): 2 columns => divider on first column only
                      - lg and up: 3 columns => divider on columns 1 & 2
                  */}
                                    {(index + 1) % 2 !== 0 && (
                                        <div className="absolute top-1/8 right-0 h-3/4 w-[1px] bg-white opacity-40 lg:hidden"></div>
                                    )}
                                    {(index + 1) % 3 !== 0 && (
                                        <div className="absolute top-1/8 right-0 h-3/4 w-[1px] bg-white opacity-40 hidden lg:block"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* 🔒 Scoped animation styles */}
            <style jsx global>{`
                /* Respect reduced motion */
                @media (prefers-reduced-motion: reduce) {
                    .whyaddact-anim .slide-x {
                        transition: none !important;
                        transform: none !important;
                        opacity: 1 !important;
                    }
                }

                /* Default (before in-view): hidden + shifted left */
                .whyaddact-anim .slide-x {
                    transform: translateX(-100%);
                    opacity: 0;
                    will-change: transform, opacity;
                }

                /* When section has .play: slide to original position and reveal */
                .whyaddact-anim.play .slide-x {
                    transform: translateX(0);
                    opacity: 1;
                    transition: transform 600ms ease-out, opacity 600ms ease-out;
                }
            `}</style>
        </section>
    );
};

export default WhyAddactWithAnimation;
