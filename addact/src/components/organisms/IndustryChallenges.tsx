"use client";

import { Bold } from "lucide-react";
import React from "react";

type ChallengeItem = {
    Number?: string | null;
    Title?: string | null;
    Content?: string | null;
};

type IndustryChallengesData = {
    Title?: string | null;
    NumberTitleContent?: ChallengeItem[] | null;
};

type Props = {
    data?: IndustryChallengesData | null;
};

const pad2 = (val: string | number) => {
    const n = String(val).replace(/\D/g, ""); // keep digits if "01 " etc.
    const num = n.length ? parseInt(n, 10) : Number(val) || 0;
    return String(num).padStart(2, "0");
};

const IndustryChallenges: React.FC<Props> = ({ data }) => {
    const items = Array.isArray(data?.NumberTitleContent) ? data!.NumberTitleContent! : [];

    return (
        <section className="my-[60px] xl:my-[100px] 2xl:my-[200px]">
            <div className="container">
                <div className="flex gap-10 md:gap-[40px] 2xl:gap-[100px] flex-wrap lg:flex-nowrap">
                    {/* Left: Sticky title */}
                    <div className="w-full lg:w-[40%]  2xl:w-[35%]">
                        <div className="lg:sticky lg:top-[120px]">
                            <h2 className="!text-white !text-[36px] xl:!text-[38px] 2xl:!text-[64px] leading-tight">
                                {data?.Title ?? "Our Challenges"}
                            </h2>
                            <div className="w-[160px] h-[6px] bg-[#3C4CFF] mt-6 rounded" />
                        </div>
                    </div>

                    {/* Right: Scrolling list */}
                    <div className="w-full lg:w-[60%] 2xl:w-[65%]">
                        <div className="flex flex-col gap-[80px] md:gap-[100px] 2xl:gap-[120px]">
                            {items.map((item, idx) => {
                                const displayNum = pad2(item?.Number ?? idx + 1);
                                return (
                                    <article key={`${displayNum}-${idx}`} className="relative">
                                        {/* Big outlined number */}
                                        <div
                                            className="pointer-events-none select-none  tracking-tight lg:mb-[20px] 2xl:mb-[40px] lg:text-[130px] 2xl:text-[200px]"
                                            style={{
                                                fontWeight: 900,
                                                WebkitTextStrokeWidth: "2px",
                                                WebkitTextStrokeColor: "rgba(255, 255, 255, 0.7)",
                                                color: "transparent",
                                                lineHeight: "0.8",
                                                fontFamily: "Poppins, sans-serif",
                                                opacity: "0.5",
                                            }}
                                            aria-hidden="true"
                                        >
                                            {displayNum}
                                        </div>

                                        <h3 className="text-white !font-bold !text-[28px] md:!text-[30px] 2xl:!text-[48px] mb-[15px] md:mb-[15px] 2xl:mb-[40px]">
                                            {(item?.Title ?? "").trim()}
                                        </h3>

                                        <div className="text-white text-[12px] md:text-[22px] lg:text-[24px] 2xl:text-[30px] leading-[28px] md:leading-[40px] 2xl:leading-[54px]">
                                            {(item?.Content ?? "").split("\n").map((line, i) => (
                                                <div key={i}>{line.trim()}</div>
                                            ))}
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IndustryChallenges;
