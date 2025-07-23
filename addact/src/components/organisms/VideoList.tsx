"use client";

import React from "react";

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

export default function VideoList({ videoList }: VideoListProps) {
    return (
        <section className="pt-[60px] pb-[10px] sm:pt-[100px] sm:pb-[10px] bg-[#0E0D0D]">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                    {videoList.map((video, index) => (
                        <div key={index} className="overflow-hidden">
                            {/* Iframe */}
                            <div className="w-full overflow-hidden rounded-xl">
                                <div dangerouslySetInnerHTML={{ __html: video.Iframe.Richtext }} />
                                <style jsx global>{`
                                    iframe {
                                        width: 100% !important;
                                        height: 250px !important;
                                        border-radius: 0.75rem !important; /* rounded-xl */
                                        display: block;
                                    }
                                `}</style>
                            </div>

                            {/* Title */}
                            <h2 className="text-white font-semibold !text-[35px] !leading-[45px] mb-[30px] [@media(max-width:1299px)]:!text-[30px] [@media(max-width:1299px)]:!leading-[40px]">
                                {video.Content.Title}
                            </h2>

                            {/* Description */}
                            <div
                                className="text-[#fff}"
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
                    ))}
                </div>
            </div>
        </section>
    );
}
