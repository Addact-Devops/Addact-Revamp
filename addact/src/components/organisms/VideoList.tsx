"use client";

import React, { useState } from "react";
import Loader from "@/components/atom/loader"; // Update the path if your loader is elsewhere

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
        <section className="pt-[60px] pb-[60px] sm:pt-[100px] sm:pb-[60px] bg-[#0E0D0D]">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                    {videoList.map((video, index) => {
                        const iframeSrc = extractIframeSrc(video.Iframe.Richtext);

                        return (
                            <div key={index} className="overflow-hidden">
                                {/* Iframe with loader */}
                                <div className="relative w-full h-[200px] md:h-[250px] rounded-xl overflow-hidden">
                                    {loadingStates[index] && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                                            <Loader />
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
                                            className="w-full h-[200px] md:h-[250px] rounded-xl"
                                            frameBorder="0"
                                            allowFullScreen
                                        />
                                    )}
                                </div>

                                {/* Title */}
                                <h2 className="text-white font-semibold !text-[35px] !leading-[45px] my-[30px] [@media(max-width:1299px)]:!text-[30px] [@media(max-width:1299px)]:!leading-[40px]">
                                    {video.Content.Title}
                                </h2>

                                {/* Description */}
                                <div
                                    className="text-[#fff]"
                                    dangerouslySetInnerHTML={{
                                        __html: video.Content.Description,
                                    }}
                                />

                                {/* Button */}
                                {video.Content.Link?.href && (
                                    <a
                                        href={video.Content.Link.href}
                                        target={video.Content.Link.isExternal ? "_blank" : "_self"}
                                        rel="noopener noreferrer"
                                        className="text-[15px] bg-[#3C4CFF] text-white text-base font-[600] rounded-lg transition h-[41px] inline-flex items-center justify-center px-[16px] mt-[20px] w-auto"
                                    >
                                        {video.Content.Link.label}
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
