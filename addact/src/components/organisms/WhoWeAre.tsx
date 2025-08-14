"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "@/styles/components/whoweare.scss";
import { getWhoAreWe, WhoAreWeResponse } from "@/graphql/queries/whoAreWe";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const WhoWeAre = () => {
    const numberRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [data, setData] = useState<WhoAreWeResponse>();
    const counterSectionRef = useRef<HTMLDivElement>(null);
    const counterSuffixes = useMemo(() => ["%", "+", "", "+"], []); // order matches data?.whoAreWes[0].Counter

    // Store cleaned plain text chunks (remove HTML tags)
    const RawText1 =
        "At Addact, we’re more than just a CMS development company we are experts in crafting intelligent, personalized digital experiences. Backed by experienced and skilled CMS developers, we deliver next-gen Sitecore, Umbraco, Kentico, Strapi and more CMS development services that drive engagement, boost performance, and help brands scale faster with confidence.";

    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        (async () => {
            const res = await getWhoAreWe();
            setData(res);
        })();
    }, []);
    const wordArray = RawText1?.trim().split(" ");
    useEffect(() => {
        if (!containerRef.current || !textRef.current) return;
        const ctx = gsap.context(() => {
            const words = gsap.utils.toArray<HTMLElement>(".word");

            gsap.set(words, { opacity: 0, y: 20 });
            ScrollTrigger.matchMedia({
                // Desktop
                "(min-width: 768px)": () => {
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 170",
                            end: () => {
                                const wordCount = document.querySelectorAll(".word").length;
                                const baseUnit = window.innerWidth < 768 ? 50 : 70;
                                return `+=${wordCount * baseUnit}`;
                            },
                            scrub: true,
                            pin: true,
                            markers: false,
                        },
                    });

                    words.forEach((word, i) => {
                        tl.to(word, { opacity: 1, y: 0, ease: "power2.out", duration: 0.2 }, i * 0.05);
                    });
                },

                // Mobile
                "(max-width: 767px)": () => {
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 70",
                            end: () => {
                                const wordCount = document.querySelectorAll(".word").length;
                                const baseUnit = window.innerWidth < 768 ? 50 : 35;
                                return `+=${wordCount * baseUnit}`;
                            },
                            scrub: true,
                            pin: true,
                            markers: false,
                        },
                    });

                    words.forEach((word, i) => {
                        tl.to(word, { opacity: 1, y: 0, ease: "power2.out", duration: 0.2 }, i * 0.05);
                    });
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);
    useEffect(() => {
        if (!containerRef.current) return;
        const wordCount = document.querySelectorAll(".word").length;
        const baseHeight = window.innerWidth < 768 ? 27 : 1;
        const minHeight = wordCount * baseHeight;
        containerRef.current.style.minHeight = `${minHeight}px`;
    }, []);

    // Animate counters
    const animateCount = (el: HTMLDivElement, target: number, suffix: string = "", duration: number = 2000) => {
        let start = 0;
        const interval = 30; // ms
        const steps = Math.max(1, Math.floor(duration / interval));
        const increment = target / steps;

        const isFractional = !Number.isInteger(target);
        const intTarget = Math.floor(target);

        const formatFinal = (num: number) => {
            const decimals = num % 1 !== 0 ? num.toString().split(".")[1]?.length || 0 : 0;
            return decimals > 0 ? num.toFixed(decimals) : `${num}`;
        };

        const timer = setInterval(() => {
            start += increment;

            if (start >= target) {
                el.innerText = `${formatFinal(target)}${suffix}`;
                clearInterval(timer);
                return;
            }

            let display: number;
            if (isFractional) {
                // 1,2,3,4 ... then final 4.9
                display = Math.min(Math.floor(start), intTarget);
            } else {
                // 1..N (never exceeding target)
                display = Math.min(Math.ceil(start), target);
            }
            el.innerText = `${display}${suffix}`;
        }, interval);
    };

    useEffect(() => {
        if (!counterSectionRef.current || !data?.whoAreWes[0]?.Counter) return;

        const trigger = ScrollTrigger.create({
            trigger: counterSectionRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
                numberRefs.current.forEach((ref, i) => {
                    const item = data.whoAreWes[0].Counter[i];
                    if (ref && item) {
                        animateCount(ref, item.NumberCount, counterSuffixes[i] || "");
                    }
                });
            },
        });

        return () => trigger.kill();
    }, [data, counterSuffixes]);

    return (
        <>
            <section
                className="who-we-are gap my-24 sm:my-32 md:my-40 lg:my-60 !mx-h-[100%] !h-[100%]"
                ref={containerRef}
            >
                <div className="container">
                    <div className="flex gap-10 md:gap-[40px] 2xl:gap-[100px] flex-wrap lg:flex-nowrap">
                        <h2 className="w-full lg:w-[40%] border-after !text-[28px] md:!text-5xl !pb-4 xl:!pb-10">
                            {data?.whoAreWes[0].Title[0].Title}
                        </h2>

                        <div className="relative overflow-hidden w-full text-left  large">
                            <div className="sticky top-0 flex items-center justify-center">
                                <div
                                    ref={textRef}
                                    className="lg:text-[22px] 2xl:text-[34px]  leading-relaxed flex flex-wrap gap-x-[10px]"
                                >
                                    {wordArray.map((word, idx) => (
                                        <span key={idx} className="word inline-block whitespace-nowrap opacity-0">
                                            {word}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        ref={counterSectionRef}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border border-white/15 mt-24 overflow-hidden"
                    >
                        {data?.whoAreWes[0].Counter.map((item, index) => (
                            <div
                                key={item.id}
                                className="text-center p-[60px] border-r border-white/15 last:border-r-0"
                            >
                                <h2
                                    className="text-white !font-bold text-3xl mb-2 transition-colors duration-300 text-left"
                                    ref={(el) => {
                                        numberRefs.current[index] = el;
                                    }}
                                >
                                    {`0${counterSuffixes[index] || ""}`}
                                </h2>
                                <div className="text-2xl text-left font-normal leading-[1.75]">{item.CounterTitle}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default WhoWeAre;
