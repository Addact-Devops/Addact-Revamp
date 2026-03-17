"use client";

import { useEffect, useRef } from "react";
import SlickImageCompare from "slick-image-compare";

const UIUXImpactSlider = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    const instance = new (SlickImageCompare as unknown as new (
      target: Element | string,
      options?: Record<string, unknown>,
    ) => { destroy?: () => void })(sliderRef.current, {
      beforeImage: "/figma/before.png",
      afterImage: "/figma/after.png",
      startPos: 50,
      smooth: true,
      smoothAmount: 220,
      animateOnClick: true,
      handleMinDistance: 40,
    });

    return () => {
      if (instance && typeof instance.destroy === "function") {
        instance.destroy();
      }
    };
  }, []);

  return (
    <section className="bg-white px-4 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
      <div className="mx-auto w-full max-w-[1604px]">
        <h2 className="text-center font-montserrat text-[34px] font-semibold! leading-tight text-[#0f0f0f] sm:text-[42px] lg:text-[56px]!">
          See The Impact Of Better UX
        </h2>

        <div className="relative mx-auto mt-10 w-full max-w-[1138px] lg:mt-14">
          <div className="pointer-events-none absolute left-[-2px] top-1/2 z-20 -translate-y-1/2 sm:left-[-46px]">
            <span className="inline-flex items-center justify-center rounded-[10px] bg-[#3c4cff] px-4 py-2 font-montserrat text-[16px] font-semibold text-white sm:text-[24px]">
              Before UX
            </span>
          </div>

          <div className="pointer-events-none absolute right-[-2px] top-1/2 z-20 -translate-y-1/2 sm:right-[-46px]">
            <span className="inline-flex items-center justify-center rounded-[10px] bg-[#3c4cff] px-4 py-2 font-montserrat text-[16px] font-semibold text-white sm:text-[24px]">
              After UX
            </span>
          </div>

          <div
            ref={sliderRef}
            className="uiux-impact-slider aspect-[1138/700] w-full overflow-hidden bg-white"
          />
        </div>
      </div>
    </section>
  );
};

export default UIUXImpactSlider;
