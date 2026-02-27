"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "@/components/atom/badge";
import { ArrowRight, Play, X } from "lucide-react";

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

// Extracts src from Richtext iframe string
function extractIframeSrc(richtext: string): string | null {
    const match = richtext.match(/src=[\"']([^\"']+)[\"']/);
    return match ? match[1] : null;
}

// Builds YouTube thumbnail URL from iframe src
function getYoutubeThumbnail(src: string): string | null {
    const patterns = [
        /youtube\.com\/embed\/([^?&"']+)/,
        /youtu\.be\/([^?&"']+)/,
        /youtube\.com\/watch\?v=([^&"']+)/,
        /youtube-nocookie\.com\/embed\/([^?&"']+)/,
    ];
    for (const pattern of patterns) {
        const match = src.match(pattern);
        if (match) return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
    }
    return null;
}

// ── Video Popup Modal ──────────────────────────────────────────────────
function VideoModal({
    src,
    title,
    onClose,
}: {
    src: string;
    title: string;
    onClose: () => void;
}) {
    const [isLoading, setIsLoading] = useState(true);

    // Close on Escape key
    const handleKey = useCallback(
        (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
        [onClose]
    );
    useEffect(() => {
        document.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [handleKey]);

    const autoplaySrc = src.includes("?")
        ? `${src}&autoplay=1&rel=0`
        : `${src}?autoplay=1&rel=0`;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-12 overflow-hidden"
            >
                {/* Immersive Backdrop */}
                <div 
                    className="absolute inset-0 bg-[#050505]/98 backdrop-blur-2xl" 
                    onClick={onClose}
                />
                
                {/* Ambient Light Source */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-[#3C4CFF]/10 blur-[150px] pointer-events-none" />

                {/* Modal box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="relative w-full max-w-5xl z-10 mx-auto"
                >
                    {/* Header Controls - More Stable Position */}
                    <div className="flex justify-between items-end mb-6 px-2">
                        <div className="flex flex-col gap-1.5 overflow-hidden">
                            <h3 className="text-white font-bold text-lg md:text-2xl leading-tight">
                                {title}
                            </h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="group flex flex-col items-center gap-2 text-white/50 hover:text-white transition-all duration-300 ml-4 shrink-0"
                        >
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-md group-hover:bg-[#3C4CFF] group-hover:border-[#3C4CFF] transition-all duration-300 group-hover:rotate-90">
                                <X size={20} />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">Close</span>
                        </button>
                    </div>

                    {/* Premium Iframe Container */}
                    <div className="relative w-full aspect-video rounded-[20px] md:rounded-[32px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] bg-black group ring-1 ring-white/10">
                        {/* Loading State */}
                        <AnimatePresence>
                            {isLoading && (
                                <motion.div 
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-20 bg-[#050505] flex items-center justify-center flex-col gap-4"
                                >
                                    <div className="w-12 h-12 border-2 border-[#3C4CFF]/20 border-t-[#3C4CFF] rounded-full animate-spin" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <iframe
                            src={autoplaySrc}
                            className="w-full h-full relative z-10"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            title={title}
                            onLoad={() => setIsLoading(false)}
                        />

                        {/* Glassmorphic Frame Overlay */}
                        <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-[24px] z-30" />
                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] z-20" />
                    </div>

                    {/* Footer Status Removed */}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// ── Single Video Card ──────────────────────────────────────────────────
function VideoCard({
    video,
    index,
    onPlay,
}: {
    video: VideoContentType;
    index: number;
    onPlay: (src: string, title: string) => void;
}) {
    const iframeSrc = extractIframeSrc(video.Iframe.Richtext);
    const thumbnail = iframeSrc ? getYoutubeThumbnail(iframeSrc) : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white border border-zinc-200 rounded-[16px] overflow-hidden hover:border-[#3C4CFF]/40 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(60,76,255,0.12)] flex flex-col h-full md:min-h-[380px]"
        >
            {/* Thumbnail + Play Trigger */}
            <button
                onClick={() => iframeSrc && onPlay(iframeSrc, video.Content.Title)}
                className="relative aspect-video overflow-hidden bg-zinc-900 block w-full group/play focus:outline-none"
                aria-label={`Play ${video.Content.Title}`}
                disabled={!iframeSrc}
            >
                {thumbnail ? (
                    <img
                        src={thumbnail}
                        alt={video.Content.Title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/play:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                        <Play size={40} className="text-white/30" />
                    </div>
                )}

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover/play:bg-black/15 transition-colors duration-300" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-2xl shadow-black/40 transition-all duration-300 group-hover/play:scale-110 group-hover/play:bg-[#3C4CFF]">
                        <Play
                            size={18}
                            className="text-[#3C4CFF] fill-[#3C4CFF] ml-1 transition-colors duration-300 group-hover/play:text-white group-hover/play:fill-white"
                        />
                    </div>
                </div>

                {/* Watch Now Removed */}
            </button>

            {/* Content */}
            <div className="p-5 md:p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2.5 mb-3">
                    <div className="p-1 rounded-full bg-[#3C4CFF]/10 border border-[#3C4CFF]/20">
                        <Play size={10} className="text-[#3C4CFF] fill-[#3C4CFF]" />
                    </div>
                </div>

                <h2
                    className="text-zinc-900 font-bold text-[18px]! md:text-[22px]! xl:text-[24px]! leading-tight mb-3 group-hover:text-[#3C4CFF] transition-colors duration-300 line-clamp-2"
                    title={video.Content.Title}
                >
                    {video.Content.Title}
                </h2>

                <div
                    className="text-zinc-500 text-xs md:text-sm leading-relaxed mb-6 line-clamp-2 flex-1 font-light"
                    title={video.Content.Description.replace(/<[^>]+>/g, "")}
                    dangerouslySetInnerHTML={{ __html: video.Content.Description }}
                />

                {video.Content.Link?.label && (
                    <button
                        onClick={(e) => {
                            if (iframeSrc) {
                                e.preventDefault();
                                onPlay(iframeSrc, video.Content.Title);
                            }
                        }}
                        className="inline-flex items-center gap-2 text-[#3C4CFF] text-sm font-bold tracking-wide hover:gap-3 transition-all duration-300 focus:outline-none cursor-pointer text-left"
                    >
                        {video.Content.Link.label}
                        <ArrowRight size={16} />
                    </button>
                )}
            </div>

            {/* Decorative bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-[#3C4CFF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
    );
}

// ── Main Export ────────────────────────────────────────────────────────
export default function VideoList({ videoList }: VideoListProps) {
    const [activeVideo, setActiveVideo] = useState<{ src: string; title: string } | null>(null);

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3C4CFF]/5 blur-[120px] -z-1" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#3C4CFF]/5 blur-[120px] -z-1" />

            <div className="container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videoList.map((video, index) => (
                        <VideoCard
                            key={index}
                            video={video}
                            index={index}
                            onPlay={(src, title) => setActiveVideo({ src, title })}
                        />
                    ))}
                </div>
            </div>

            {/* Global Video Modal */}
            {activeVideo && (
                <VideoModal
                    src={activeVideo.src}
                    title={activeVideo.title}
                    onClose={() => setActiveVideo(null)}
                />
            )}
        </section>
    );
}
