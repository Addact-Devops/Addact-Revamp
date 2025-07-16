"use client";
import { useEffect, useState } from "react";

const VerticalLines = () => {
    const [width, setWidth] = useState<number>(0);
    const gap = 247;

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        handleResize(); // Initial
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const lines = [];

    if (width > 0) {
        const maxGapCount = Math.ceil(width / 2 / gap);
        for (let i = 1; i <= maxGapCount; i++) {
            const offset = i * gap;
            lines.push(
                <div
                    key={`left-${i}`}
                    className='absolute top-0 bottom-0 w-[1px] bg-white/10'
                    style={{ left: `calc(50% - ${offset}px)` }}
                />,
                <div
                    key={`right-${i}`}
                    className='absolute top-0 bottom-0 w-[1px] bg-white/10'
                    style={{ left: `calc(50% + ${offset}px)` }}
                />
            );
        }

        // Optional: center line
        lines.push(
            <div
                key='center'
                className='absolute top-0 bottom-0 w-[1px] bg-white/10 left-1/2 transform -translate-x-1/2'
            />
        );
    }

    return <>{lines}</>;
};

export default VerticalLines;
