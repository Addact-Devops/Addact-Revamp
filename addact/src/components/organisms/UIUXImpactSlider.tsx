"use client";

import { useEffect, useRef, useState } from "react";
import SlickImageCompare from "slick-image-compare";
import "./UIUXImpactSlider.css";
import type { ImpactUx } from "@/graphql/queries/getDevelopmentDesignSlug";

const UIUXImpactSlider = ({ data }: { data?: ImpactUx | null }) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  const beforeImageUrl = data?.beforeImage?.url ?? "/figma/before.png";
  const afterImageUrl = data?.afterImage?.url ?? "/figma/after.png";
  const title = data?.title ?? "See The Impact Of Better UX";
  const beforeText = data?.beforeText ?? "Before UX";
  const afterText = data?.afterText ?? "After UX";

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const instance = new (SlickImageCompare as unknown as new (
      target: Element | string,
      options?: Record<string, unknown>,
    ) => { destroy?: () => void })(el, {
      beforeImage: beforeImageUrl,
      afterImage: afterImageUrl,
      startPos: 50,
      smooth: true,
      smoothAmount: 220,
      animateOnClick: true,
      handleMinDistance: 40,
    });

    const handleStart = () => setIsInteracting(true);
    const handleEnd = () => setIsInteracting(false);

    // Listen on the circle element directly once slick renders it
    const attachCircleListeners = () => {
      const circle = el.querySelector<HTMLElement>(".sic-circle");
      if (circle) {
        circle.addEventListener("mousedown", handleStart);
        circle.addEventListener("touchstart", handleStart, { passive: true });
      } else {
        // fallback: listen on the whole slider
        el.addEventListener("mousedown", handleStart);
        el.addEventListener("touchstart", handleStart, { passive: true });
      }
    };

    // slick-image-compare renders synchronously, so this runs right after init
    attachCircleListeners();

    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchend", handleEnd);

    return () => {
      if (instance && typeof instance.destroy === "function") {
        instance.destroy();
      }
      const circle = el.querySelector<HTMLElement>(".sic-circle");
      if (circle) {
        circle.removeEventListener("mousedown", handleStart);
        circle.removeEventListener("touchstart", handleStart);
      } else {
        el.removeEventListener("mousedown", handleStart);
        el.removeEventListener("touchstart", handleStart);
      }
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [beforeImageUrl, afterImageUrl]);

  return (
    <section className="bg-white px-4 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
      <div className="mx-auto w-full max-w-[1604px]">
        <h2 className="text-center font-montserrat text-[34px] font-semibold! leading-tight text-[#0f0f0f] sm:text-[42px] lg:text-[56px]!">
          {title}
        </h2>

        <div className="relative mx-auto mt-10 w-full max-w-[1138px] lg:mt-14">
          <div className="pointer-events-none absolute left-[-2px] top-1/2 z-20 -translate-y-1/2 sm:left-[-46px]">
            <span className="inline-flex items-center justify-center rounded-[10px] bg-[#3c4cff] px-4 py-2 font-montserrat text-[16px] font-semibold text-white sm:text-[24px]">
              {beforeText}
            </span>
          </div>

          <div className="pointer-events-none absolute right-[-2px] top-1/2 z-20 -translate-y-1/2 sm:right-[-46px]">
            <span className="inline-flex items-center justify-center rounded-[10px] bg-[#3c4cff] px-4 py-2 font-montserrat text-[16px] font-semibold text-white sm:text-[24px]">
              {afterText}
            </span>
          </div>

          <div
            ref={sliderRef}
            data-interacting={isInteracting ? "true" : "false"}
            className="uiux-impact-slider aspect-[1138/700] w-full overflow-hidden bg-white"
          />
        </div>
      </div>
    </section>
  );
};

export default UIUXImpactSlider;
