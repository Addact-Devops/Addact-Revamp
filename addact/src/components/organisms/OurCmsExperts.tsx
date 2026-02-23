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
      <div className="container relative z-20">
        <div className="flex gap-10 md:gap-20 lg:gap-[100px] flex-wrap lg:flex-nowrap items-center">
          <div className="w-full lg:w-[40%] flex items-center gap-3">
              <motion.span
                  className="inline-block w-[10px] h-[10px] rounded-full bg-[#3C4CFF] shrink-0"
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.h2
                className="border-after !text-[36px] xl:!text-[38px] 2xl:!text-[60px] !pb-4 xl:!pb-10"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <TechReveal text={data?.ourExpertises[0]?.ExpertiseTitle[0]?.Title || ""} duration={1} />
              </motion.h2>
          </div>

          <motion.div
            className="w-full text-left"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <RichText
              html={data?.ourExpertises[0]?.ExpertiseTitle[0]?.Description}
            />
          </motion.div>
        </div>

        <section>
          <motion.div
            className="mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 sm:mt-8 md:mt-14 2xl:mt-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
          >
            {data.ourExpertises[0].CMS.map((service) => {
              return (
                <motion.div
                  key={service?.id}
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                <SpotlightCard className="h-full">
                  <Link
                    className="bg-transparent border border-white/5 text-white py-4 px-4 md:py-14 md:px-14 2xl:py-20 2xl:px-14 flex justify-center items-center transition-colors duration-300"
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
                </SpotlightCard>
                </motion.div>
              );
            })}
          </motion.div>
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
