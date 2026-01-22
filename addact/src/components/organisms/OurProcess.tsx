"use client";

import { useEffect, useRef, useState } from "react";
import { OurProcessData } from "@/graphql/queries/getOurProcess";

export default function OurProcess(props: {
  data?: OurProcessData["home"]["ourprocess"];
}) {
  const [data, setData] = useState<OurProcessData["home"]["ourprocess"]>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [activeLineStyle, setActiveLineStyle] = useState({
    top: "0px",
    height: "0px",
    opacity: "1",
  });

  // positions (centers) of each step used to render dots in same parent as the line
  const [stepCenters, setStepCenters] = useState<number[]>([]);

  // Fetch data
  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  // Track active step
  useEffect(() => {
    const updateActiveStep = () => {
      const offset = window.innerHeight * 0.6;
      const positions = stepRefs.current.map(
        (ref) => ref?.getBoundingClientRect().top ?? 9999,
      );
      const activeIndex = positions.findIndex((pos) => pos > offset);
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

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

  // Helper to calculate centers for dots (original approach then normalized so first dot top === 0)
  const recalcCenters = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const offsetFix = isMobile ? 40 : 85;

    // compute raw centers using same formula you used previously
    const rawCenters: number[] = stepRefs.current.map((ref) => {
      if (!ref) return 0;
      return ref.offsetTop + ref.offsetHeight / 2 - offsetFix;
    });

    // determine dot size used in UI (match CSS: 16px on mobile, 24px on md+)
    const dotSize = isMobile ? 16 : 24;
    const dotRadius = dotSize / 2;

    // If we have at least one center, shift all centers so that the FIRST dot's top === 0
    // top = center - dotRadius. For top to be 0 => center === dotRadius.
    if (rawCenters.length > 0) {
      const firstRaw = rawCenters[0];
      const desiredFirstCenter = dotRadius; // center that makes first dot top = 0
      const shift = desiredFirstCenter - firstRaw;
      const adjusted = rawCenters.map((c) => c + shift);
      setStepCenters(adjusted);
    } else {
      setStepCenters(rawCenters);
    }
  };

  // Calculate centers on mount, data change, resize and when step refs change
  useEffect(() => {
    recalcCenters();

    const handleResize = () => {
      recalcCenters();
    };

    window.addEventListener("resize", handleResize);
    // short timeout to cover fonts/images/layout shifts
    const t = setTimeout(() => recalcCenters(), 200);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(t);
    };
  }, [data]);

  // Update line position — use the computed (and normalized) stepCenters so line & dots use same base
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const dotSize = isMobile ? 16 : 24;
    const dotRadius = dotSize / 2;

    // Use precomputed centers (normalized), fallback to computing if not ready
    const currentCenter = stepCenters[activeStep];
    const nextCenter = stepCenters[activeStep + 1];

    if (typeof currentCenter !== "undefined" && !isNaN(currentCenter)) {
      const currentDotTop = currentCenter;
      let nextDotTop: number;

      if (typeof nextCenter !== "undefined" && !isNaN(nextCenter)) {
        nextDotTop = nextCenter;
      } else {
        // fallback spacing when next isn't available (end of list) — use approximate spacing
        const prevCenter = stepCenters[activeStep - 1];
        let spacing = isMobile ? 80 : 120;
        if (typeof prevCenter !== "undefined" && !isNaN(prevCenter)) {
          spacing = currentDotTop - prevCenter;
        }
        nextDotTop = currentDotTop + spacing;
      }

      setActiveLineStyle({
        // line top should be currentDotTop - dotRadius (since style top is where line top starts)
        top: `${currentDotTop - dotRadius}px`,
        height: `${nextDotTop - currentDotTop}px`,
        opacity: "1",
      });
    } else {
      // fallback: zero out the line if centers aren't computed yet
      setActiveLineStyle({
        top: "0px",
        height: "0px",
        opacity: "0",
      });
    }
  }, [activeStep, stepCenters, data]);

  const getTitle = () => {
    const title = data?.Title?.[0];
    return (
      title?.h1 ||
      title?.h2 ||
      title?.h3 ||
      title?.h4 ||
      title?.h5 ||
      title?.h6 ||
      ""
    );
  };

  return (
    <section
      className="container my-[80px] lg:my-[100px] 2xl:my-[200px]"
      ref={containerRef}
    >
      <div>
        <h2 className="border-after !text-[28px] md:!text-[40px] 2xl:!text-[60px] !pb-4 xl:!pb-10">
          {getTitle()}
        </h2>

        {/* timeline wrapper — attach timelineRef here so line & dots are relative to same parent */}
        <div
          className="relative flex mt-[40px] md:mt-[60px] lg:mt-[100px]"
          ref={timelineRef}
        >
          {/* Background gray line */}
          <div className="absolute left-1 md:left-1/2 transform -translate-x-1/2 top-0 w-[2px] h-full bg-gray-600 opacity-40 z-0" />

          {/* Active white animated line */}
          <div
            className="absolute left-1 md:left-1/2 transform -translate-x-1/2 w-[2px] bg-white z-10 transition-all duration-500 ease-in-out"
            style={activeLineStyle}
          />

          {/* Render timeline dots here so they all share the same positioned parent as the lines */}
          {data?.ProcessData &&
            stepCenters.length === data.ProcessData.length &&
            data.ProcessData.map((_, i) => {
              const isMobile =
                typeof window !== "undefined" && window.innerWidth < 768;
              const dotSize = isMobile ? 16 : 24;
              const dotRadius = dotSize / 2;
              const center = stepCenters[i] ?? 0;
              const topPx = center ? center - dotRadius : 0;
              const isActive = i === activeStep;

              return (
                <div
                  key={`timeline-dot-${i}`}
                  className={`absolute left-1 md:left-1/2 transform -translate-x-1/2 z-20 border-2 transition-all duration-300`}
                  style={{
                    top: `${topPx}px`,
                    width: `${dotSize}px`,
                    height: `${dotSize}px`,
                    borderRadius: "9999px",
                    background: isActive ? "#3C4CFF" : "black",
                    borderColor: isActive ? "white" : "rgba(255,255,255,0.2)",
                  }}
                />
              );
            })}

          {/* Steps */}
          <div className="w-full relative z-20">
            {data?.ProcessData?.map((step, index: number) => {
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
                  {/* Left content (desktop only) */}
                  {isLeft ? (
                    <div className="hidden md:block w-1/2 pr-[50px] text-left">
                      <p className="font-normal text-[12px] leading-[100%] mb-[18px] md:text-[24px] md:leading-[48px]">
                        Step {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </p>
                      <div className="font-normal text-[18px] leading-[100%] mb-[12px] md:font-medium md:text-[30px] md:leading-[48px] md:mb-[16px]">
                        {step.Title}
                      </div>
                      <div
                        className="text-gray-300 font-normal text-[12px] leading-[19px] md:text-[20px] md:leading-[34px]"
                        dangerouslySetInnerHTML={{ __html: step.Description }}
                      />
                    </div>
                  ) : (
                    <div className="hidden md:block w-1/2" />
                  )}

                  {/* Mobile content */}
                  <div className="block md:hidden w-full pl-[25px]">
                    <p className="font-normal text-[12px] leading-[100%] mb-[18px]">
                      Step {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </p>
                    <div className="font-normal text-[18px] leading-[100%] mb-[12px]">
                      {step.Title}
                    </div>
                    <div
                      className="text-gray-300 font-normal text-[12px] leading-[19px]"
                      dangerouslySetInnerHTML={{ __html: step.Description }}
                    />
                  </div>

                  {/* Original Dot (left in DOM but invisible so we don't remove code) */}
                  <div
                    className={`w-[16px] h-[16px] md:w-[24px] md:h-[24px] rounded-full absolute left-[4px] md:left-1/2 -translate-x-1/2 z-24 border-2 transition-all duration-300 invisible
                                            ${isActive ? "bg-[#3C4CFF] border-white" : "bg-black border-white/20"}`}
                  ></div>

                  {/* Right content (desktop) */}
                  {!isLeft ? (
                    <div className="hidden md:block w-1/2 pl-[50px] text-left">
                      <p className="font-normal text-[12px] leading-[100%] mb-[18px] md:text-[24px] md:leading-[48px]">
                        Step {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </p>
                      <div className="font-normal text-[18px] leading-[100%] mb-[12px] md:font-medium md:text-[30px] md:leading-[48px] md:mb-[16px]">
                        {step.Title}
                      </div>
                      <div
                        className="text-gray-300 font-normal text-[12px] leading-[19px] md:text-[20px] md:leading-[34px]"
                        dangerouslySetInnerHTML={{ __html: step.Description }}
                      />
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
