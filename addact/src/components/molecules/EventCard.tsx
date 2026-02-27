"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Badge from "@/components/atom/badge";
import { getEventStatus } from "@/utils/getEventStatus";

type EventCardProps = {
    title: string;
    date?: string;
    location?: string;
    description: string;
    imageUrl: string;
    slug: string;
    pageType?: string;
    linkText?: string;
};

export default function EventCard({
    title,
    date,
    location,
    description,
    imageUrl,
    slug,
    pageType,
    linkText = "Explore",
}: EventCardProps) {
    const pathname = usePathname();
    const base = pathname.replace(/\/$/, "");
    const cleanSlug = slug.replace(/^\//, "");
    const href = slug.startsWith("http") ? slug : `${base}/${cleanSlug}`;
    const status = getEventStatus(date, pageType);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="container mb-24"
        >
            <div className="group relative bg-white border border-zinc-200 rounded-[16px] overflow-hidden hover:border-[#3C4CFF]/40 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(60,76,255,0.12)] flex flex-col md:flex-row items-stretch md:min-h-[320px]">
                {/* Image Section */}
                <div className="relative w-full md:w-[45%] aspect-video md:aspect-auto overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transform transition-transform duration-1000 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-zinc-900/40 to-transparent md:block hidden" />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-900/60 md:hidden block" />
                    <div className="absolute inset-0 bg-[#3C4CFF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content Column */}
                <div className="flex-1 flex flex-col justify-center p-5 md:p-6 lg:p-8 relative z-10 bg-white">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        {pageType && (
                            <Badge variant="outline" className="text-[10px] uppercase tracking-widest text-[#3C4CFF] border-[#3C4CFF]/20 font-bold px-2 py-0.5">
                                {pageType}
                            </Badge>
                        )}
                        {date && (
                            <span className="flex items-center gap-1 text-zinc-400 text-[12px] font-medium">
                                <CalendarDays size={12} className="text-[#3C4CFF] shrink-0" />
                                {date}
                            </span>
                        )}
                    </div>

                    <h2 className="text-zinc-900 font-bold text-[18px]! md:text-[24px]! leading-tight mb-3 group-hover:text-[#3C4CFF] transition-colors duration-300 line-clamp-2">
                        {title}
                    </h2>

                    <p className="text-xs md:text-sm text-zinc-500 leading-relaxed mb-6 max-w-2xl line-clamp-2">
                        {description}
                    </p>

                    <div className="flex items-center gap-6 mt-auto">
                        <Link
                            href={href}
                            target={slug.startsWith("http") ? "_blank" : undefined}
                            rel={slug.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="group/btn relative inline-flex items-center gap-2 bg-[#3C4CFF] text-white px-4 py-2 md:px-6 md:py-2.5 rounded-md font-bold transition-all duration-300 hover:bg-[#3440CB] hover:translate-y-[-1px] shadow-[0_10px_20px_-5px_rgba(60,76,255,0.25)] text-[11px] md:text-xs uppercase tracking-widest"
                        >
                            {linkText}
                            <ArrowRight size={14} className="transform group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Decorative Accent (Right edge) */}
                <div className="absolute right-0 top-0 bottom-0 w-[2.5px] bg-[#3C4CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </motion.div>
    );
}
