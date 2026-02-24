"use client";

import { getOurInsights } from "@/graphql/queries/getOurInsights";
import Image from "next/image";
import Link from "next/link";
import { RightArrowUpIcon } from "../atom/icons";
import { useEffect, useState, useRef } from "react";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  AnimatePresence 
} from "framer-motion";

export interface BlogBanner {
  PublishDate?: string;
  BannerTitle?: string;
  BannerDescription?: string;
  BannerImage?: {
    url: string;
    width: number;
    height: number;
    name: string;
    alternativeText?: string | null;
  };
  ReadNow?: {
    href: string;
    label: string;
    target: string;
    isExternal: boolean;
  };
}

export interface Blog {
  Slug: string;
  createdAt: string;
  HeadingSection?: { PageTitle?: string }[];
  BlogBanner?: BlogBanner[];
}

export interface CaseStudy {
  Slug?: string;
  HeroBanner?: BlogBanner[];
}

interface OurInsightsData {
  addactBlogs: Blog[];
  addactCaseStudies: CaseStudy[];
}

interface InsightCardData {
  type: "Blog" | "Case study";
  title: string;
  date: string;
  image?: {
    url: string;
    width: number;
    height: number;
    name: string;
    alternativeText?: string | null;
  };
  description: string;
  link: string;
  linkLabel: string;
}

export default function OurInsights() {
  const [data, setData] = useState<OurInsightsData | null>(null);

  useEffect(() => {
    (async () => {
      const result = await getOurInsights();
      setData(result);
    })();
  }, []);

  if (!data) return null;

  const sortedBlogs = [...data.addactBlogs].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const sortedCaseStudies = [...data.addactCaseStudies].sort(
    (a, b) =>
      new Date(b.HeroBanner?.[0]?.PublishDate || "").getTime() -
      new Date(a.HeroBanner?.[0]?.PublishDate || "").getTime(),
  );

  const blog1 = sortedBlogs[0];
  const blog2 = sortedBlogs[1];
  const caseStudy = sortedCaseStudies[0];

  const items: InsightCardData[] = [
    mapBlogToCard(blog1),
    mapBlogToCard(blog2),
    mapCaseStudyToCard(caseStudy),
  ];

  return (
    <section className="relative py-[140px] lg:py-[200px] overflow-hidden bg-[#050505]" id="insights">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 -left-[10%] w-[1000px] h-[1000px] bg-[#3C4CFF]/[0.07] blur-[160px] rounded-full"
        />
        <motion.div 
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 -right-[10%] w-[800px] h-[800px] bg-[#3C4CFF]/[0.05] blur-[160px] rounded-full"
        />
      </div>

      <div className="w-full px-6 md:px-12 lg:px-20 max-w-[1750px] mx-auto relative z-10">
        <div className="mb-[60px] lg:mb-[80px]">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-white font-bold text-[32px] md:text-[48px] 2xl:text-[72px] leading-[1] tracking-tighter"
          >
            Our Insights
          </motion.h2>
        </div>

        {/* Bento Grid Implementation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 h-auto lg:min-h-[950px]">
          {/* Main Feature Card (Big) */}
          <div className="lg:col-span-12 xl:col-span-8">
            <BentoCard item={items[0]} index={0} big />
          </div>
          
          {/* Secondary Cards Stack */}
          <div className="lg:col-span-12 xl:col-span-4 flex flex-col gap-6 lg:gap-10 min-h-full">
            <div className="flex-1">
              <BentoCard item={items[1]} index={1} />
            </div>
            <div className="flex-1">
              <BentoCard item={items[2]} index={2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function mapBlogToCard(blog: Blog): InsightCardData {
  const banner = blog.BlogBanner?.[0];
  return {
    type: "Blog",
    title: blog.HeadingSection?.[0]?.PageTitle ?? "Untitled",
    date: banner?.PublishDate
      ? new Date(banner.PublishDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Unknown Date",
    image: banner?.BannerImage,
    description: banner?.BannerDescription ?? "",
    link: "/blogs/" + blog.Slug || "/blogs/" + banner?.ReadNow?.href,
    linkLabel: banner?.ReadNow?.label || "Read Story",
  };
}

function mapCaseStudyToCard(cs: CaseStudy): InsightCardData {
  const banner = cs.HeroBanner?.[0];
  return {
    type: "Case study",
    title: banner?.BannerTitle ?? "Untitled",
    date: banner?.PublishDate
      ? new Date(banner.PublishDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Unknown Date",
    image: banner?.BannerImage,
    description: banner?.BannerDescription ?? "",
    link: "/portfolio/" + cs.Slug,
    linkLabel: banner?.ReadNow?.label || "View Case Study",
  };
}

// Custom 3D Tilt Bento Card Component with "Border Beam" Light Trail
function BentoCard({ item, index, big = false }: { item: InsightCardData, index: number, big?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse position motion values for 3D Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col h-full rounded-[48px] overflow-hidden border border-white/5 bg-zinc-950/40 backdrop-blur-3xl transition-all duration-700 hover:border-white/10 hover:bg-zinc-900/40 hover:shadow-[0_40px_100px_-20px_rgba(60,76,255,0.2)]`}
    >
      <Link href={item?.link} className="flex flex-col h-full w-full relative z-30">
        {/* Decorative Editorial Number */}
        <div className="absolute top-10 right-10 text-[120px] font-black text-white/[0.03] leading-none pointer-events-none select-none z-0 tracking-tighter transition-all duration-700 group-hover:text-white/[0.06] group-hover:scale-110">
          0{index + 1}
        </div>

        {/* Border Beam - Animated Light Trail */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <motion.div 
            animate={{
              top: ["-100%", "200%"],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute -right-px w-px h-full bg-gradient-to-b from-transparent via-[#3C4CFF] to-transparent"
          />
          <motion.div 
            animate={{
              left: ["-100%", "200%"],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
            className="absolute -bottom-px w-full h-px bg-gradient-to-r from-transparent via-[#3C4CFF] to-transparent"
          />
        </div>

        <div className={`relative overflow-hidden shrink-0 ${big ? "basis-[52%]" : "basis-[42%]"}`}>
          {item.image?.url && (
            <Image
              src={item.image?.url}
              alt={item.image.alternativeText || item.image.name}
              fill
              className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
          
          {/* Floating Narrative Badge */}
          <div className="absolute top-8 left-8">
            <span className="px-6 py-2.5 bg-black/60 border border-white/10 text-white rounded-full text-[11px] font-black uppercase tracking-[4px] backdrop-blur-3xl">
                {item.type}
              </span>
          </div>
        </div>

        <div className={`flex flex-col justify-between flex-1 relative z-20 ${big ? "p-12 lg:p-16" : "p-10 md:p-12"}`}>
          <div style={{ transform: "translateZ(40px)" }}>
            <div className="text-zinc-500 text-[11px] md:text-[13px] font-black tracking-[5px] uppercase mb-5">
              {item.date}
            </div>
            <h4 className={`text-white font-bold leading-[1.1] transition-colors duration-500 leading-tight ${
              big ? "text-[28px] md:text-[44px] 2xl:text-[56px] mb-8" : "text-[22px] md:text-[30px] 2xl:text-[36px] mb-6"
            }`}>
              {item.title}
            </h4>
            {big && (
              <p className="mt-8 text-zinc-400 text-[18px] md:text-[21px] leading-relaxed font-medium line-clamp-2 max-w-[85%] group-hover:text-zinc-200 transition-colors duration-500">
                {item.description}
              </p>
            )}
          </div>

          <div className="flex items-center mt-10 h-fit" style={{ transform: "translateZ(60px)" }}>
            <div 
              className="group/link flex items-center gap-8 text-white font-black text-[14px] uppercase tracking-[4px] relative"
            >
              <span className="relative">
                {item.linkLabel}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-[#3C4CFF] transition-all duration-500 group-hover/link:w-full" />
              </span>
              <div className="w-[56px] h-[56px] rounded-full border border-white/20 flex items-center justify-center transition-all duration-700 group-hover/link:bg-[#3C4CFF] group-hover/link:border-[#3C4CFF] group-hover/link:scale-110 group-hover/link:shadow-[0_0_30px_rgba(60,76,255,0.5)]">
                <RightArrowUpIcon className="w-6 h-6 transition-transform duration-700 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 text-white" />
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Noise Texture Final Polish */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </motion.div>
  );
}
