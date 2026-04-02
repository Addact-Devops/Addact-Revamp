"use client";

import { useRef, useCallback, useEffect } from "react";
import Image from "../atom/image";
import Link from "next/link";
import RichText from "../atom/richText";
import gsap from "gsap";
import { useCursor } from "@/lib/useCursor";

type IndustryData = {
  industryListTitle?: string | null;
  industry_list?: Array<{
    Slug?: string | null;
    listingContext?: {
      title?: string | null;
      description?: string | null;
      image?: { url?: string | null } | null;
      link?: { href?: string | null } | null;
    } | null;
  }> | null;
};

type IndustryCard = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
};

type IndustryMarqueeCardsProps = {
  data?: IndustryData | null;
  title?: string;
  cards?: IndustryCard[];
};

const defaultCards: IndustryCard[] = [
  {
    id: 1,
    title: "Healthcare",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    slug: "/industries/healthcare",
  },
  {
    id: 2,
    title: "Education & E-Learning",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution.",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    slug: "/industries/education",
  },
  {
    id: 3,
    title: "Automobile",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution.",
    imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",
    slug: "/industries/automobile",
  },
  {
    id: 4,
    title: "Real Estate",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution.",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    slug: "/industries/real-estate",
  },
];

const ArrowIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="arrow-icon w-full h-full"
  >
    <g transform="rotate(-45 20 20)">
      <path
        d="M12 20H28M28 20L21 13M28 20L21 27"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-300"
      />
    </g>
  </svg>
);

const GAP = 20;
const SETS = 3;
const DRAG_THRESHOLD = 8;

export default function IndustryMarqueeCards({
  data,
  title = "Solving Complex Industry Challenges",
  cards = defaultCards,
}: IndustryMarqueeCardsProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const dragCursor = useCursor("drag");

  const isDragging = useRef(false);
  const wasDrag = useRef(false);
  const pointerStartX = useRef(0);
  const trackXAtDragStart = useRef(0);
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const velocityX = useRef(0);

  const dynamicCards: IndustryCard[] =
    data?.industry_list
      ?.map((item, index) => ({
        id: index + 1,
        title: item?.listingContext?.title || "",
        description: item?.listingContext?.description || "",
        imageUrl: item?.listingContext?.image?.url || "",
        slug: item?.listingContext?.link?.href || "#",
      }))
      .filter((item) => item.title || item.description || item.imageUrl) ?? [];

  const displayTitle = data?.industryListTitle || title;
  const displayCards = dynamicCards.length ? dynamicCards : cards;

  const renderedCards = Array.from({ length: SETS }, (_, s) =>
    displayCards.map((card) => ({ ...card, _key: `${s}-${card.id}` })),
  ).flat();

  const getCardWidth = useCallback((): number => {
    const card = trackRef.current?.querySelector<HTMLElement>(".industry-card-item");
    return card ? card.offsetWidth : 300;
  }, []);

  const getSetWidth = useCallback((): number => {
    return displayCards.length * (getCardWidth() + GAP);
  }, [getCardWidth, displayCards.length]);

  const normalise = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const setWidth = getSetWidth();
    let x = gsap.getProperty(track, "x") as number;
    x = ((x % setWidth) - setWidth) % setWidth;
    if (x > -setWidth) x -= setWidth;
    gsap.set(track, { x });
  }, [getSetWidth]);

  const snapAndSlide = useCallback(
    (rawX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const step = getCardWidth() + GAP;
      const snapped = Math.round(rawX / step) * step;
      tweenRef.current?.kill();
      tweenRef.current = gsap.to(track, {
        x: snapped,
        duration: 0.5,
        ease: "power3.out",
        onComplete: normalise,
      });
    },
    [getCardWidth, normalise],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const raf = requestAnimationFrame(() => {
      gsap.set(track, { x: -getSetWidth() });
    });
    return () => cancelAnimationFrame(raf);
  }, [getSetWidth]);

  useEffect(() => {
    const handleResize = () => normalise();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [normalise]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    tweenRef.current?.kill();
    isDragging.current = true;
    wasDrag.current = false;
    pointerStartX.current = e.clientX;
    lastPointerX.current = e.clientX;
    lastPointerTime.current = performance.now();
    velocityX.current = 0;
    trackXAtDragStart.current = gsap.getProperty(trackRef.current, "x") as number;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const dx = e.clientX - pointerStartX.current;
    if (!wasDrag.current && Math.abs(dx) > DRAG_THRESHOLD) {
      wasDrag.current = true;
    }
    if (!wasDrag.current) return;

    const now = performance.now();
    const dt = now - lastPointerTime.current;
    if (dt > 0) velocityX.current = (e.clientX - lastPointerX.current) / dt;
    lastPointerX.current = e.clientX;
    lastPointerTime.current = now;

    gsap.set(trackRef.current, { x: trackXAtDragStart.current + dx });
  }, []);

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (!wasDrag.current) return;

    const rawX = gsap.getProperty(trackRef.current, "x") as number;
    const momentum = velocityX.current * 300;
    snapAndSlide(rawX + momentum);

    // Keep drag flag only for the current gesture's click event.
    setTimeout(() => {
      wasDrag.current = false;
    }, 0);
  }, [snapAndSlide]);
  return (
    <>
      <section className="relative w-full bg-[#0f0f0f] py-12.5 md:py-20 overflow-hidden">
        <div className="container-main">
          <h2 className="text-[32px] md:text-[44px] lg:text-[60px] font-semibold! leading-[1.4] text-white mb-12.5 md:mb-20 max-w-169.25">
            {displayTitle}
          </h2>
        </div>

        {/* No onPointerLeave — setPointerCapture handles out-of-bounds dragging */}
        <div
          ref={wrapperRef}
          className="industry-slider-wrapper w-full overflow-hidden py-5"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{ cursor: "grab" }}
          onMouseEnter={dragCursor.onMouseEnter}
          onMouseLeave={dragCursor.onMouseLeave}
        >
          <div
            ref={trackRef}
            className="industry-slider-track flex w-fit gap-5 pl-4 md:pl-8"
            style={{ willChange: "transform", touchAction: "pan-y", userSelect: "none" }}
          >
            {renderedCards.map((card) => (
              <Link
                key={card._key}
                href={card.slug}
                className="no-underline"
                draggable={false}
                onClick={(e) => {
                  if (wasDrag.current) {
                    e.preventDefault();
                    return;
                  }
                }}
              >
                <div className="industry-card-item group relative overflow-hidden rounded-[10px] border border-white/20 bg-neutral-700/30 backdrop-blur-[30px] transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] shrink-0 select-none w-[78vw] max-w-[300px] aspect-[517/619] md:w-[330px] md:max-w-none">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={card.imageUrl}
                      alt={card.title}
                      width={517}
                      height={619}
                      className="w-full h-full object-cover pointer-events-none select-none"
                      draggable={false}
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[60%] pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                      }}
                    />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-[170px] md:h-[200px] lg:h-[215px]! xl:h-[240px]! max-md:h-[200px] backdrop-blur-[30px] bg-[rgba(69,69,69,0.3)] border-t border-white/20 rounded-b-[10px] p-5 md:p-5.5 max-md:p-4.5 flex flex-col justify-start">
                    <div className="w-full h-full flex flex-col gap-4 max-md:gap-3">
                      <div className="flex items-center gap-3 shrink-0">
                        <p className="text-white text-[20px] md:text-[22px] lg:text-[20px]! xl:text-[26px]! font-semibold font-['Montserrat'] leading-[1.2] md:leading-[1.3] m-0 whitespace-nowrap transition-colors duration-300">
                          {card.title}
                        </p>
                        <div className="w-8 h-8 md:w-9 md:h-9 max-md:w-7 max-md:h-7 shrink-0">
                          <ArrowIcon />
                        </div>
                      </div>

                      <div className="font-['Montserrat'] font-normal [&_p]:text-[14px] md:[&_p]:text-[15px] lg:[&_p]:text-[15px]! xl:[&_p]:text-[20px]! leading-5 md:[&_p]:leading-6 lg:[&_p]:leading-6! 2xl:[&_p]:leading-8! tracking-normal text-white m-0 md:line-clamp-none">
                        {card.description ? <RichText html={card.description} /> : null}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .industry-slider-wrapper:active {
          cursor: grabbing;
        }

        @media (min-width: 1024px) and (max-width: 1279px) {
          .industry-card-item {
            width: calc((100vw - 80px) / 2.8) !important;
            max-width: none !important;
          }
        }

        @media (min-width: 1280px) {
          .industry-card-item {
            width: calc((100vw - 60px) / 3.5) !important;
            max-width: none !important;
          }
        }

        .group:hover .arrow-icon path {
          stroke: #5865f2;
        }
      `}</style>
    </>
  );
}
