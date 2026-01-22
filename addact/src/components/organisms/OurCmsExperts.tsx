"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  CMSResponse,
  getCMSExpertiseData,
} from "@/graphql/queries/getCmsExperts";
import Image from "../atom/image";
import RichText from "../atom/richText";

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
type OurCmsExpertsProps = {
  title?: string;
  descriptionHtml?: string; // optional if you add it later
  items?: OverrideItem[];
};

const OurCmsExperts = (props: OurCmsExpertsProps) => {
  const [data, setData] = useState<CMSResponse | null>(null);
  const [playLogos, setPlayLogos] = useState(false); // ▶️ trigger animation once

  useEffect(() => {
    async function fetchData() {
      const response = await getCMSExpertiseData();
      setData(response);
    }
    // ✅ FETCH ONLY if no industry overrides were provided
    const hasOverrides = !!(
      props?.title ||
      (props?.items && props.items.length)
    );
    if (!hasOverrides) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ✅ If industry overrides provided, build a CMSResponse-shaped object and set it */
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
      } as unknown as CMSResponse; // ✅ no ts-ignore, no any

      setData(synthetic);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props?.title,
    props?.descriptionHtml,
    JSON.stringify(props?.items || []),
  ]);

  // ▶️ Start the logo animation once after first paint (prevents SSR flash)
  useEffect(() => {
    const t = requestAnimationFrame(() => setPlayLogos(true));
    return () => cancelAnimationFrame(t);
  }, []);

  if (!data) {
    return null;
  }

  return (
    <section className="my-[80px] lg:my-[100px] 2xl:my-[200px] cms-list">
      <div className="container">
        <div className="flex gap-10 md:gap-20 lg:gap-[100px] flex-wrap lg:flex-nowrap items-center">
          <h2 className="w-full lg:w-[40%] border-after !text-[36px] xl:!text-[38px] 2xl:!text-[60px] !pb-4 xl:!pb-10">
            {data?.ourExpertises[0]?.ExpertiseTitle[0]?.Title}
          </h2>

          <div className="w-full text-left">
            <RichText
              html={data?.ourExpertises[0]?.ExpertiseTitle[0]?.Description}
            />
          </div>
        </div>

        <section>
          <div className="mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 sm:mt-8 md:mt-14 2xl:mt-24">
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
                  className={`bg-[#1C1C1C] border border-gray-700 text-white py-4 px-4 md:py-14 md:px-14 2xl:py-20 2xl:px-14 flex justify-center items-center transition-colors duration-300 ${hoverColorClass}`}
                  key={service?.id}
                  href={service?.Links?.href}
                  target={service?.Links?.isExternal ? "_blank" : "_self"}
                >
                  {/* 🔥 Animate ONLY the logo image */}
                  <div className={`logo-zoom ${playLogos ? "play" : ""}`}>
                    <Image
                      src={service?.Icons?.url}
                      alt={service?.Icons?.alternativeText || "Service Icon"}
                      width={service?.Icons?.width}
                      height={service?.Icons?.height}
                      className="w-[113px] md:w-[310px]"
                      unoptimized={false}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      {/* Global CSS for the logo scale animation */}
      <style jsx global>{`
        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .logo-zoom,
          .logo-zoom.play {
            animation: none !important;
            transform: none !important;
          }
        }

        .logo-zoom {
          display: inline-block;
          transform: scale(0);
          transform-origin: center center;
          will-change: transform;
        }
        .logo-zoom.play {
          animation: zoomInLogos 500ms ease-out forwards;
        }
        @keyframes zoomInLogos {
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

export default OurCmsExperts;
