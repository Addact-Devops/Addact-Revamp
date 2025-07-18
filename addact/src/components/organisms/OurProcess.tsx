"use client";

import { useEffect, useRef, useState } from "react";
import { getOurProcess, OurProcessData } from "@/graphql/queries/getOurProcess";

export default function OurProcess() {
    const [data, setData] = useState<OurProcessData["home"]["ourprocess"]>();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeStep, setActiveStep] = useState(0);
    const [activeLineStyle, setActiveLineStyle] = useState({
        top: "0px",
        height: "0px",
        opacity: "1",
    });

    // Fetch data
    useEffect(() => {
        (async () => {
            const res = await getOurProcess();
            setData(res.home.ourprocess);
        })();
    }, []);

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
    }, [data]);

    // Update line position
    useEffect(() => {
        const offsetFix = 85;
        const current = stepRefs.current[activeStep];
        const next = stepRefs.current[activeStep + 1];

        if (current) {
            const currentDotTop = current.offsetTop + current.offsetHeight / 2 - offsetFix;

            let nextDotTop: number;

            if (next) {
                nextDotTop = next.offsetTop + next.offsetHeight / 2 - offsetFix;
            } else {
                // ✅ Dynamically estimate the average step spacing
                const prev = stepRefs.current[activeStep - 1];
                let spacing = 120; // fallback default spacing

                if (prev) {
                    const prevCenter = prev.offsetTop + prev.offsetHeight / 2 - offsetFix;
                    spacing = currentDotTop - prevCenter;
                }

                nextDotTop = currentDotTop + spacing;
            }

            setActiveLineStyle({
                top: `${currentDotTop}px`,
                height: `${nextDotTop - currentDotTop}px`,
                opacity: "1",
            });
        }
    }, [activeStep, data]);

    const getTitle = () => {
        const title = data?.Title?.[0];
        return title?.h1 || title?.h2 || title?.h3 || title?.h4 || title?.h5 || title?.h6 || "Our Process";
    };

    return (
        <section className='container' ref={containerRef}>
            <div
                className='
                mt-[240px] mb-[240px]
                max-1600:mt-[100px] max-1600:mb-[100px]
                max-1500:mt-[80px] max-1500:mb-[80px]
            '
            >
                <h2 className='border-after'>{getTitle()}</h2>

                <div className='relative flex mt-[40px] md:mt-[60px] lg:mt-[100px]'>
                    {/* Background gray line */}
                    <div className='absolute left-1 md:left-1/2 transform -translate-x-1/2 top-0 w-[2px] h-full bg-gray-600 opacity-40 z-0' />

                    {/* Active white animated line */}
                    <div
                        className='absolute left-1 md:left-1/2 transform -translate-x-1/2 w-[2px] bg-white z-10 transition-all duration-500 ease-in-out'
                        style={activeLineStyle}
                    />

                    {/* Steps */}
                    <div className='w-full relative z-20'>
                        {data?.ProcessData?.map((step, index: number) => {
                            const isLeft = index % 2 !== 0;
                            const isActive = index === activeStep;

                            return (
                                <div
                                    key={step.id}
                                    ref={(el) => {
                                        stepRefs.current[index] = el;
                                    }}
                                    className='relative flex flex-col md:flex-row justify-between items-start w-full mb-[40px] md:mb-[50px] lg:mb-[60px] xl:mb-[70px]'
                                >
                                    {/* Left content (used only on md and up) */}
                                    {isLeft ? (
                                        <div className='hidden md:block w-1/2 pr-[50px] text-left'>
                                            <p className='font-normal text-[12px] leading-[100%] mb-[18px] md:text-[24px] md:leading-[48px]'>
                                                Step {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                            </p>
                                            <div className='font-normal text-[18px] leading-[100%] mb-[12px] md:font-medium md:text-[30px] md:leading-[48px] md:mb-[16px]'>
                                                {step.Title}
                                            </div>
                                            <div
                                                className='text-gray-300 font-normal text-[12px] leading-[19px] md:text-[20px] md:leading-[34px]'
                                                dangerouslySetInnerHTML={{ __html: step.Description }}
                                            />
                                        </div>
                                    ) : (
                                        <div className='hidden md:block w-1/2' />
                                    )}

                                    {/* Mobile content — always shows on mobile, hidden on md+ */}
                                    <div className='block md:hidden w-full pl-[25px]'>
                                        <p className='font-normal text-[12px] leading-[100%] mb-[18px]'>
                                            Step {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                        </p>
                                        <div className='font-normal text-[18px] leading-[100%] mb-[12px]'>
                                            {step.Title}
                                        </div>
                                        <div
                                            className='text-gray-300 font-normal text-[12px] leading-[19px]'
                                            dangerouslySetInnerHTML={{ __html: step.Description }}
                                        />
                                    </div>

                                    {/* Dot */}
                                    <div
                                        className={`w-[16px] h-[16px] md:w-[24px] md:h-[24px] rounded-full absolute left-[4px] md:left-1/2 -translate-x-1/2 z-24 border-2 transition-all duration-300
      ${isActive ? "bg-[#3C4CFF] border-white" : "bg-black border-white/20"}`}
                                    ></div>

                                    {/* Right content (only for desktop) */}
                                    {!isLeft ? (
                                        <div className='hidden md:block w-1/2 pl-[50px] text-left'>
                                            <p className='font-normal text-[12px] leading-[100%] mb-[18px] md:text-[24px] md:leading-[48px]'>
                                                Step {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                            </p>
                                            <div className='font-normal text-[18px] leading-[100%] mb-[12px] md:font-medium md:text-[30px] md:leading-[48px] md:mb-[16px]'>
                                                {step.Title}
                                            </div>
                                            <div
                                                className='text-gray-300 font-normal text-[12px] leading-[19px] md:text-[20px] md:leading-[34px]'
                                                dangerouslySetInnerHTML={{ __html: step.Description }}
                                            />
                                        </div>
                                    ) : (
                                        <div className='hidden md:block w-1/2' />
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
