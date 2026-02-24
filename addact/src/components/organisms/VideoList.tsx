"use client";

import React, { useState } from "react";
import Loader from "@/components/atom/loader";
import { motion } from "framer-motion";
import Badge from "@/components/atom/badge";
import { ArrowRight, Play } from "lucide-react";

type VideoContentType = {
    Content: {
        Title: string;
        Description: string;
        Link: {
            isExternal: boolean;
            href: string;
            label: string;
        };
    };
    Iframe: {
        Richtext: string;
    };
};

type VideoListProps = {
    videoList: VideoContentType[];
};

// 🔍 Extracts src from Richtext iframe string
function extractIframeSrc(richtext: string): string | null {
    const match = richtext.match(/src=["']([^"']+)["']/);
    return match ? match[1] : null;
}

export default function VideoList({ videoList }: VideoListProps) {
    const [loadingStates, setLoadingStates] = useState<boolean[]>(new Array(videoList.length).fill(true));

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3C4CFF]/5 blur-[120px] -z-1" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#3C4CFF]/5 blur-[120px] -z-1" />

            <div className="container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videoList.map((video, index) => {
                        const iframeSrc = extractIframeSrc(video.Iframe.Richtext);

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-[#3C4CFF]/40 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(60,76,255,0.15)] flex flex-col h-full"
                            >
                                {/* Video Container */}
                                <div className="relative aspect-video overflow-hidden bg-black/40">
                                    {loadingStates[index] && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
                                            <Loader fullPage={false} />
                                        </div>
                                    )}

                                    {iframeSrc && (
                                        <iframe
                                            src={iframeSrc}
                                            onLoad={() => {
                                                setLoadingStates((prev) => {
                                                    const updated = [...prev];
                                                    updated[index] = false;
                                                    return updated;
                                                });
                                            }}
                                            className="w-full h-full"
                                            frameBorder="0"
                                            allowFullScreen
                                        />
                                    )}

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 pointer-events-none" />
                                </div>

                                {/* Content Section */}
                                <div className="p-6 md:p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                                            Video Feature
                                        </Badge>
                                        <div className="p-1.5 rounded-full bg-[#3C4CFF]/10 border border-[#3C4CFF]/20">
                                            <Play size={12} className="text-[#3C4CFF] fill-[#3C4CFF]" />
                                        </div>
                                    </div>

                                    <h2
                                        className="text-zinc-900 font-semibold text-[22px]! xl:text-[28px]! leading-[1.3] mb-4 group-hover:text-[#3C4CFF] transition-colors duration-300 line-clamp-2"
                                        title={video.Content.Title}
                                    >
                                        {video.Content.Title}
                                    </h2>

                                    {/* Description */}
                                    <div
                                        className="text-zinc-600 text-sm leading-relaxed mb-8 line-clamp-2 flex-1"
                                        title={video.Content.Description.replace(/<[^>]+>/g, "")}
                                        dangerouslySetInnerHTML={{
                                            __html: video.Content.Description,
                                        }}
                                    />

                                    {/* Link/Button */}
                                    {video.Content.Link?.href && (
                                        <a
                                            href={video.Content.Link.href}
                                            target={video.Content.Link.isExternal ? "_blank" : "_self"}
                                            rel="noopener noreferrer"
                                            className="group/btn inline-flex items-center gap-2 text-[#3C4CFF] text-sm font-bold tracking-wide hover:gap-3 transition-all duration-300"
                                        >
                                            {video.Content.Link.label}
                                            <ArrowRight size={16} className="transition-transform duration-300" />
                                        </a>
                                    )}
                                </div>

                                {/* Decorative Gradient Bottom Accent */}
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-[#3C4CFF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
