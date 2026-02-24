"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import TechReveal from "../atom/TechReveal";
import SpotlightCard from "../atom/SpotlightCard";
import RichText from "../atom/richText";
import {
  getIndustriesWeServe,
  IndustriesResponse,
} from "@/graphql/queries/getIndustries";
import Loader from "../atom/loader";

const NeuralParticles = dynamic(() => import("../atom/NeuralParticles"), { ssr: false });

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

  if (loading) {
    return <Loader />;
  }

  if (!data) return null;

  const { TitleDescription, Industries } = data;

  return (
    <section className="relative my-[80px] lg:my-[100px] 2xl:my-[200px] overflow-hidden">
      {/* Subtle background particles */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <NeuralParticles count={30} color="60, 76, 255" lineColor="60, 76, 255" connectDistance={130} />
      </div>

      <div className="container relative z-10">
        {/* Heading and description */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-6 md:gap-12 mb-16 px-4 md:px-0 text-left">
          <motion.h2 
            className="w-full lg:w-[40%] border-after text-[36px]! xl:text-[38px]! 2xl:text-[60px]! pb-4! xl:pb-10! font-bold text-black"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <TechReveal text={TitleDescription?.Title || "Industries We Serve"} duration={1.2} />
          </motion.h2>
          {TitleDescription?.Description && (
            <div className="w-full text-left font-normal">
              <RichText html={TitleDescription.Description} />
            </div>
          )}
        </div>

        {/* Grid of industries */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-16 px-4 md:px-0">
          {Industries.map((item, i) => {
            const icon = item.Icons;
            const link = item.LinkIcons?.[0];
            const hasLink = !!link?.href;

            const iconTitle = (item.Title || icon?.name?.replace(".svg", "").replace(/[-_]/g, " ")) ?? "Untitled";

            const cardContent = (
              <SpotlightCard 
                className="h-full group flex flex-col items-center justify-center p-6 md:p-8 xl:p-10 border border-zinc-200 bg-white hover:border-brand-blue transition-all duration-300 overflow-hidden relative"
                spotlightColor="rgba(60, 76, 255, 0.1)"
              >
                {icon?.url && (
                  <div className="relative mb-6 transform group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src={icon.url}
                      alt={icon.alternativeText || icon.name || "Industry Icon"}
                      width={icon.width}
                      height={icon.height}
                      className="w-12 h-12 md:w-16 md:h-16 2xl:w-20 2xl:h-20 object-contain transition-all group-hover:drop-shadow-[0_0_15px_rgba(60,76,255,0.4)]"
                    />
                  </div>
                )}
                <h3 className="text-black font-bold text-center text-[12px]! md:text-base! group-hover:text-brand-blue transition-colors uppercase tracking-widest leading-snug">
                  {iconTitle}
                </h3>
              </SpotlightCard>
            );

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="h-full"
              >
                {hasLink ? (
                  <Link
                    href={link.href}
                    target={link?.isExternal ? "_blank" : "_self"}
                    className="block h-full"
                  >
                    {cardContent}
                  </Link>
                ) : (
                  cardContent
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
