"use client";

import { useRef, useState, MouseEvent, useEffect, TouchEvent } from "react";
import Image from "../atom/image";
import Link from "next/link";
import RichText from "../atom/richText";

type IndustryData = {
  industryListTitle?: string | null;
  industry_list?: Array<{
    Slug?: string | null;
    listingContext?: {
      title?: string | null;
      description?: string | null;
      image?: {
        url?: string | null;
      } | null;
      link?: {
        href?: string | null;
      } | null;
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

// Default data if none provided
const defaultCards: IndustryCard[] = [
  {
    id: 1,
    title: "Healthcare",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution.",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    slug: "/industries/healthcare",
  },
  {
    id: 2,
    title: "Education & E-Learning",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution.",
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    slug: "/industries/education",
  },
  {
    id: 3,
    title: "Automobile",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution.",
    imageUrl:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",
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

export default function IndustryMarqueeCards({
  data,
  title = "Solving Complex Industry Challenges",
  cards = defaultCards,
}: IndustryMarqueeCardsProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragStartTime, setDragStartTime] = useState<number | null>(null);

  // --- ADDED: touch state refs for mobile slider ---
  const touchStartXRef = useRef(0);
  const touchScrollLeftRef = useRef(0);
  const touchVelocityRef = useRef(0);
  const lastTouchXRef = useRef(0);
  const momentumAnimRef = useRef<number | null>(null);
  const isMobileRef = useRef(false);

  const SCROLL_SPEED = 0.8; // pixels per frame, adjust for desired speed

  // Handle continuous marquee animation
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const animate = () => {
      if (!isPaused && !isDragging) {
        marquee.scrollLeft += SCROLL_SPEED;
        // Reset scroll position for infinite loop when reaching halfway point
        if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
          marquee.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, isDragging]);

  // --- ADDED: detect mobile on mount ---
  useEffect(() => {
    isMobileRef.current = window.matchMedia("(max-width: 1023px)").matches;
    const handler = (e: MediaQueryListEvent) => {
      isMobileRef.current = e.matches;
    };
    const mql = window.matchMedia("(max-width: 1023px)");
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

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
  const duplicatedCards = [...displayCards, ...displayCards];

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setIsPaused(false);
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStartTime(Date.now());
    setStartX(e.pageX - (marqueeRef.current?.offsetLeft || 0));
    setScrollLeft(marqueeRef.current?.scrollLeft || 0);
    setIsPaused(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !marqueeRef.current) return;
    e.preventDefault();
    const x = e.pageX - (marqueeRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    marqueeRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    const dragDuration = dragStartTime ? Date.now() - dragStartTime : 0;
    if (dragDuration < 200) {
      setIsDragging(false);
      setIsPaused(false);
      setDragStartTime(null);
      return;
    }

    setTimeout(() => {
      setIsDragging(false);
      setIsPaused(false);
      setDragStartTime(null);
    }, 100);
  };

  const handleCardClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const dragDuration = dragStartTime ? Date.now() - dragStartTime : 0;
    if (isDragging || dragDuration > 200) {
      e.preventDefault();
    }
  };

  // --- ADDED: touch event handlers for mobile smooth slider ---
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!isMobileRef.current || !marqueeRef.current) return;
    if (momentumAnimRef.current) cancelAnimationFrame(momentumAnimRef.current);
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchScrollLeftRef.current = marqueeRef.current.scrollLeft;
    lastTouchXRef.current = e.touches[0].clientX;
    touchVelocityRef.current = 0;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isMobileRef.current || !marqueeRef.current) return;
    const currentX = e.touches[0].clientX;
    const delta = touchStartXRef.current - currentX;
    marqueeRef.current.scrollLeft = touchScrollLeftRef.current + delta;
    touchVelocityRef.current = lastTouchXRef.current - currentX;
    lastTouchXRef.current = currentX;

    // Infinite loop reset on touch move too
    if (marqueeRef.current.scrollLeft >= marqueeRef.current.scrollWidth / 2) {
      marqueeRef.current.scrollLeft = 0;
      touchScrollLeftRef.current = 0;
      touchStartXRef.current = currentX;
    } else if (marqueeRef.current.scrollLeft <= 0) {
      const half = marqueeRef.current.scrollWidth / 2;
      marqueeRef.current.scrollLeft = half;
      touchScrollLeftRef.current = half;
      touchStartXRef.current = currentX;
    }
  };

  const handleTouchEnd = () => {
    if (!isMobileRef.current || !marqueeRef.current) return;
    const marquee = marqueeRef.current;
    let velocity = touchVelocityRef.current * 1.5; // amplify for natural feel
    const friction = 0.92;

    const runMomentum = () => {
      if (Math.abs(velocity) < 0.3) {
        setIsPaused(false);
        return;
      }
      marquee.scrollLeft += velocity;
      velocity *= friction;

      // Infinite loop reset during momentum
      if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
        marquee.scrollLeft = 0;
      } else if (marquee.scrollLeft <= 0) {
        marquee.scrollLeft = marquee.scrollWidth / 2;
      }

      momentumAnimRef.current = requestAnimationFrame(runMomentum);
    };

    momentumAnimRef.current = requestAnimationFrame(runMomentum);
  };

  return (
    <>
      <section className="relative w-full bg-[#0f0f0f] py-12.5 md:py-20 overflow-hidden">
        <div className="container-main">
          <h2 className="text-[32px] md:text-[44px] lg:text-[60px] font-semibold! leading-[1.4] text-white mb-12.5 md:mb-20 max-w-169.25">
            {displayTitle}
          </h2>
        </div>

        <div
          className="industry-marquee-scroll relative w-full overflow-x-auto overflow-y-visible py-5 select-none lg:overflow-x-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => {
            handleMouseUp();
            handleMouseLeave();
          }}
          ref={marqueeRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          // --- ADDED: touch handlers ---
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="industry-marquee-track flex w-fit gap-5"
            style={{
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            {duplicatedCards &&
              duplicatedCards?.length > 0 &&
              duplicatedCards?.map((card, index) => (
                <div
                  key={`${card.id}-${index}`}
                  className="industry-marquee-card group relative w-[82vw] max-w-[320px] overflow-hidden rounded-[10px] border border-white/20 bg-neutral-700/30 backdrop-blur-[30px] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] shrink-0 cursor-pointer select-none aspect-[517/619] md:w-[360px] md:max-w-none xl:w-[517px]"
                  draggable={false}
                >
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
                          "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)",
                      }}
                    />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-[180px] md:h-[220px] lg:h-[240px]! xl:h-[271px]! max-md:h-[220px] backdrop-blur-[30px] bg-[rgba(69,69,69,0.3)] border-t border-white/20 rounded-b-[10px] p-7.5 md:p-6.25 max-md:p-5 flex flex-col justify-start">
                    <div className="w-full h-full flex flex-col gap-5 max-md:gap-3.75">
                      <div className="flex items-center gap-4 shrink-0">
                        <Link
                          href={card.slug}
                          onClick={handleCardClick}
                          className="no-underline"
                        >
                          <p className="text-white text-xl! md:text-2xl lg:text-xl!  xl:text-3xl! font-semibold font-['Montserrat'] leading-tight md:leading-snug lg:leading-[18.5px] m-0 whitespace-nowrap transition-colors duration-300">
                            {card.title}
                          </p>
                        </Link>
                        <div className="w-10 h-10 max-md:w-8 max-md:h-8 shrink-0">
                          <ArrowIcon />
                        </div>
                      </div>

                      <div className="font-['Montserrat'] font-normal text-base lg:text-base! xl:text-2xl! leading-5 md:leading-7 lg:leading-8 xl:leading-11 tracking-normal text-white m-0 md:line-clamp-none">
                        {card.description ? (
                          <RichText html={card.description} />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .industry-marquee-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-y;
        }

        .industry-marquee-scroll::-webkit-scrollbar {
          display: none;
        }

        /* ADDED: enable horizontal touch scrolling on mobile */
        @media (max-width: 1023px) {
          .industry-marquee-scroll {
            touch-action: pan-x;
            -webkit-overflow-scrolling: touch;
          }
        }

        @media (min-width: 1400px) and (max-width: 1699px) {
          .industry-marquee-card {
            width: calc((100vw - 60px) / 3.5);
            max-width: none;
          }
        }

        .group:hover .arrow-icon path {
          stroke: #5865f2;
        }
      `}</style>
    </>
  );
}
