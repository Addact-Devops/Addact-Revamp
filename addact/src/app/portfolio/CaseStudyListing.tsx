"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/atom/badge";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import TechReveal from "@/components/atom/TechReveal";
import Magnetic from "@/components/molecules/Magnetic";
import {
  getAllCaseStudyData,
  IAllCaseStudy,
} from "@/graphql/queries/getAllCaseStudy";
import RichText from "@/components/atom/richText";
import Loader from "@/components/atom/loader";

const NeuralParticles = dynamic(() => import("@/components/atom/NeuralParticles"), { ssr: false });

const CaseStudyListing = () => {
  const [caseStudyBanner, setCaseStudyBanner] =
    useState<IAllCaseStudy["caseStudy"]>();
  const [caseStudyListing, setCaseStudyListing] =
    useState<IAllCaseStudy["addactCaseStudies"]>();
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const fetchCaseStudy = async () => {
      const data = await getAllCaseStudyData();
      setCaseStudyBanner(data.caseStudy);
      setCaseStudyListing(data.addactCaseStudies);
      setLoading(false);
    };
    fetchCaseStudy();
  }, []);

  if (loading) return <Loader />;
  if (!caseStudyListing)
    return <p className="p-6 text-red-600 mt-32">Case-Study List not found.</p>;

  const sortedData: IAllCaseStudy["addactCaseStudies"] = caseStudyListing.sort(
    (a, b) => {
      const dateA: Date = new Date(a?.HeroBanner?.[0]?.PublishDate || 0);
      const dateB: Date = new Date(b?.HeroBanner?.[0]?.PublishDate || 0);
      return dateB.getTime() - dateA.getTime();
    }
  );

  return (
    <div className="md:pt-[120px]">
      {/* Banner Section */}
      {caseStudyBanner && (
        <section 
          ref={heroRef}
          onMouseMove={handleMouseMove}
          className="relative w-full min-h-[500px] flex items-center justify-center text-white overflow-hidden bg-[#050505]"
        >
          {/* Background Layer */}
          <div className="absolute inset-0 z-0">
            <Image
                src={caseStudyBanner.CaseStudyBanner?.Banner[0]?.BannerImage?.url}
                alt={
                caseStudyBanner.CaseStudyBanner?.Banner[0]?.BannerImage
                    ?.alternativeText
                }
                layout="fill"
                objectFit="cover"
                priority
                className="absolute inset-0 z-0 opacity-40 focus:border-0"
            />
            
            {/* Signature Neural Network Overlay (Interactive) */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
                <NeuralParticles count={40} color="100, 130, 255" lineColor="80, 110, 255" connectDistance={130} interactive={true} />
            </div>


            {/* Scanning beam effect */}
            <motion.div
                className="absolute left-0 right-0 h-[1.5px] z-20 pointer-events-none"
                style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(60,76,255,0.4) 30%, rgba(139,92,246,0.6) 50%, rgba(60,76,255,0.4) 70%, transparent 100%)",
                }}
                animate={{ y: ["0vh", "100vh"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatType: "loop" }}
            />

            {/* Cinematic Grain Texture */}
            <div className="absolute inset-0 z-1 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

            <div className="absolute inset-0 bg-linear-to-b from-black/90 via-black/40 to-[#050505] z-11" />
          </div>

          <div className="relative container z-20 px-4 text-center">
            <h1 className="text-white mb-[20px] md:mb-[15px] font-bold! text-[36px]! md:text-[60px]! leading-[1.1] uppercase tracking-tight">
                <TechReveal text={caseStudyBanner?.CaseStudyBanner?.Banner[0]?.BannerTitle} duration={1.2} />
            </h1>
            <motion.div 
                className="mt-6 prose:text-base prose:leading-8 md:text-lg max-w-2xl mx-auto text-white/70 font-light"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
              <RichText
                html={
                  caseStudyBanner.CaseStudyBanner?.Banner[0]?.BannerDescription
                }
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Listing Section Section */}
      <div className="container mx-auto px-4 py-24 grid gap-16 relative z-10">
        {sortedData.map((item, index) => (
          <motion.div
            key={item.documentId}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="group relative bg-white border border-zinc-200 rounded-[16px] overflow-hidden hover:border-[#3C4CFF]/40 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(60,76,255,0.12)] flex flex-col md:flex-row items-stretch md:min-h-[340px]">
              {/* Image Column */}
              <div className="relative w-full md:w-[45%] aspect-video md:aspect-auto overflow-hidden">
                <Image
                  src={item.HeroBanner[0].BannerImage.url}
                  alt={item.HeroBanner[0].BannerImage.alternativeText}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-r from-zinc-900/40 to-transparent md:block hidden" />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-900/60 md:hidden block" />
                <div className="absolute inset-0 bg-[#3C4CFF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content Column */}
              <div className="flex-1 flex flex-col justify-center p-5 md:p-8 lg:p-10 relative z-10 bg-white">
                <div className="flex items-center gap-4 mb-6">
                  <Badge variant="outline" className="text-[9px] uppercase tracking-widest text-[#3C4CFF] border-[#3C4CFF]/20 font-bold px-2 py-0.5">
                    Case Study
                  </Badge>
                  <span className="text-zinc-400 text-[14px] font-semibold tracking-wide">
                    {new Date(item.HeroBanner[0].PublishDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h2 className="text-zinc-900 font-bold text-[20px]! md:text-[28px]! leading-tight mb-3 group-hover:text-[#3C4CFF] transition-colors duration-300 line-clamp-2">
                  {item.HeroBanner[0].BannerTitle}
                </h2>

                <p className="text-xs md:text-base text-zinc-500 leading-relaxed mb-6 max-w-2xl font-light line-clamp-2">
                  {item.caseStudySummary}
                </p>

                <div className="flex items-center gap-6 mt-auto">
                  <Magnetic>
                    <Link
                        href={`/portfolio${item.Slug}`}
                        className="group/btn relative inline-flex items-center gap-2 bg-[#3C4CFF] text-white px-5 py-2.5 md:px-7 md:py-3 rounded-lg font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 hover:bg-[#3440CB] hover:translate-y-[-1px] shadow-[0_10px_20px_-5px_rgba(60,76,255,0.25)]"
                    >
                        View Project
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                  </Magnetic>
                </div>
              </div>

              {/* Decorative Accent (Right edge highlight) */}
              <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-[#3C4CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudyListing;
