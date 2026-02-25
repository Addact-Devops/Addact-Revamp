"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CMSResponse,
  getCMSExpertiseData,
} from "@/graphql/queries/getCmsExperts";
import Image from "../atom/image";
import RichText from "../atom/richText";
import TechReveal from "../atom/TechReveal";

/* ✅ optional props to override with industry data (includes required fields) */
type OverrideItem = {
  id?: string;
  Title?: string;
  Links?: {
    id?: string;
    href?: string;
    label?: string;
    isExternal?: boolean;
    target?: string;
  } | null;
  Icons?: {
    url?: string;
    alternativeText?: string;
    width?: number;
    height?: number;
    name?: string;
  } | null;
  ClassName?: string;
};

type OurCmsExpertsWithAnimationProps = {
  title?: string;
  descriptionHtml?: string;
  items?: OverrideItem[];
};

const OurCmsExpertsWithAnimation = (props: OurCmsExpertsWithAnimationProps) => {
  const [data, setData] = useState<CMSResponse | null>(null);

  // ▶️ Play animation once grid is in view
  const [playCards, setPlayCards] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getCMSExpertiseData();
      setData(response);
    }
    const hasOverrides = !!(
      props?.title ||
      (props?.items && props.items.length)
    );
    if (!hasOverrides) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Build synthetic data from overrides (no ts-ignore needed)
  useEffect(() => {
    if (props?.title || (props?.items && props.items.length)) {
      const synthetic = {
        ourExpertises: [
          {
            ExpertiseTitle: [
              {
                Title: props.title ?? "",
                Description: props.descriptionHtml ?? "",
              },
            ],
            CMS: (props.items ?? []).map((s, idx) => ({
              id: s.id ?? String(idx),
              Title: s.Title ?? "",
              Links: {
                id: s.Links?.id ?? String(idx),
                href: s.Links?.href ?? "#",
                label: s.Links?.label ?? s.Title ?? "Learn more",
                target:
                  s.Links?.target ?? (s.Links?.isExternal ? "blank" : "self"),
                isExternal: s.Links?.isExternal ?? s.Links?.target === "blank",
              },
              Icons: s.Icons
                ? {
                    url: s.Icons.url ?? "",
                    alternativeText: s.Icons.alternativeText ?? "Service Icon",
                    width: s.Icons.width ?? 113,
                    height: s.Icons.height ?? 64,
                    name: s.Icons.name ?? s.Title ?? "icon",
                  }
                : {
                    url: "",
                    alternativeText: "Service Icon",
                    width: 113,
                    height: 64,
                    name: "icon",
                  },
              ClassName: s.ClassName ?? "",
            })),
          },
        ],
      } as unknown as CMSResponse; // ✅ type-safe cast replaces ts-ignore

      setData(synthetic);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props?.title,
    props?.descriptionHtml,
    JSON.stringify(props?.items || []),
  ]);

  // 👀 Start animation ONLY after the grid is rendered and enters viewport
  useEffect(() => {
    if (!data) return; // wait for items to render
    if (typeof window === "undefined") return;

    const el = gridRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setPlayCards(true); // fallback: just show
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setPlayCards(true);
          obs.disconnect(); // run once
        }
      },
      {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [data]); // 🔑 re-run when data arrives so the grid actually exists

  if (!data) return null;

  return (
    <section className="my-[80px] lg:my-[100px] 2xl:my-[200px] cms-list">
      <div className="container">
        <div className="flex gap-10 md:gap-20 lg:gap-[100px] flex-wrap lg:flex-nowrap items-center">
          <h2 className="w-full lg:w-[40%] border-after text-[36px]! xl:text-[38px]! 2xl:text-[60px]! pb-4! xl:pb-10! text-black border-black/10">
            <TechReveal 
                text={data?.ourExpertises[0]?.ExpertiseTitle[0]?.Title || "Our CMS Expertise"} 
                duration={0.8} 
            />
          </h2>

          <div className="w-full text-left text-zinc-600 text-[18px] 2xl:text-[22px] leading-relaxed">
            <RichText
              html={data?.ourExpertises[0]?.ExpertiseTitle[0]?.Description}
            />
          </div>
        </div>

        <section>
          <div
            ref={gridRef}
            className="mx-auto grid grid-cols-2 md:grid-cols-3 gap-[10px] md:gap-6 lg:mt-14 2xl:mt-24"
          >
            {data.ourExpertises[0].CMS.map((service) => {
              const hoverColorMap: Record<string, string> = {
                Sitecore: "hover:bg-[#EE3524]",
                Umbraco: "hover:bg-[#3544B1]",
                Kentico: "hover:bg-[#F05A22]",
                Strapi: "hover:bg-[#4945FF]",
                Contentful: "hover:bg-[#1773EB]",
                Contentstack: "hover:bg-[#7C4DFF]",
              };
              const hoverColorClass =
                hoverColorMap[service?.Title] || "hover:bg-[#EE3524]";

              return (
                <Link
                  key={service?.id}
                  href={service?.Links?.href}
                  target={service?.Links?.isExternal ? "_blank" : "_self"}
                  // 🔥 Animate the ENTIRE card (0 → 1) when grid enters view
                  className={`card-zoom group ${
                    playCards ? "play" : ""
                  } bg-white border border-zinc-200 py-4 px-4 md:py-14 md:px-14 2xl:py-20 2xl:px-14 flex justify-center items-center transition-all duration-300 hover:border-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/5`}
                >
                  <Image
                    src={service?.Icons?.url}
                    alt={service?.Icons?.alternativeText || "Service Icon"}
                    width={service?.Icons?.width}
                    height={service?.Icons?.height}
                    className="w-[113px] md:w-[310px] cms-logo-filter"
                    unoptimized={false}
                  />
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      {/* Global CSS for the card scale animation (0 → 1, once when in view) */}
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          .card-zoom,
          .card-zoom.play {
            animation: none !important;
            transform: none !important;
          }
        }

        .card-zoom {
          transform: scale(0);
          transform-origin: center center;
          will-change: transform;
        }
        .card-zoom.play {
          animation: zoomInCards 500ms ease-out forwards;
        }
        @keyframes zoomInCards {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default OurCmsExpertsWithAnimation;
