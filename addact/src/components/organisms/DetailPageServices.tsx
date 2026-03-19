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

type DetailPageServiceTarget = NonNullable<DetailPageServiceLink["target"]>;

export interface DetailPageServiceItem {
    id: string;
    title: string;
    description: string;
    image: DetailPageServiceImage | null;
    link: DetailPageServiceLink | null;
}

type ServiceVariant = "twoCard" | "threeCard" | "fourCard";

interface DynamicServiceItem {
    listingContext: {
        id?: string | null;
        title: string | null;
        description: string | null;
        image: {
            url: string;
            alternativeText?: string | null;
        } | null;
        link: {
            href: string;
            target?: string | null;
            isExternal?: boolean | null;
        } | null;
    } | null;
}

interface DynamicServiceSection {
    id?: string | null;
    serviceTitle: string | null;
    isCarousel: boolean | null;
    serviceVariant: {
        variant: string;
    } | null;
    serviceList: DynamicServiceItem[];
}

interface DetailPageServicesProps {
    title?: string;
    items?: DetailPageServiceItem[];
    isCaraousl?: boolean;
    data?: DynamicServiceSection[];
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

const normalizeVariant = (variant?: string | null): ServiceVariant => {
    const normalized = (variant ?? "").trim().toLowerCase();

    if (normalized === "twocard" || normalized === "two_card" || normalized === "two-card") {
        return "twoCard";
    }

    if (normalized === "threecard" || normalized === "three_card" || normalized === "three-card") {
        return "threeCard";
    }

    return "fourCard";
};

const getGridColumnsClass = (variant: ServiceVariant) => {
    if (variant === "twoCard") {
        return "grid-cols-1 md:grid-cols-2";
    }

    if (variant === "threeCard") {
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    }

    return "grid-cols-1 sm:grid-cols-2 md:grid-cols-4";
};

const getCarouselCardBasisClass = (variant: ServiceVariant) => {
    if (variant === "twoCard") {
        return "basis-[84%] sm:basis-[calc(50%_-_8px)] lg:basis-[calc(50%_-_12px)]";
    }

    if (variant === "threeCard") {
        return "basis-[84%] sm:basis-[calc(50%_-_8px)] lg:basis-[calc(33.333%_-_14px)]";
    }

    return "basis-[84%] sm:basis-[calc(50%_-_8px)] lg:basis-[calc(25%_-_18px)]";
};

const normalizeLinkTarget = (target?: string | null): DetailPageServiceTarget => {
    return target === "_blank" ? "_blank" : "_self";
};

const mapDynamicItems = (section: DynamicServiceSection): DetailPageServiceItem[] => {
    return section.serviceList
        .map((serviceItem) => serviceItem.listingContext)
        .filter((context): context is NonNullable<DynamicServiceItem["listingContext"]> => Boolean(context))
        .map((context, index): DetailPageServiceItem => {
            return {
                id: context.id ?? `service-${index}`,
                title: context.title ?? "",
                description: context.description ?? "",
                image: context.image
                    ? {
                          url: context.image.url,
                          alt: context.image.alternativeText ?? context.title ?? "Service image",
                      }
                    : null,
                link: context.link
                    ? {
                          href: context.link.href,
                          target: normalizeLinkTarget(context.link.target),
                      }
                    : null,
            };
        })
        .filter((item) => item.title || item.description);
};

const chunkItems = <T,>(source: T[], chunkSize: number): T[][] => {
    if (chunkSize <= 0) {
        return [source];
    }

    const chunks: T[][] = [];

    for (let index = 0; index < source.length; index += chunkSize) {
        chunks.push(source.slice(index, index + chunkSize));
    }

    return chunks;
};

const DetailPageServices = ({ title = "Our Services", items, isCaraousl = false, data }: DetailPageServicesProps) => {
    const sections = data?.length
        ? data.map((section) => ({
              id: section.id ?? null,
              title: section.serviceTitle ?? "Our Services",
              isCarousel: Boolean(section.isCarousel),
              variant: normalizeVariant(section.serviceVariant?.variant),
              items: mapDynamicItems(section),
          }))
        : [
              {
                  id: "static-services",
                  title,
                  isCarousel: isCaraousl,
                  variant: "fourCard" as ServiceVariant,
                  items: items?.length ? items : staticServiceItems,
              },
          ];

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const mobileTwoCardSliderRef = useRef<HTMLDivElement | null>(null);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(true);
    const [activeMobileSlide, setActiveMobileSlide] = useState(0);

    useEffect(() => {
        const container = scrollContainerRef.current;

        if (!container) {
            setCanScrollPrev(false);
            setCanScrollNext(false);
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
    }, [sections]);

    useEffect(() => {
        const mobileSlider = mobileTwoCardSliderRef.current;

        if (!mobileSlider) {
            setActiveMobileSlide(0);
            return;
        }

        const syncActiveSlide = () => {
            const slideWidth = mobileSlider.clientWidth;
            if (!slideWidth) {
                return;
            }

            setActiveMobileSlide(Math.round(mobileSlider.scrollLeft / slideWidth));
        };

        syncActiveSlide();
        mobileSlider.addEventListener("scroll", syncActiveSlide, { passive: true });

        return () => {
            mobileSlider.removeEventListener("scroll", syncActiveSlide);
        };
    }, [sections]);

    const handleScroll = (direction: "prev" | "next") => {
        const container = scrollContainerRef.current;

        if (!container) {
            return;
        }

        const firstCard = container.querySelector<HTMLElement>("[data-service-card='true']");
        const gap = Number.parseFloat(window.getComputedStyle(container).columnGap || "0");
        const cardsPerScroll = window.innerWidth >= 1280 ? 4 : window.innerWidth >= 768 ? 2 : 1;
        const cardWidth = firstCard?.offsetWidth ?? container.clientWidth;
        const scrollAmount = (cardWidth + gap) * cardsPerScroll;

        container.scrollBy({
            left: direction === "next" ? scrollAmount : -scrollAmount,
            behavior: "smooth",
        });
    };

    const renderCard = (item: DetailPageServiceItem, isCarouselCard: boolean, variant: ServiceVariant) => {
        console.log("🚀 ~ renderCard ~ item:", item);
        const cardClassName = [
            "group relative w-full overflow-hidden focus:outline-none",
            isCarouselCard ? `flex-none snap-start ${getCarouselCardBasisClass(variant)}` : "w-full",
        ].join(" ");

        const content =
            variant === "twoCard" ? (
                <div className='relative  border border-[#E5E5E5] bg-white p-[20px] sm:p-8'>
                    <h3 className='!mb-6 !text-[20px] !font-semibold !leading-tight text-[#0F0F0F] md:!text-[30px]'>
                        {item.title}
                    </h3>
                    <div className='text-[16px] leading-7 text-[#0F0F0F] [&_p]:m-0 [&_p]:text-inherit'>
                        <RichText html={item.description} />
                    </div>
                </div>
            ) : (
                <div className='relative flex h-full min-h-[250px] flex-col overflow-hidden rounded-[14px] border border-[#E5E5E5] bg-white p-5 pb-[136px] md:min-h-[250px] md:p-6 md:pb-[168px] md:transition-[border-color,box-shadow] md:duration-300 md:hover:border-[#3C4CFF] md:hover:shadow-[0_20px_45px_rgba(60,76,255,0.14)] md:focus-visible:border-[#3C4CFF] md:focus-visible:shadow-[0_20px_45px_rgba(60,76,255,0.14)]'>
                    <div className='pointer-events-none absolute inset-0 z-0 bg-[#3C4CFF] [clip-path:circle(0%_at_100%_100%)] md:transition-[clip-path] md:duration-500 md:ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:[clip-path:circle(180%_at_100%_100%)] md:group-focus-visible:[clip-path:circle(180%_at_100%_100%)]' />
                    <div className='pointer-events-none absolute bottom-5 right-5 z-10 h-[108px] w-[108px] rounded-full bg-[#3C4CFF] md:bottom-6 md:right-6 md:h-[108px] md:w-[108px]' />

                    <div className='relative z-10 max-w-full'>
                        <h3 className='min-h-[68px] !text-[24px] !font-semibold !leading-[1.35] text-[#0F0F0F] md:min-h-[78px] md:!text-[30px] md:transition-colors md:duration-300 md:group-hover:text-white md:group-focus-visible:text-white'>
                            {item.title}
                        </h3>
                        <div className='mt-4 text-[16px] leading-8 text-[#0F0F0F]/80 [&_p]:md:text-[20px]! md:transition-colors md:duration-300 md:group-hover:text-white md:group-focus-visible:text-white [&_p]:m-0 [&_p]:text-inherit'>
                            <RichText html={item.description} />
                        </div>
                    </div>

                    {item.image?.url ? (
                        <div className='pointer-events-none absolute bottom-4 right-3 z-10 md:bottom-5 md:right-4'>
                            <Image
                                src={item.image.url}
                                alt={item.image.alt}
                                width={80}
                                height={80}
                                className='h-[80px] w-[80px] object-contain md:h-[80px] md:w-[80px]'
                            />
                        </div>
                    ) : null}
                </div>
            );

        if (!item.link?.href) {
            return (
                <div key={item.id} data-service-card='true' className={cardClassName}>
                    {content}
                </div>
            );
        }

        return (
            <Link
                key={item.id}
                href={item.link.href}
                target={item.link.target ?? "_self"}
                rel={item.link.target === "_blank" ? "noopener noreferrer" : undefined}
                data-service-card='true'
                className={cardClassName}
            >
                {content}
            </Link>
        );
    };

    return (
        <>
            {sections
                .filter((section) => section.items.length > 0)
                .map((section, sectionIndex) => {
                    const visibleItems = section.isCarousel ? section.items : section.items.slice(0, 8);
                    const shouldEnableCarousel = section.isCarousel && visibleItems.length > 1;
                    const mobileTwoCardSlides = chunkItems(visibleItems, 2);

                    return (
                        <section
                            key={`${section.id ?? `section-${sectionIndex}`}-${sectionIndex}`}
                            className='bg-[#F5F5F5] py-[72px] md:py-[88px] xl:py-[110px]'
                        >
                            <div className='container-main'>
                                <div className='mb-10 flex items-end justify-between gap-4 md:mb-14'>
                                    <h2 className='!text-[28px] !font-semibold !leading-tight text-[#0F0F0F] md:!text-[40px] xl:!text-[58px]'>
                                        {section.title}
                                    </h2>
                                </div>

                                {shouldEnableCarousel ? (
                                    <div className='relative'>
                                        <button
                                            type='button'
                                            aria-label='Previous services'
                                            disabled={!canScrollPrev}
                                            className='absolute left-[-14px] top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#6B76FF] bg-transparent text-[#6B76FF] transition disabled:cursor-not-allowed disabled:opacity-40 lg:flex xl:left-[-70px]'
                                            onClick={() => handleScroll("prev")}
                                        >
                                            <ChevronLeft className='h-5 w-5' />
                                        </button>

                                        <div
                                            ref={scrollContainerRef}
                                            className='flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:gap-5'
                                        >
                                            {visibleItems.map((item) => renderCard(item, true, section.variant))}
                                        </div>

                                        <button
                                            type='button'
                                            aria-label='Next services'
                                            disabled={!canScrollNext}
                                            className='absolute right-[-14px] top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#6B76FF] bg-transparent text-[#6B76FF] transition disabled:cursor-not-allowed disabled:opacity-40 lg:flex xl:right-[-70px]'
                                            onClick={() => handleScroll("next")}
                                        >
                                            <ChevronRight className='h-5 w-5' />
                                        </button>

                                        <div className='mt-6 flex items-center justify-center gap-3 lg:hidden'>
                                            <button
                                                type='button'
                                                aria-label='Previous services'
                                                disabled={!canScrollPrev}
                                                className='flex h-10 w-10 items-center justify-center rounded-full border border-[#3C4CFF] text-[#3C4CFF] transition disabled:cursor-not-allowed disabled:opacity-40'
                                                onClick={() => handleScroll("prev")}
                                            >
                                                <ChevronLeft className='h-5 w-5' />
                                            </button>
                                            <button
                                                type='button'
                                                aria-label='Next services'
                                                disabled={!canScrollNext}
                                                className='flex h-10 w-10 items-center justify-center rounded-full border border-[#3C4CFF] text-[#3C4CFF] transition disabled:cursor-not-allowed disabled:opacity-40'
                                                onClick={() => handleScroll("next")}
                                            >
                                                <ChevronRight className='h-5 w-5' />
                                            </button>
                                        </div>
                                    </div>
                                ) : section.variant === "twoCard" ? (
                                    <>
                                        <div className='hidden md:grid grid-cols-1 gap-6 sm:grid-cols-2'>
                                            {visibleItems.map((item) => renderCard(item, false, section.variant))}
                                        </div>

                                        <div className='md:hidden'>
                                            <div
                                                ref={mobileTwoCardSliderRef}
                                                className='flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
                                            >
                                                {mobileTwoCardSlides.map((slideItems, slideIndex) => (
                                                    <div
                                                        key={`${section.id ?? `section-${sectionIndex}`}-slide-${slideIndex}`}
                                                        className='min-w-full snap-start space-y-[16px] pr-2'
                                                    >
                                                        {slideItems.map((item) => (
                                                            <div key={`${item.id}-${slideIndex}`}>
                                                                {renderCard(item, false, section.variant)}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className='relative mt-[40px] h-[1px] bg-gray-600'>
                                                <div
                                                    className='absolute top-0 h-[2px] bg-[#3C4CFF] transition-all duration-300'
                                                    style={{
                                                        left: `${(activeMobileSlide / Math.max(mobileTwoCardSlides.length, 1)) * 100}%`,
                                                        width: `${100 / Math.max(mobileTwoCardSlides.length, 1)}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className={`grid gap-4 lg:gap-5 ${getGridColumnsClass(section.variant)}`}>
                                        {visibleItems.map((item) => renderCard(item, false, section.variant))}
                                    </div>
                                )}
                            </div>
                        </section>
                    );
                })}
        </>
    );
};

export default DetailPageServices;
