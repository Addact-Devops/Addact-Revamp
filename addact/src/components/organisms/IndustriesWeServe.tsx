"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import TechReveal from "../atom/TechReveal";
import RichText from "../atom/richText";
import {
  getIndustriesWeServe,
  IndustriesResponse,
} from "@/graphql/queries/getIndustries";
import Loader from "../atom/loader";

export default function IndustriesWeServe() {
  const [data, setData] = useState<
    IndustriesResponse["industriesWeServes"][0] | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getIndustriesWeServe()
      .then((res) => {
        const firstItem = res.industriesWeServes?.[0];
        setData(firstItem || null);
      })
      .catch((err) => {
        console.error("Failed to load Industries data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;
  if (!data) return null;

  const { TitleDescription, Industries } = data;

  return (
    <section className="relative my-[80px] lg:my-[100px] 2xl:my-[140px] overflow-hidden">
      <div className="container relative z-10">
        {/* Heading */}
        <motion.h2
          className="border-after text-[32px]! xl:text-[38px]! 2xl:text-[48px]! pb-4! mb-12 font-bold text-black"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <TechReveal
            text={TitleDescription?.Title || "Industries We Serve"}
            duration={1.2}
          />
        </motion.h2>

        {/* Grid of industries */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Industries.map((item, i) => {
            const icon = item.Icons;
            const link = item.LinkIcons?.[0];
            const hasLink = !!link?.href;
            const iconTitle =
              item.Title ||
              icon?.name?.replace(".svg", "").replace(/[-_]/g, " ") ||
              "Untitled";

            const cardContent = (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group flex flex-col items-center justify-center gap-4 p-6 md:p-8 min-h-[160px] rounded-xl border border-zinc-200 bg-white hover:border-[#3C4CFF]/50 hover:shadow-[0_8px_30px_rgba(60,76,255,0.08)] transition-all duration-300 cursor-pointer"
              >
                {/* Icon or letter fallback */}
                <div className="w-14 h-14 rounded-2xl bg-zinc-100 group-hover:bg-[#3C4CFF] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_4px_20px_rgba(60,76,255,0.35)]">
                  {icon?.url ? (
                    <Image
                      src={icon.url}
                      alt={icon.alternativeText || icon.name || iconTitle}
                      width={icon.width || 48}
                      height={icon.height || 48}
                      unoptimized
                      className="w-8 h-8 object-contain brightness-0 opacity-60 group-hover:brightness-200 group-hover:opacity-100 transition-all duration-300"
                    />
                  ) : (
                    <span className="text-zinc-500 group-hover:text-white font-black text-xl uppercase transition-colors duration-300">
                      {iconTitle.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-black font-bold text-center text-[12px]! md:text-base! group-hover:text-[#3C4CFF] transition-colors uppercase tracking-widest leading-snug">
                  {iconTitle}
                </h3>
              </motion.div>
            );

            return hasLink ? (
              <Link
                key={i}
                href={link.href}
                target={link?.isExternal ? "_blank" : "_self"}
                className="block"
              >
                {cardContent}
              </Link>
            ) : (
              <div key={i}>{cardContent}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
