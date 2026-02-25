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
    <section className="relative py-[80px] lg:py-[120px] overflow-hidden bg-white" id="insights">
      {/* Subtle animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 -left-[10%] w-[800px] h-[800px] bg-[#3C4CFF]/[0.03] blur-[160px] rounded-full"
        />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mb-[40px] lg:mb-[60px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-zinc-900 font-bold text-[22px] sm:text-[25px] xl:text-[35px] leading-[1.3] tracking-tight"
          >
            Our Insights
          </motion.h2>
        </div>

        {/* Featured Card — Horizontal Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <FeaturedCard item={items[0]} />
        </motion.div>

        {/* 2-Column Equal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.slice(1).map((item, i) => (
            <BentoCard key={i} item={item} index={i + 1} />
          ))}
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
    link: blog.Slug ? "/blogs/" + blog.Slug : (banner?.ReadNow?.href ? (banner.ReadNow.href.startsWith('/') ? banner.ReadNow.href : "/blogs/" + banner.ReadNow.href) : "#"),
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
    link: cs.Slug ? "/portfolio/" + cs.Slug : "#",
    linkLabel: banner?.ReadNow?.label || "View Case Study",
  };
}

// Featured Card — Horizontal layout (image left + content right)
function FeaturedCard({ item }: { item: InsightCardData }) {
  return (
    <Link href={item?.link || "#"} className="group block">
      <div className="relative flex flex-col md:flex-row rounded-2xl overflow-hidden border border-zinc-100 bg-white hover:border-[#3C4CFF]/40 hover:shadow-[0_20px_60px_-10px_rgba(60,76,255,0.12)] transition-all duration-500">
        {/* Image — 40% width on desktop */}
        {item.image?.url && (
          <div className="relative md:w-[40%] shrink-0 aspect-video md:aspect-auto overflow-hidden">
            <Image
              src={item.image.url}
              alt={item.image.alternativeText || item.image.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/10" />
            {/* Badge */}
            <div className="absolute top-5 left-5">
              <span className="px-4 py-1.5 bg-white/90 border border-black/10 text-black rounded-full text-[10px] font-black uppercase tracking-[3px] backdrop-blur-sm">
                {item.type}
              </span>
            </div>
          </div>
        )}

        {/* Content — 60% width */}
        <div className="flex flex-col justify-between flex-1 p-8 lg:p-10">
          <div>
            <div className="text-zinc-400 text-[11px] font-black tracking-[4px] uppercase mb-4">
              {item.date}
            </div>
            <h3 className="text-zinc-900 font-bold text-[22px] sm:text-[25px] xl:text-[30px] leading-[1.3] mb-4 group-hover:text-[#3C4CFF] transition-colors duration-300">
              {item.title}
            </h3>
            <p className="text-zinc-500 text-[14px] md:text-[15px] leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </div>
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-zinc-100">
            <span className="text-black font-black text-[13px] uppercase tracking-[3px] relative">
              {item.linkLabel}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#3C4CFF] transition-all duration-400 group-hover:w-full" />
            </span>
            <div className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center transition-all duration-500 group-hover:bg-[#3C4CFF] group-hover:border-[#3C4CFF] group-hover:shadow-[0_0_20px_rgba(60,76,255,0.4)]">
              <RightArrowUpIcon className="w-4 h-4 text-black group-hover:text-white transition-colors duration-500" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
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
      className={`group relative flex flex-col h-full rounded-[48px] overflow-hidden border border-black/5 bg-zinc-50/40 backdrop-blur-3xl transition-all duration-700 hover:border-black/10 hover:bg-zinc-100/40 hover:shadow-[0_40px_100px_-20px_rgba(60,76,255,0.1)] cursor-pointer`}
    >
      <Link href={item?.link || "#"} className="flex flex-col h-full w-full relative z-30 cursor-pointer">
        {/* Decorative Editorial Number */}
        <div className="absolute top-10 right-10 text-[120px] font-black text-black/[0.03] leading-none pointer-events-none select-none z-0 tracking-tighter transition-all duration-700 group-hover:text-black/[0.06] group-hover:scale-110">
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

        <div className={`relative overflow-hidden shrink-0 ${big ? "aspect-video" : "aspect-16/10"}`}>
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
            <span className="px-6 py-2.5 bg-white/80 border border-black/10 text-black rounded-full text-[11px] font-black uppercase tracking-[4px] backdrop-blur-3xl">
                {item.type}
              </span>
          </div>
        </div>

        <div className={`flex flex-col justify-between flex-1 relative z-20 ${big ? "p-8 lg:p-12" : "p-7 md:p-10"}`}>
          <div>
            <div className="text-black/70 text-[11px] md:text-[13px] font-black tracking-[5px] uppercase mb-5">
              {item.date}
            </div>
            <h4 className={`text-zinc-900 font-bold transition-colors duration-500 ${
              big ? "text-[22px] sm:text-[25px] xl:text-[35px] leading-[1.3] mb-6" : "text-[18px] sm:text-[22px] xl:text-[28px] leading-[1.3] mb-4"
            }`}>
              {item.title}
            </h4>
            {big && (
              <p className="mt-8 text-black/80 text-[14px] md:text-[16px] leading-relaxed font-medium line-clamp-2 max-w-[85%] group-hover:text-black transition-colors duration-500">
                {item.description}
              </p>
            )}
          </div>

          <div className="flex items-center mt-auto pt-6 h-fit">
            <div 
              className="group/link flex items-center gap-8 text-black font-black text-[14px] uppercase tracking-[4px] relative"
            >
              <span className="relative">
                {item.linkLabel}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-[#3C4CFF] transition-all duration-500 group-hover/link:w-full" />
              </span>
              <div className="w-[56px] h-[56px] rounded-full border border-black/20 flex items-center justify-center transition-all duration-700 group-hover/link:bg-[#3C4CFF] group-hover/link:border-[#3C4CFF] group-hover/link:scale-110 group-hover/link:shadow-[0_0_30px_rgba(60,76,255,0.5)]">
                <RightArrowUpIcon className="w-6 h-6 transition-transform duration-700 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 text-black group-hover/link:text-white" />
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
