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
            <div className="group relative bg-[#0E0D0D]/40 backdrop-blur-md border border-white/5 rounded-[24px] overflow-hidden hover:border-[#3C4CFF]/40 transition-all duration-500 hover:shadow-[0_0_50px_-15px_rgba(60,76,255,0.2)] flex flex-col md:flex-row items-stretch md:min-h-[450px]">
                {/* Image Section */}
                <div className="relative w-full md:w-[45%] aspect-video md:aspect-auto overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transform transition-transform duration-1000 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent md:block hidden" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 md:hidden block" />
                    <div className="absolute inset-0 bg-[#3C4CFF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content Column */}
                <div className="flex-1 flex flex-col justify-center p-6 md:p-12 xl:p-16 relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        {pageType && (
                            <Badge variant="outline" className="text-[10px] uppercase tracking-widest text-[#3C4CFF] border-[#3C4CFF]/20">
                                {pageType}
                            </Badge>
                        )}
                        {date && (
                            <span className="text-white/30 text-[14px] font-medium tracking-wide">
                                {date}
                            </span>
                        )}
                    </div>

                    <h2 className="text-white font-semibold !text-[24px] md:!text-[40px] leading-[1.2] mb-6 group-hover:text-white transition-colors duration-300">
                        {title}
                    </h2>

                    <p className="text-base md:text-lg text-white/60 leading-relaxed mb-10 max-w-2xl line-clamp-3">
                        {description}
                    </p>

                    <div className="flex items-center gap-6 mt-auto">
                        <Link
                            href={href}
                            target={slug.startsWith("http") ? "_blank" : undefined}
                            rel={slug.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="group/btn relative inline-flex items-center gap-3 bg-[#3C4CFF] text-white px-6 py-3.5 md:px-8 md:py-4 rounded-xl font-bold transition-all duration-300 hover:bg-[#4D5DFF] hover:translate-y-[-2px] shadow-lg shadow-[#3C4CFF]/20 text-sm md:text-base"
                        >
                            {linkText}
                            <ArrowRight size={18} className="transform group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Decorative Accent (Right edge) */}
                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-linear-to-b from-[#3C4CFF]/0 via-[#3C4CFF]/40 to-[#3C4CFF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
        </motion.div>
    );
}
