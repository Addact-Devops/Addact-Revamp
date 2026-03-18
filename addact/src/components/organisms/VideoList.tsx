"use client";

import React, { useEffect, useState } from "react";
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
  const [loadingStates, setLoadingStates] = useState<boolean[]>(
    new Array(videoList.length).fill(true),
  );
  const [activeVideoSrc, setActiveVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveVideoSrc(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <section className="pt-[60px] pb-[60px] sm:pt-[100px] sm:pb-[60px] bg-[#0E0D0D]">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {videoList.map((video, index) => {
              const iframeSrc = extractIframeSrc(video.Iframe.Richtext);

              return (
                <div key={index} className="overflow-hidden">
                  <div className="relative w-full h-[200px] md:h-[250px] rounded-xl overflow-hidden group">
                    {loadingStates[index] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                        <Loader />
                      </div>
                    )}

                    {iframeSrc ? (
                      <>
                        <iframe
                          src={iframeSrc}
                          onLoad={() => {
                            setLoadingStates((prev) => {
                              const updated = [...prev];
                              updated[index] = false;
                              return updated;
                            });
                          }}
                          className="w-full h-[200px] md:h-[250px] rounded-xl pointer-events-none"
                          frameBorder="0"
                          allowFullScreen
                        />
                        <button
                          type="button"
                          onClick={() => setActiveVideoSrc(iframeSrc)}
                          className="absolute inset-0 z-20 flex items-center justify-center bg-black/25 transition group-hover:bg-black/40"
                          aria-label={`Open video: ${video.Content.Title}`}
                        >
                          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#3C4CFF] text-white text-xl shadow-lg">
                            ▶
                          </span>
                        </button>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white">
                        Video unavailable
                      </div>
                    )}
                  </div>

                  <h2
                    className=" text-white font-semibold !text-[35px]
                              !leading-[45px] line-clamp-2
                              [@media(max-width:1299px)]:!text-[25px]
                              [@media(max-width:1299px)]:!leading-[34px] my-[30px]"
                    title={video.Content.Title}
                  >
                    {video.Content.Title}
                  </h2>

                  <div
                    className="text-[#fff] line-clamp-2"
                    title={video.Content.Description.replace(/<[^>]+>/g, "")}
                    dangerouslySetInnerHTML={{
                      __html: video.Content.Description,
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => iframeSrc && setActiveVideoSrc(iframeSrc)}
                    disabled={!iframeSrc}
                    className="text-[15px] bg-[#3C4CFF] text-white text-base font-[600] rounded-lg transition h-[41px] inline-flex items-center justify-center px-[16px] mt-[20px] w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Watch Video
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {activeVideoSrc && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 px-4"
          onClick={() => setActiveVideoSrc(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-5xl rounded-xl bg-black p-2"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveVideoSrc(null)}
              className="absolute -top-10 right-0 text-white text-3xl leading-none"
              aria-label="Close video popup"
            >
              ×
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                src={activeVideoSrc}
                className="h-full w-full"
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
