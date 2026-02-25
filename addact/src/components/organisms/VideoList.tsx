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
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-8"
                onClick={onClose}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

                {/* Modal box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.88, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 16 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative w-full max-w-4xl z-10"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute -top-12 right-0 flex items-center gap-2 text-white/70 hover:text-white text-[13px] font-medium transition-colors duration-200 group"
                        aria-label="Close video"
                    >
                        <span className="hidden sm:block">Close</span>
                        <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition duration-200 group-hover:rotate-90">
                            <X size={16} />
                        </div>
                    </button>

                    {/* Title */}
                    {title && (
                        <p className="text-white/60 text-[12px] font-medium uppercase tracking-[0.2em] mb-3 truncate">
                            {title}
                        </p>
                    )}

                    {/* iframe wrapper — 16:9 */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
                        <iframe
                            src={autoplaySrc}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            title={title}
                        />
                    </div>
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
            className="group relative bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-[#3C4CFF]/40 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(60,76,255,0.15)] flex flex-col h-full"
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
                    <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-2xl shadow-black/40 transition-all duration-300 group-hover/play:scale-110 group-hover/play:bg-[#3C4CFF]">
                        <Play
                            size={22}
                            className="text-[#3C4CFF] fill-[#3C4CFF] ml-1 transition-colors duration-300 group-hover/play:text-white group-hover/play:fill-white"
                        />
                    </div>
                </div>

                {/* Watch Now label */}
                <div className="absolute bottom-3 left-3">
                    <span className="bg-black/70 text-white text-[11px] font-medium px-2 py-0.5 rounded">
                        Watch Now
                    </span>
                </div>
            </button>

            {/* Content */}
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

                <div
                    className="text-zinc-600 text-sm leading-relaxed mb-8 line-clamp-2 flex-1"
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
