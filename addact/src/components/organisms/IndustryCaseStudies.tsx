"use client";

import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import Link from "next/link";
import Image from "next/image";
import { RightArrowUpIcon } from "../atom/icons";

type ImageType = {
  url?: string | null;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
};

type CaseItem = {
  Slug?: string | null;
  HeroBanner?: Array<{
    BannerTitle?: string | null;
    PublishDate?: string | null;
    BannerImage?: ImageType | null;
  }>;
};

type Props = {
  title?: string | null;
  items?: CaseItem[];
  limit?: number;
};

const formatDate = (iso?: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};

const IndustryCaseStudies: React.FC<Props> = ({
  title,
  items = [],
  limit = 8,
}) => {
  // ❌ was: early return here — this caused hooks to be “conditional”
  // if (!items || items.length === 0) return null;

  const sortedLimited = useMemo(() => {
    const sorted = [...(items ?? [])].sort((a, b) => {
      const da = a?.HeroBanner?.[0]?.PublishDate || "";
      const db = b?.HeroBanner?.[0]?.PublishDate || "";
      return (new Date(db).getTime() || 0) - (new Date(da).getTime() || 0);
    });
    return sorted.slice(0, limit);
  }, [items, limit]);

  // ===================== DESKTOP (lg+) slider state/logic =====================
  const sliderRef = useRef<Slider | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const seeMoreIndex = sortedLimited.length;
  const secondLast = Math.max(seeMoreIndex - 1, 0);

  const startXRef = useRef<number | null>(null);
  const draggingRef = useRef(false);

  const onTouchStartCapture = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      startXRef.current = e.touches[0].clientX;
      draggingRef.current = true;
    },
    []
  );

  const onTouchMoveCapture = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!draggingRef.current || startXRef.current == null) return;
      const dx = e.touches[0].clientX - startXRef.current; // +ve = right, -ve = left
      if (currentIndex === secondLast && dx < -10) {
        e.preventDefault();
        e.stopPropagation();
        sliderRef.current?.slickGoTo(secondLast, true);
      }
    },
    [currentIndex, secondLast]
  );

  const onTouchEndCapture = useCallback(() => {
    draggingRef.current = false;
    startXRef.current = null;
  }, []);

  const onMouseDownCapture = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      startXRef.current = e.clientX;
      draggingRef.current = true;
    },
    []
  );

  const onMouseMoveCapture = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!draggingRef.current || startXRef.current == null) return;
      const dx = e.clientX - startXRef.current;
      if (currentIndex === secondLast && dx < -5) {
        e.preventDefault();
        e.stopPropagation();
        sliderRef.current?.slickGoTo(secondLast, true);
      }
    },
    [currentIndex, secondLast]
  );

  const onMouseUpCapture = useCallback(() => {
    draggingRef.current = false;
    startXRef.current = null;
  }, []);

  // Align slider content’s left edge with container’s content start
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [padLeft, setPadLeft] = useState<number>(0);

  useEffect(() => {
    const compute = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cs = window.getComputedStyle(el);
      const pl = parseFloat(cs.paddingLeft || "0");
      const contentStart = Math.max(0, Math.round(rect.left + pl));
      setPadLeft(contentStart);
    };
    compute();
    window.addEventListener("resize", compute);
    const t = setTimeout(compute, 100);
    return () => {
      window.removeEventListener("resize", compute);
      clearTimeout(t);
    };
  }, []);

  const settings: Settings = useMemo(
    () => ({
      dots: true,
      arrows: false,
      infinite: false,
      speed: 500,
      cssEase: "ease",
      edgeFriction: 0,
      slidesToShow: 1.5,
      centerMode: true,
      centerPadding: "0",
      slidesToScroll: 1,
      beforeChange: (current: number, next: number) => {
        if (next >= seeMoreIndex) sliderRef.current?.slickGoTo(current, true);
      },
      afterChange: (current: number) => {
        setCurrentIndex(current);
        if (current >= seeMoreIndex) {
          sliderRef.current?.slickGoTo(secondLast, true);
          setCurrentIndex(secondLast);
        }
      },
      appendDots: (dots: React.ReactNode) => (
        <ul style={{ marginTop: "24px" }}>{dots}</ul>
      ),
      responsive: [
        {
          breakpoint: 1024,
          settings: { centerMode: true, centerPadding: "0", slidesToScroll: 1 },
        },
        {
          breakpoint: 640,
          settings: {
            centerMode: false,
            centerPadding: "0",
            slidesToScroll: 1,
          },
        },
      ],
    }),
    [seeMoreIndex, secondLast]
  );

  // Reusable card
  const Card: React.FC<{ item: CaseItem }> = ({ item }) => {
    const hero = item?.HeroBanner?.[0];
    const img = hero?.BannerImage;
    const dateText = formatDate(hero?.PublishDate);
    const theTitle = hero?.BannerTitle || "";
    const slug = item?.Slug || "";
    const href = `/portfolio${slug?.startsWith("/") ? slug : `/${slug}`}`;

    return (
      <article className="group border border-[#ffffff33] overflow-hidden relative h-full lg:flex min-h-[100%] lg:min-h-[300px]">
        <div className="lg:flex p-[10px] pb-[20px] lg:p-[30px] gap-[30px] items-center w-full">
          {img?.url ? (
            <div className="relative w-[100%] min-h-[171px] h-[100%] lg:w-[320px] lg:min-w-[320px] lg:h-[244px] 2xl:w-[320px] 2xl:min-w-[320px] self-center">
              <Image
                src={img.url}
                alt={img.alternativeText ?? theTitle}
                fill
                className="object-cover object-center"
              />
            </div>
          ) : (
            <div className="relative w-[100%] min-h-[171px] h-[100%] lg:w-[270px] lg:min-w-[270px] lg:h-[200px] 2xl:w-[320px] 2xl:min-w-[320px] 2xl:h-[244px] bg-[#222] self-center" />
          )}

          <div>
            <div className="text-[12px] md:text-[14px] leading-[24px] px-5 py-1 lg:py-[6px] lg:px-[20px] rounded-md bg-[#3F3F40] text-white border-1 border-[#3C4CFF] lg:mb-[20px] mb-[12px] w-fit mt-[15px] lg:mt-0">
              Case study
            </div>

            <h3
              className="text-white !text-[18px] md:!text-[22px] 2xl:!text-[30px] !leading-[30px] lg:!leading-[38px] 2xl:!leading-[48px] mb-[16px] font-[500] line-clamp-2"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {theTitle}
            </h3>

            {dateText && (
              <div className="text-white text-[12px] md:text-[16px] leading-[18px]">
                {dateText}
              </div>
            )}
          </div>
        </div>

        <Link
          href={href}
          className="absolute bottom-0 right-0 w-[40px] h-[40px] lg:w-14 lg:h-14 bg-[#3C4CFF] text-white flex items-center justify-center"
        >
          <RightArrowUpIcon />
        </Link>
      </article>
    );
  };

  const hasItems = sortedLimited.length > 0;

  return (
    <section className="my-[80px] lg:my-[100px] 2xl:my-[200px] item-slider-wrapper">
      <div className="overflow-hidden lg:pb-[55px]">
        <div className="max-w-[1920px] m-auto">
          <div className="container" ref={containerRef}>
            <h2 className="border-after !text-[28px] lg:!text-[38px] 2xl:!text-[60px] !pb-4 xl:!pb-10 max-w-[60%] 2xl:max-w-[50%] mb-[55px] lg:mb-14 2xl:mb-24">
              {title ?? "Project Highlights"}
            </h2>
          </div>

          {/* =================== MOBILE/TABLET (< lg): GRID (no slider) =================== */}
          <div className="container lg:hidden">
            {hasItems ? (
              <>
                <div className="grid grid-cols-1 min-[576px]:grid-cols-2 gap-4">
                  {sortedLimited.map((cs, idx) => (
                    <div key={(cs?.Slug ?? idx) + "-grid"} className="h-full">
                      <Card item={cs} />
                    </div>
                  ))}
                </div>

                {/* See More button */}
                <div className="mt-[40px] flex justify-center">
                  <Link
                    href="/portfolio"
                    className="px-6 py-3 text-white bg-[#3C4CFF] transition-colors"
                  >
                    See More
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-white/60">No case studies yet.</div>
            )}
          </div>

          {/* =================== DESKTOP (lg+): SLIDER =================== */}
          {hasItems && (
            <div
              className="hidden lg:block relative left-1/2 right-1/2 w-screen -translate-x-1/2"
              onTouchStartCapture={onTouchStartCapture}
              onTouchMoveCapture={onTouchMoveCapture}
              onTouchEndCapture={onTouchEndCapture}
              onMouseDownCapture={onMouseDownCapture}
              onMouseMoveCapture={onMouseMoveCapture}
              onMouseUpCapture={onMouseUpCapture}
              onMouseLeave={onMouseUpCapture}
            >
              <div style={{ paddingLeft: padLeft }}>
                <Slider ref={sliderRef} {...settings}>
                  {sortedLimited.map((cs, idx) => (
                    <div
                      key={`${cs?.Slug || idx}`}
                      className="px-[12px] h-full"
                    >
                      <Card item={cs} />
                    </div>
                  ))}

                  {/* See More tile — still rendered, but never reachable as current */}
                  <div className="px-[12px] h-full">
                    <div className="h-full">
                      <Link
                        href="/portfolio"
                        className="h-full w-full max-w-[382px] hover:bg-[#3C4CFF] transition-colors text-white text-[22px] md:text-[28px] 2xl:text-[30px] font-[500] flex items-center justify-center mdmin-h-[260px] md:min-h-[300px] 2xl:min-h-[300px]"
                        style={{ border: "1px solid rgb(255 255 255 / 20%)" }}
                      >
                        See More
                      </Link>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          )}

          <style jsx global>{`
            .slick-dots li button:before {
              color: #ffffff !important;
              opacity: 0.35 !important;
            }
            .slick-dots li.slick-active button:before {
              opacity: 1 !important;
            }
            /* Hide the dot for the last slide (See More) */
            .item-slider-wrapper .slick-dots li:last-child {
              display: none !important;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default IndustryCaseStudies;
