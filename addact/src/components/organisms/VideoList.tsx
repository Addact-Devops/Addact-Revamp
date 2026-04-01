"use client";

import React, { useEffect, useState } from "react";
import Loader from "@/components/atom/loader";
import Image from "../atom/image";

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

function extractIframeSrc(richtext: string): string | null {
  const match = richtext.match(/src=["']([^"']+)["']/);
  return match ? match[1] : null;
}

function getYouTubeID(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/,
  );
  return match ? match[1] : null;
}

export default function VideoList({ videoList }: VideoListProps) {
  const [loadingStates, setLoadingStates] = useState<boolean[]>(
    new Array(videoList.length).fill(true),
  );

  const [imageFallback, setImageFallback] = useState<Record<number, boolean>>({});
  const [activeVideoSrc, setActiveVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveVideoSrc(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <section className="pt-[60px] pb-[60px] sm:pt-[100px] sm:pb-[60px] bg-[#0E0D0D]">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {videoList.map((video, index) => {
              const iframeSrc = extractIframeSrc(video.Iframe.Richtext);
              const ytId = iframeSrc ? getYouTubeID(iframeSrc) : null;
              const thumbnailUrl = ytId
                ? imageFallback[index]
                  ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` // Fallback (480p)
                  : `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` // Primary (1080p/720p)
                : "";
              return (
                <div key={index} className="overflow-hidden">
                  <div className="relative w-full h-[200px] md:h-[250px] rounded-xl overflow-hidden group bg-gray-900">
                    {/* Loader for the thumbnail image */}
                    {loadingStates[index] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                        <Loader />
                      </div>
                    )}

                    {iframeSrc ? (
                      <>
                        {thumbnailUrl ? (
                          <Image
                            src={thumbnailUrl}
                            alt={video.Content.Title}
                            fill
                            unoptimized={true}
                            priority={true}
                            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                            onLoad={(event) => {
                              const imgElement = event.currentTarget;

                              if (imgElement.naturalWidth === 120 && !imageFallback[index]) {
                                setImageFallback((prev) => ({ ...prev, [index]: true }));
                                return;
                              }

                              setLoadingStates((prev) => {
                                const updated = [...prev];
                                updated[index] = false;
                                return updated;
                              });
                            }}
                            onError={() => {
                              // 3. This still handles true 404 errors just in case
                              if (!imageFallback[index]) {
                                setImageFallback((prev) => ({ ...prev, [index]: true }));
                              }
                            }}
                          />
                        ) : (
                          // Fallback if the iframe isn't a YouTube video
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            Video Preview
                          </div>
                        )}

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
                    className="text-white font-semibold !text-[35px] !leading-[45px] line-clamp-2 [@media(max-width:1299px)]:!text-[25px] [@media(max-width:1299px)]:!leading-[34px] my-[30px]"
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

      {/* The actual Iframe only loads inside this modal when activeVideoSrc is set */}
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
                src={`${activeVideoSrc}&autoplay=1`} // Auto-plays when modal opens
                className="h-full w-full"
                frameBorder="0"
                title="Youtube Video Popup"
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
