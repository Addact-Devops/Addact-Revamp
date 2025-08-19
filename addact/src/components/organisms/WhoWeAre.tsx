"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "@/styles/components/whoweare.scss";
import { getWhoAreWe, WhoAreWeResponse } from "@/graphql/queries/whoAreWe";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import RichText from "../atom/richText";
gsap.registerPlugin(ScrollTrigger);
const WhoWeAre = () => {
    const numberRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [data, setData] = useState<WhoAreWeResponse>();
    const counterSectionRef = useRef<HTMLDivElement>(null);
    const counterSuffixes = useMemo(() => ["%", "+", "", "+"], []); // order matches data?.whoAreWes[0].Counter
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        (async () => {
            const res = await getWhoAreWe();
            setData(res);
        })();
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
                className="who-we-are my-[100px] xl:my-[150px] 2xl:my-[200px] !mx-h-[100%] !h-[100%]"
                ref={containerRef}
            >
                <div className="container">
                    <div className="flex gap-10 md:gap-[40px] 2xl:gap-[100px] flex-wrap lg:flex-nowrap">
                        <h2 className="w-full lg:w-[40%] border-after !text-[28px] md:!text-[40px] 2xl:!text-[60px] !pb-4 xl:!pb-10">
                            {data?.whoAreWes[0].Title[0].Title}
                        </h2>

                        <div className="relative overflow-hidden w-full text-left  large">
                            <div className="sticky top-0 flex items-center justify-center">
                                <div
                                    className={
                                        "flex flex-wrap gap-x-[10px] [&_p]:lg:!text-[22px] [&_p]:2xl:!text-[34px] [&_p]:!leading-relaxed"
                                    }
                                >
                                    <RichText html={data?.whoAreWes[0].Title[0].Description ?? ""} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        ref={counterSectionRef}
                        className="grid grid-cols-2 md:grid-cols-4 border border-white/15 border-b-0 md:border-b mt-20 2xl:mt-24 overflow-hidden"
                    >
                        {data?.whoAreWes[0].Counter.map((item, index) => {
                            const isSecondInRowMobile = (index + 1) % 2 === 0;
                            const isFourthInRowDesktop = (index + 1) % 4 === 0;
                            const isLastItem = index === data.whoAreWes[0].Counter.length - 1;

                            return (
                                <div
                                    key={item.id}
                                    className={`
                    text-center p-[24px] md:p-[60px] 
                    border-b md:border-b-0 
                    border-white/15 
                    ${!isSecondInRowMobile ? "border-r" : ""} 
                    ${isSecondInRowMobile ? "border-r-0" : ""} 
                    ${isFourthInRowDesktop ? "md:border-r-0" : "md:border-r"} 
                    ${isLastItem ? "border-r-0 md:border-r-0" : ""}
                `}
                                >
                                    <h2
                                        className="text-white !font-bold text-3xl mb-2 transition-colors duration-300 text-left"
                                        ref={(el) => {
                                            numberRefs.current[index] = el;
                                        }}
                                    >
                                        {`0${counterSuffixes[index] || ""}`}
                                    </h2>
                                    <div className="text-[14px] md:text-2xl text-left font-normal leading-[1.75] max-w-[70%] md:max-w-[100%]">
                                        {item.CounterTitle}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default WhoWeAre;
