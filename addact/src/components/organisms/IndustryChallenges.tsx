"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type ChallengeItem = {
  Number?: string | null;
  Title?: string | null;
  Content?: string | null;
};

type IndustryChallengesData = {
  Title?: string | null;
  NumberTitleContent?: ChallengeItem[] | null;
};

type Props = {
  data?: IndustryChallengesData | null;
};

const pad2 = (val: string | number) => {
  const n = String(val).replace(/\D/g, "");
  const num = n.length ? parseInt(n, 10) : Number(val) || 0;
  return String(num).padStart(2, "0");
};

const SWITCH_OFFSET = 80; // px from top of viewport

const IndustryChallenges: React.FC<Props> = ({ data }) => {
  const items = useMemo(
    () =>
      Array.isArray(data?.NumberTitleContent) ? data!.NumberTitleContent! : [],
    [data]
  );

  // Mobile (<lg) active number
  const [activeIndex, setActiveIndex] = useState(0);
  // Track each section's HEADING (h3), not the whole article
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!items.length) return;

    const computeActive = () => {
      if (window.innerWidth >= 1024) return; // below lg only

      // Find the last heading whose top is <= SWITCH_OFFSET
      let current = 0;
      for (let i = 0; i < headingRefs.current.length; i++) {
        const h = headingRefs.current[i];
        if (!h) continue;
        const top = h.getBoundingClientRect().top;
        if (top <= SWITCH_OFFSET) current = i;
        else break;
      }
      setActiveIndex(current);
    };

    const onScrollResize = () => {
      if (rafId.current != null) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        computeActive();
      });
    };

    // initial
    computeActive();

    window.addEventListener("scroll", onScrollResize, { passive: true });
    window.addEventListener("resize", onScrollResize);
    return () => {
      window.removeEventListener("scroll", onScrollResize);
      window.removeEventListener("resize", onScrollResize);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, [items.length]);

  return (
    <section className="my-[80px] lg:my-[100px] 2xl:my-[200px]">
      <div className="container">
        {/* ===== MOBILE (below lg) ===== */}
        <div className="lg:hidden">
          {/* Full-width title */}
          <div className="mb-[60px] lg:mb-6">
            <h2 className="!text-white !text-[28px] md:!text-[32px] leading-tight">
              {data?.Title ?? "Our Challenges"}
            </h2>
            <div className="w-[120px] h-[4px] bg-[#3C4CFF] mt-4 rounded" />
          </div>

          <div className="flex gap-[30px]">
            {/* Sticky number column */}
            <div className="w-[85px] shrink-0">
              <div className="sticky top-[60px]">
                <div
                  className="pointer-events-none select-none text-[72px] lg:text-[64px] leading-none tracking-tight custom-stroke"
                  style={{
                    fontWeight: 900,
                    WebkitTextStrokeColor: "rgba(255, 255, 255, 0.7)",
                    color: "transparent",
                    fontFamily: "Poppins, sans-serif",
                    opacity: 0.5,
                  }}
                  aria-live="polite"
                >
                  {pad2(items[activeIndex]?.Number ?? activeIndex + 1)}
                </div>
              </div>
            </div>

            {/* List */}
            <div className="flex-1">
              <div className="flex flex-col gap-[40px] lg:gap-[100px]">
                {items.map((item, idx) => {
                  const displayNum = pad2(item?.Number ?? idx + 1);
                  return (
                    <article key={`${displayNum}-${idx}`} className="relative">
                      <h3
                        ref={(el) => {
                          headingRefs.current[idx] = el ?? null; // return void -> TS OK
                        }}
                        className="text-white !font-bold !text-[20px] lg:!text-[26px] mb-[15px]"
                      >
                        {(item?.Title ?? "").trim()}
                      </h3>
                      <div className="text-white text-[12px] md:text-[15px] lg:text-[18px] leading-[23px] md:leading-[24px] lg:leading-[30px]">
                        {(item?.Content ?? "").split("\n").map((line, i) => (
                          <div key={i}>{line.trim()}</div>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ===== DESKTOP (lg+) — unchanged ===== */}
        <div className="hidden lg:flex gap-10 md:gap-[40px] 2xl:gap-[100px] flex-wrap lg:flex-nowrap">
          {/* Left: Sticky title */}
          <div className="w-full lg:w-[40%] 2xl:w-[35%]">
            <div className="lg:sticky lg:top-[120px]">
              <h2 className="!text-white !text-[36px] xl:!text-[38px] 2xl:!text-[60px] leading-tight">
                {data?.Title ?? "Our Challenges"}
              </h2>
              <div className="w-[160px] h-[6px] bg-[#3C4CFF] mt-6 rounded" />
            </div>
          </div>

          {/* Right: big outlined numbers per section */}
          <div className="w-full lg:w-[60%] 2xl:w-[65%]">
            <div className="flex flex-col gap-[100px] 2xl:gap-[120px]">
              {items.map((item, idx) => {
                const displayNum = pad2(item?.Number ?? idx + 1);
                return (
                  <article key={`${displayNum}-${idx}`} className="relative">
                    <div
                      className="pointer-events-none select-none tracking-tight lg:mb-[20px] 2xl:mb-[40px] lg:text-[130px] 2xl:text-[200px]"
                      style={{
                        fontWeight: 900,
                        WebkitTextStrokeWidth: "2px",
                        WebkitTextStrokeColor: "rgba(255, 255, 255, 0.7)",
                        color: "transparent",
                        lineHeight: "0.8",
                        fontFamily: "Poppins, sans-serif",
                        opacity: 0.5,
                      }}
                      aria-hidden="true"
                    >
                      {displayNum}
                    </div>

                    <h3 className="text-white !font-bold !text-[30px] 2xl:!text-[48px] mb-[15px] 2xl:mb-[40px]">
                      {(item?.Title ?? "").trim()}
                    </h3>

                    <div className="text-white text-[22px] lg:text-[24px] 2xl:text-[30px] leading-[40px] 2xl:leading-[54px]">
                      {(item?.Content ?? "").split("\n").map((line, i) => (
                        <div key={i}>{line.trim()}</div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryChallenges;
