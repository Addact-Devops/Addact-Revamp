"use client";

import { useRef, useState, MouseEvent, TouchEvent } from "react";
import Image from "../atom/image";
import Link from "next/link";

type IndustryCard = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
};

type IndustryMarqueeCardsProps = {
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
  title = "Solving Complex Industry Challenges",
  cards = defaultCards,
}: IndustryMarqueeCardsProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragStartTime, setDragStartTime] = useState(0);

  const duplicatedCards = [...cards, ...cards];

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
    const dragDuration = Date.now() - dragStartTime;
    if (dragDuration < 200) {
      setIsDragging(false);
      setIsPaused(false);
      return;
    }

    setTimeout(() => {
      setIsDragging(false);
      setIsPaused(false);
    }, 100);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStartTime(Date.now());
    setStartX(e.touches[0].pageX - (marqueeRef.current?.offsetLeft || 0));
    setScrollLeft(marqueeRef.current?.scrollLeft || 0);
    setIsPaused(true);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !marqueeRef.current) return;
    const x = e.touches[0].pageX - (marqueeRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    marqueeRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    const dragDuration = Date.now() - dragStartTime;
    if (dragDuration < 200) {
      setIsDragging(false);
      setIsPaused(false);
      return;
    }

    setTimeout(() => {
      setIsDragging(false);
      setIsPaused(false);
    }, 100);
  };

  const handleCardClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const dragDuration = Date.now() - dragStartTime;
    if (isDragging || dragDuration > 200) {
      e.preventDefault();
    }
  };

  return (
    <>
      <section className="relative w-full bg-[#0f0f0f] py-12.5 md:py-40 overflow-hidden">
        <div className="container-main">
          <h2 className="text-[32px] md:text-[44px] lg:text-[60px] font-semibold! leading-[1.4] text-white mb-12.5 md:mb-20 max-w-169.25">
            {title}
          </h2>
        </div>

        <div
          className="overflow-hidden relative w-full py-5 select-none active:cursor-grabbing"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => {
            handleMouseUp();
            handleMouseLeave();
          }}
          ref={marqueeRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex gap-5 w-fit ${isPaused ? "paused" : "animate-marquee"}`}
            style={{
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            {duplicatedCards &&
              duplicatedCards?.length > 0 &&
              duplicatedCards?.map((card, index) => (
                <div
                  key={`${card.id}-${index}`}
                  className="group relative w-80 h-105 md:w-120 md:h-110 xl:w-129.25! xl:h-154.75! rounded-[10px] overflow-hidden shrink-0 border border-white/20 transition-all duration-300 cursor-pointer select-none hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-neutral-700/30 rounded-bl-[10px] rounded-br-[10px] backdrop-blur-[30px]"
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

                  <div className="absolute bottom-0 left-0 right-0 h-[180px] md:h-[220px] lg:h-[271px]! h-67.75 md:h-55 max-md:h-45 backdrop-blur-[30px] bg-[rgba(69,69,69,0.3)] border-t border-white/20 rounded-b-[10px] p-7.5 md:p-6.25 max-md:p-5 flex flex-col justify-start">
                    <div className="w-full h-full flex flex-col gap-5 max-md:gap-3.75">
                      <div className="flex items-center gap-4 shrink-0">
                        <Link
                          href={card.slug}
                          onClick={handleCardClick}
                          className="no-underline"
                        >
                          <p className="text-white text-xl! md:text-2xl lg:text-3xl! font-semibold font-['Montserrat'] leading-tight md:leading-snug lg:leading-[18.5px] m-0 whitespace-nowrap transition-colors duration-300">
                            {card.title}
                          </p>
                        </Link>
                        <div className="w-10 h-10 max-md:w-8 max-md:h-8 shrink-0">
                          <ArrowIcon />
                        </div>
                      </div>

                      <p className="font-['Montserrat'] font-normal text-base md:text-xl lg:text-2xl! leading-7 md:leading-9 lg:leading-11! tracking-normal text-white m-0  md:line-clamp-none">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee-scroll 40s linear infinite;
          will-change: transform;
        }

        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: 30s;
          }
        }

        .paused {
          animation-play-state: paused !important;
        }

        .group:hover .arrow-icon path {
          stroke: #5865f2;
        }
      `}</style>
    </>
  );
}
