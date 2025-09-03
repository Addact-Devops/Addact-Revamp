"use client";

import { useEffect, useRef, useState } from "react";

export default function StaticOurProcess() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeStep, setActiveStep] = useState(0);
    const [activeLineStyle, setActiveLineStyle] = useState({
        top: "0px",
        height: "0px",
        opacity: "1",
    });

    const steps = [
        {
            id: "667",
            Title: "Share Your Requirements",
            Description:
                "Tell us about your project goals, required skill set, preferred engagement model, and timeline. We analyze your needs to tailor the right hiring plan.",
        },
        {
            id: "668",
            Title: "Evaluate Developer Profiles",
            Description:
                "We shortlist and share profiles of certified Sitecore developers who match your technical and business criteria. You get full visibility to assess their expertise.",
        },
        {
            id: "669",
            Title: "Conduct Interviews",
            Description:
                "You can personally interview the shortlisted developers to assess their technical knowledge, communication skills, and project alignment.",
        },
        {
            id: "670",
            Title: "Select Your Developer",
            Description:
                "Once you're confident, choose the developer or team that best fits your requirements. We ensure smooth onboarding and role allocation.",
        },
        {
            id: "671",
            Title: "Remote Onboarding",
            Description:
                "The selected Sitecore developer(s) seamlessly integrate with your team remotely, using your preferred tools and communication channels ready to deliver from day one.",
        },
    ];

    // Track active step
    useEffect(() => {
        const updateActiveStep = () => {
            const offset = window.innerHeight * 0.6;
            const positions = stepRefs.current.map((ref) => ref?.getBoundingClientRect().top ?? 9999);
            const activeIndex = positions.findIndex((pos) => pos > offset);
            const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

            const finalActive = isAtBottom
                ? positions.length - 1
                : activeIndex === -1
                ? positions.length - 1
                : Math.max(0, activeIndex - 1);

            setActiveStep(finalActive);
        };

        window.addEventListener("scroll", updateActiveStep);
        updateActiveStep();

        return () => window.removeEventListener("scroll", updateActiveStep);
    }, []);

    // Update line position
    useEffect(() => {
        const isMobile = window.innerWidth < 768; // Tailwind md breakpoint
        const offsetFix = isMobile ? 40 : 85;

        const current = stepRefs.current[activeStep];
        const next = stepRefs.current[activeStep + 1];

        if (current) {
            const currentDotEl = current.querySelector("div[class*='rounded-full']");
            const dotRadius = (currentDotEl?.clientHeight ?? (isMobile ? 16 : 24)) / 2;

            const currentDotTop = current.offsetTop + current.offsetHeight / 2 - offsetFix;

            let nextDotTop: number;
            if (next) {
                const nextDotEl = next.querySelector("div[class*='rounded-full']");
                const nextDotRadius = (nextDotEl?.clientHeight ?? (isMobile ? 16 : 24)) / 2;
                nextDotTop = next.offsetTop + next.offsetHeight / 2 - offsetFix;
                if (isMobile) {
                    nextDotTop += nextDotRadius - dotRadius;
                }
            } else {
                const prev = stepRefs.current[activeStep - 1];
                let spacing = isMobile ? 80 : 120;
                if (prev) {
                    const prevCenter = prev.offsetTop + prev.offsetHeight / 2 - offsetFix;
                    spacing = currentDotTop - prevCenter;
                }
                nextDotTop = currentDotTop + spacing;
            }

            setActiveLineStyle({
                top: `${currentDotTop - dotRadius}px`,
                height: `${nextDotTop - currentDotTop}px`,
                opacity: "1",
            });
        }
    }, [activeStep]);

    return (
        <section className="container mb-[100px] my-[60px] xl:my-[100px] 2xl:my-[200px]" ref={containerRef}>
            <div>
                <h2 className="border-after !text-[28px] md:!text-[40px] 2xl:!text-[60px] !pb-4 xl:!pb-10">
                    Our Process
                </h2>

                <div className="relative flex mt-[40px] md:mt-[60px] lg:mt-[100px]">
                    {/* Background gray line */}
                    <div className="absolute left-1 md:left-1/2 transform -translate-x-1/2 top-0 w-[2px] h-full bg-gray-600 opacity-40 z-0" />

                    {/* Active white animated line */}
                    <div
                        className="absolute left-1 md:left-1/2 transform -translate-x-1/2 w-[2px] bg-white z-10 transition-all duration-500 ease-in-out"
                        style={activeLineStyle}
                    />

                    {/* Steps */}
                    <div className="w-full relative z-20">
                        {steps.map((step, index) => {
                            const isLeft = index % 2 !== 0;
                            const isActive = index === activeStep;

                            return (
                                <div
                                    key={step.id}
                                    ref={(el) => {
                                        stepRefs.current[index] = el;
                                    }}
                                    className="relative flex flex-col md:flex-row justify-between items-start w-full mb-[40px] md:mb-[50px] lg:mb-[60px] xl:mb-[70px]"
                                >
                                    {/* Left content (desktop) */}
                                    {isLeft ? (
                                        <div className="hidden md:block w-1/2 pr-[50px] text-left">
                                            <p className="font-normal text-[12px] mb-[18px] md:text-[24px] md:leading-[48px]">
                                                Step {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                            </p>
                                            <div className="font-normal text-[18px] md:text-[30px] mb-[16px]">
                                                {step.Title}
                                            </div>
                                            <div className="text-gray-300 text-[12px] md:text-[20px] leading-[34px]">
                                                {step.Description}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="hidden md:block w-1/2" />
                                    )}

                                    {/* Mobile content */}
                                    <div className="block md:hidden w-full pl-[25px]">
                                        <p className="font-normal text-[12px] mb-[18px]">
                                            Step {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                        </p>
                                        <div className="font-normal text-[18px] mb-[12px]">{step.Title}</div>
                                        <div className="text-gray-300 text-[12px] leading-[19px]">
                                            {step.Description}
                                        </div>
                                    </div>

                                    {/* Dot */}
                                    <div
                                        className={`w-[16px] h-[16px] md:w-[24px] md:h-[24px] rounded-full absolute left-[4px] md:left-1/2 -translate-x-1/2 z-24 border-2 transition-all duration-300 ${
                                            isActive ? "bg-[#3C4CFF] border-white" : "bg-black border-white/20"
                                        }`}
                                    ></div>

                                    {/* Right content (desktop) */}
                                    {!isLeft ? (
                                        <div className="hidden md:block w-1/2 pl-[50px] text-left">
                                            <p className="font-normal text-[12px] mb-[18px] md:text-[24px] md:leading-[48px]">
                                                Step {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                            </p>
                                            <div className="font-normal text-[18px] md:text-[30px] mb-[16px]">
                                                {step.Title}
                                            </div>
                                            <div className="text-gray-300 text-[12px] md:text-[20px] leading-[34px]">
                                                {step.Description}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="hidden md:block w-1/2" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
