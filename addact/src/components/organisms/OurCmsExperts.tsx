"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  CMSResponse,
  getCMSExpertiseData,
} from "@/graphql/queries/getCmsExperts";
import Image from "../atom/image";
import RichText from "../atom/richText";
import { motion } from "framer-motion";
import SpotlightCard from "../atom/SpotlightCard";
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
      } as unknown as CMSResponse;

      setData(synthetic);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props?.title,
    props?.descriptionHtml,
    JSON.stringify(props?.items || []),
  ]);

  if (!data) {
    return null;
  }

  const titleText = data?.ourExpertises[0]?.ExpertiseTitle[0]?.Title || "Our CMS Expertise";
  // Hardcoded split for the standard title to match SS 100%
  const titlePart1 = "Our CMS";
  const titlePart2 = "Expertise";

  return (
    <section className="py-[80px] lg:py-[120px] bg-white relative overflow-hidden">
      <div className="container relative z-20">
        {/* Header Section Alignment - Light Theme */}
        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-20 lg:gap-32 mb-16 md:mb-24">
          <div className="shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-[44px] md:text-[54px] lg:text-[74px] font-bold leading-[1.05] text-[#121212] tracking-tighter">
                {titlePart1} <br /> {titlePart2}
              </h2>
              {/* Blue Bar under heading */}
              <div className="w-24 h-[4px] bg-[#3C4CFF] mt-8" />
            </motion.div>
          </div>

          <motion.div
            className="w-full md:max-w-[500px] lg:max-w-[650px] md:pt-5 text-[#333333] font-medium text-[18px] md:text-[20px] lg:text-[24px] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <RichText
              html={data?.ourExpertises[0]?.ExpertiseTitle[0]?.Description}
            />
          </motion.div>
        </div>

        {/* Card Alignment (3x2 Grid) - Light Theme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {data.ourExpertises[0].CMS.map((service: any) => {
            const hoverColorMap: Record<string, string> = {
              sitecore: "hover:bg-[#EE3524]",
              umbraco: "hover:bg-[#3544B1]",
              kentico: "hover:bg-[#F05A22]",
              strapi: "hover:bg-[#4945FF]",
              contentful: "hover:bg-[#1773EB]",
              contentstack: "hover:bg-[#7246FA]",
            };

            const currentTitle = service?.Title?.toLowerCase() || "";
            const hoverClass = service?.ClassName || 
              Object.keys(hoverColorMap).find(key => currentTitle.includes(key)) 
                ? hoverColorMap[Object.keys(hoverColorMap).find(key => currentTitle.includes(key))!] 
                : "hover:bg-zinc-100";

            return (
              <motion.div
                key={service?.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  className={`group relative h-[210px] md:h-[260px] lg:h-[300px] bg-white border border-zinc-200 flex justify-center items-center transition-all duration-500 ease-out ${hoverClass} hover:border-transparent`}
                  href={service?.Links?.href}
                  target={service?.Links?.isExternal ? "_blank" : "_self"}
                >
                  {/* Snappy Color Overlay */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${hoverClass.replace('hover:', '')}`} />

                  {/* Logo Container: Highly visible monochrome black in light, turns white on hover */}
                  <div className="relative z-10 w-[60%] h-[40%] flex items-center justify-center filter brightness-0 opacity-100 group-hover:filter-none group-hover:brightness-0 group-hover:invert transition-all duration-300">
                    <Image
                      src={service?.Icons?.url}
                      alt={service?.Icons?.alternativeText || "Service Icon"}
                      width={service?.Icons?.width || 250}
                      height={service?.Icons?.height || 100}
                      className="object-contain w-full h-full"
                      unoptimized={false}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurCmsExperts;
