"use client";
import { GloabeAnimation } from "@/graphql/queries/getHomePage";
import { useEffect, useRef, useState } from "react";
import TechReveal from "../atom/TechReveal";
import NeuralParticles from "../atom/NeuralParticles";

// Exact time (in seconds) when each location appears in the video
interface InternalProps {
    data: GloabeAnimation;
}

export default function GlobeAnimation(data: InternalProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
    const rawString = data.data?.Locations ?? "";
    const LOCATIONS =
        rawString && rawString.includes('"')
            ? rawString
                  .replace(/"/g, "")
                  .split(",")
                  .map((item) => item.trim())
            : [];

    const TIME_MARKS = Array.from({ length: LOCATIONS.length }, (_, i) => +(i * 1.4 + 0.85).toFixed(2));

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateLocation = () => {
            const currentTime = video.currentTime;
            const lastTimeMark = TIME_MARKS[TIME_MARKS.length - 1];
            const holdDuration = 0.8;

            if (currentTime > lastTimeMark + holdDuration) {
                video.currentTime = 0;
                setCurrentLocationIndex(0);
                return;
            }

            for (let i = TIME_MARKS.length - 1; i >= 0; i--) {
                if (currentTime >= TIME_MARKS[i]) {
                    if (i !== currentLocationIndex) {
                        setCurrentLocationIndex(i);
                    }
                    break;
                }
            }
        };

        video.addEventListener("timeupdate", updateLocation);
        return () => video.removeEventListener("timeupdate", updateLocation);
    }, [currentLocationIndex, TIME_MARKS]);

    if (!data.data) return null;

    return (
        <section className="relative md:flex flex-col justify-center bg-[#050505] text-white py-[80px] lg:py-[120px] 2xl:py-[180px] overflow-hidden hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0 opacity-40">
                <NeuralParticles 
                    count={40} 
                    color="60, 76, 255" 
                    lineColor="60, 76, 255" 
                    connectDistance={150}
                />
            </div>

            {/* Ambient Radial Depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#3C4CFF]/10 blur-[150px] rounded-full z-0 opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/5 blur-[100px] rounded-full z-0" />
            
            <div className="container relative z-10 flex flex-col items-center justify-center gap-[40px] lg:gap-[80px]">
                {/* Heading Area */}
                <div className="text-center max-w-4xl">
                    <h2 className="text-[28px]! md:text-[45px]! 2xl:text-[64px]! leading-tight text-white font-bold mb-4 tracking-tight">
                        <TechReveal text={data.data?.Title || "Our Global Presence"} duration={1.2} />
                        <div className="mt-4 flex flex-col items-center justify-center">
                            <div className="h-px w-24 bg-linear-to-r from-transparent via-[#3C4CFF] to-transparent mb-6 opacity-60" />
                            <div className="relative h-[1.2em] flex items-center justify-center overflow-hidden">
                                <span className="text-[#3C4CFF] text-[32px] md:text-[50px] 2xl:text-[72px] font-black uppercase tracking-widest drop-shadow-[0_0_15px_rgba(60,76,255,0.4)]">
                                    {LOCATIONS[currentLocationIndex] ?? ""}
                                </span>
                            </div>
                        </div>
                    </h2>
                </div>

                {/* Boundless Globe Canvas */}
                <div className="relative w-full max-w-5xl group">
                    {/* Decorative Ring */}
                    <div className="absolute inset-0 rounded-full border border-white/5 scale-110 -z-1 transition-transform duration-1000 group-hover:scale-115" />
                    <div className="absolute inset-0 rounded-full border border-[#3C4CFF]/5 scale-125 -z-1 transition-transform duration-1000 group-hover:scale-130 delay-100" />

                    <div className="relative aspect-video rounded-[40px] overflow-hidden">
                        <video
                            ref={videoRef}
                            src={data.data?.Video?.url}
                            autoPlay
                            muted
                            playsInline
                            loop
                            className="w-full h-full object-cover mix-blend-screen opacity-90 transition-opacity duration-700 group-hover:opacity-100"
                        />
                        
                        {/* Vignette Overlay for seamless blending */}
                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_40px_rgba(5,5,5,0.9)]" />
                    </div>

                    {/* Bottom Reflection Glow */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-[#3C4CFF]/20 blur-[60px] rounded-full opacity-30" />
                </div>
            </div>

            {styleTag}
        </section>
    );
}

const styleTag = (
    <style jsx>{`
        section {
            background-image: 
                radial-gradient(circle at 50% 50%, rgba(60, 76, 255, 0.03) 0%, transparent 70%);
        }
    `}</style>
);
