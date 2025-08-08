"use client";
import { GloabeAnimation } from "@/graphql/queries/getHomePage";
import { useEffect, useRef, useState } from "react";

// Exact time (in seconds) when each location appears in the video
// const TIME_MARKS = Array.from({ length: LOCATIONS.length }, (_, i) => +(i * 1.5).toFixed(2));
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

    // const TIME_MARKS = [0.85, 1.7, 3.4, 5.1, 6.8, 8.5, 10.2, 11.9, 13.6, 15.3, 17.5, 18];
    const TIME_MARKS = Array.from({ length: LOCATIONS.length }, (_, i) => +(i * 1.4 + 0.85).toFixed(2));

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateLocation = () => {
            const currentTime = video.currentTime;

            // If we're past the last time mark + hold, restart the video & state
            const lastTimeMark = TIME_MARKS[TIME_MARKS.length - 1];
            const holdDuration = 0.8;

            if (currentTime > lastTimeMark + holdDuration) {
                video.currentTime = 0;
                setCurrentLocationIndex(0);
                return;
            }

            // Find latest index where currentTime >= timeMark
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

    return (
        <section className='flex flex-col  items-center justify-center min-h-screen bg-black text-white'>
            <h2 className='text-lg mb-4 flex gap-1 items-center'>
                {data.data?.Title}
                <span className='text-blue-400 w-[300px] font-semibold transition-opacity duration-500 ease-in-out'>
                    &nbsp;{LOCATIONS[currentLocationIndex] ?? ""}
                </span>
            </h2>

            <video
                ref={videoRef}
                src={data.data?.Video?.url}
                autoPlay
                muted
                playsInline
                loop
                className='w-full max-w-3xl'
            />
        </section>
    );
}
