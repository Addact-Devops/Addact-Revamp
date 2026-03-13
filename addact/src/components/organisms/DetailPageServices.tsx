"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RichText from "../atom/richText";
import Link from "next/link";
import Image from "next/image";

interface DetailPageServiceImage {
  url: string;
  alt: string;
}

interface DetailPageServiceLink {
  href: string;
  target?: "_self" | "_blank";
}

export interface DetailPageServiceItem {
  id: string;
  title: string;
  description: string;
  image: DetailPageServiceImage;
  link: DetailPageServiceLink;
}

interface DetailPageServicesProps {
  title?: string;
  items?: DetailPageServiceItem[];
  isCaraousl?: boolean;
}

const staticServiceItems: DetailPageServiceItem[] = [
  {
    id: "1",
    title: "Low Code/No code Web Development",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution.",
    image: {
      url: "https://dummyimage.com/84x84/050505/ffffff&text=%3C%2F%3E",
      alt: "Low code service icon",
    },
    link: {
      href: "/sitecore-cms-development",
      target: "_self",
    },
  },
  {
    id: "2",
    title: "Custom CMS Implementation",
    description:
      "Build scalable digital platforms with structured content, streamlined workflows, and future-ready architecture.",
    image: {
      url: "https://dummyimage.com/84x84/050505/ffffff&text=CMS",
      alt: "CMS implementation icon",
    },
    link: {
      href: "/contentful-cms-development",
      target: "_self",
    },
  },
  {
    id: "3",
    title: "Headless Commerce Solutions",
    description:
      "Create fast, flexible commerce experiences with API-driven storefronts and tailored integrations.",
    image: {
      url: "https://dummyimage.com/84x84/050505/ffffff&text=API",
      alt: "Headless commerce icon",
    },
    link: {
      href: "/strapi-cms-development",
      target: "_self",
    },
  },
  {
    id: "4",
    title: "Experience Design and UI Systems",
    description:
      "Design consistent interfaces with reusable UI systems that improve delivery speed and user experience.",
    image: {
      url: "https://dummyimage.com/84x84/050505/ffffff&text=UI",
      alt: "Experience design icon",
    },
    link: {
      href: "/umbraco-cms-development",
      target: "_self",
    },
  },
  {
    id: "5",
    title: "Migration and Modernization",
    description:
      "Move legacy platforms to modern CMS stacks without losing content integrity, SEO value, or performance.",
    image: {
      url: "https://dummyimage.com/84x84/050505/ffffff&text=MIG",
      alt: "Migration icon",
    },
    link: {
      href: "/kentico-cms-development",
      target: "_self",
    },
  },
  {
    id: "6",
    title: "Performance Optimization",
    description:
      "Improve Core Web Vitals, delivery speed, and frontend efficiency across content-heavy digital products.",
    image: {
      url: "https://dummyimage.com/84x84/050505/ffffff&text=SPD",
      alt: "Performance icon",
    },
    link: {
      href: "/contentstack-cms-development",
      target: "_self",
    },
  },
  {
    id: "7",
    title: "Platform Support and Enhancements",
    description:
      "Keep business-critical websites stable with proactive maintenance, updates, and ongoing feature delivery.",
    image: {
      url: "https://dummyimage.com/84x84/050505/ffffff&text=SUP",
      alt: "Support icon",
    },
    link: {
      href: "/about-us",
      target: "_self",
    },
  },
  {
    id: "8",
    title: "Search and Personalization",
    description:
      "Drive better content discovery and tailored journeys with search, segmentation, and personalization layers.",
    image: {
      url: "https://dummyimage.com/84x84/050505/ffffff&text=SRCH",
      alt: "Search icon",
    },
    link: {
      href: "/industries",
      target: "_self",
    },
  },
  {
    id: "9",
    title: "Analytics and Growth Tracking",
    description:
      "Connect CMS initiatives to measurable outcomes with implementation-ready analytics and reporting support.",
    image: {
      url: "https://dummyimage.com/84x84/050505/ffffff&text=ANL",
      alt: "Analytics icon",
    },
    link: {
      href: "/contact-us",
      target: "_self",
    },
  },
];

const DetailPageServices = ({
  title = "Our Services",
  items,
  isCaraousl = false,
}: DetailPageServicesProps) => {
  const resolvedItems = items?.length ? items : staticServiceItems;
  const visibleItems = isCaraousl ? resolvedItems : resolvedItems.slice(0, 8);
  const shouldEnableCarousel = isCaraousl && visibleItems.length > 4;

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(shouldEnableCarousel);

  useEffect(() => {
    if (!shouldEnableCarousel) {
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }

    const container = scrollContainerRef.current;

    if (!container) {
      return;
    }

    const syncScrollState = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      setCanScrollPrev(container.scrollLeft > 8);
      setCanScrollNext(container.scrollLeft < maxScrollLeft - 8);
    };

    syncScrollState();
    container.addEventListener("scroll", syncScrollState, { passive: true });
    window.addEventListener("resize", syncScrollState);

    return () => {
      container.removeEventListener("scroll", syncScrollState);
      window.removeEventListener("resize", syncScrollState);
    };
  }, [shouldEnableCarousel, visibleItems.length]);

  const handleScroll = (direction: "prev" | "next") => {
    const container = scrollContainerRef.current;

    if (!container) {
      return;
    }

    const firstCard = container.querySelector<HTMLElement>(
      "[data-service-card='true']",
    );
    const gap = Number.parseFloat(
      window.getComputedStyle(container).columnGap || "0",
    );
    const cardsPerScroll =
      window.innerWidth >= 1280 ? 4 : window.innerWidth >= 768 ? 2 : 1;
    const cardWidth = firstCard?.offsetWidth ?? container.clientWidth;
    const scrollAmount = (cardWidth + gap) * cardsPerScroll;

    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const renderCard = (
    item: DetailPageServiceItem,
    index: number,
    isCarouselCard: boolean,
  ) => {
    return (
      <Link
        key={item.id}
        href={item.link.href}
        target={item.link.target ?? "_self"}
        rel={item.link.target === "_blank" ? "noopener noreferrer" : undefined}
        data-service-card="true"
        className={[
          "group relative w-full max-w-[375px] cursor-pointer overflow-hidden rounded-[14px] border border-[#101011] bg-[#050505] focus:outline-none",
          "md:transition-[border-color,box-shadow] md:duration-300 md:hover:border-[#3C4CFF] md:hover:shadow-[0_20px_45px_rgba(60,76,255,0.14)] md:focus-visible:border-[#3C4CFF] md:focus-visible:shadow-[0_20px_45px_rgba(60,76,255,0.14)]",
          isCarouselCard
            ? "flex-none snap-start basis-[84%] sm:basis-[calc(50%_-_8px)] lg:basis-[calc(25%_-_18px)]"
            : "w-full",
        ].join(" ")}
      >
        <div className="relative flex h-full min-h-[300px] flex-col overflow-hidden p-5 pb-[136px] md:min-h-[425px] md:p-6 md:pb-[168px]">
          <div className="absolute bottom-5 right-5 h-[108px] w-[108px] rounded-full bg-[#3C4CFF] md:bottom-6 md:right-6 md:h-[108px] md:w-[108px] md:origin-center md:transition-transform md:duration-500 md:ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:scale-[9] md:group-focus-visible:scale-[9]" />

          <div className="relative z-10 max-w-[80%]">
            <h3 className="min-h-[68px] !text-[24px] !font-semibold !leading-[1.35] text-white md:min-h-[78px] md:!text-[28px]">
              {item.title}
            </h3>
            <div className="mt-4 text-[16px] leading-8 text-white/80 md:text-[17px] md:transition-colors md:duration-300 md:group-hover:text-white md:group-focus-visible:text-white [&_p]:m-0 [&_p]:text-inherit">
              <RichText html={item.description} />
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-4 right-3 z-10 md:bottom-5 md:right-4">
            <Image
              src={item.image.url}
              alt={item.image.alt}
              width={156}
              height={156}
              className="h-[112px] w-[112px] object-contain md:h-[156px] md:w-[156px]"
            />
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section className="bg-white py-[72px] md:py-[88px] xl:py-[110px]">
      <div className="container-main">
        <div className="mb-10 flex items-end justify-between gap-4 md:mb-14">
          <h2 className="!text-[28px] !font-semibold !leading-tight text-[#0F0F0F] md:!text-[40px] xl:!text-[58px]">
            {title}
          </h2>
        </div>

        {shouldEnableCarousel ? (
          <div className="relative">
            <button
              type="button"
              aria-label="Previous services"
              disabled={!canScrollPrev}
              className="absolute left-[-14px] top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#6B76FF] bg-transparent text-[#6B76FF] transition disabled:cursor-not-allowed disabled:opacity-40 lg:flex xl:left-[-70px]"
              onClick={() => handleScroll("prev")}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:gap-5"
            >
              {visibleItems.map((item, index) => renderCard(item, index, true))}
            </div>

            <button
              type="button"
              aria-label="Next services"
              disabled={!canScrollNext}
              className="absolute right-[-14px] top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#6B76FF] bg-transparent text-[#6B76FF] transition disabled:cursor-not-allowed disabled:opacity-40 lg:flex xl:right-[-70px]"
              onClick={() => handleScroll("next")}
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="mt-6 flex items-center justify-center gap-3 lg:hidden">
              <button
                type="button"
                aria-label="Previous services"
                disabled={!canScrollPrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#3C4CFF] text-[#3C4CFF] transition disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => handleScroll("prev")}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next services"
                disabled={!canScrollNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#3C4CFF] text-[#3C4CFF] transition disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => handleScroll("next")}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-4 lg:justify-items-stretch lg:gap-5">
            {visibleItems.map((item, index) => renderCard(item, index, false))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailPageServices;
