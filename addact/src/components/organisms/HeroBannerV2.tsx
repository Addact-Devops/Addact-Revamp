"use client";

import Image from "next/image";

type HeroBannerV2Props = {
    title: string;
    description: string;
    backgroundImageUrl: string;
    logoUrl?: string;
    logoAlt?: string;
};

const HeroBannerV2 = ({ title, description, backgroundImageUrl, logoUrl, logoAlt }: HeroBannerV2Props) => {
    return (
        <section className="relative w-full h-[400px] md:h-[500px] 2xl:h-[800px] flex items-center justify-center text-white overflow-hidden mt-[60px] lg:mt-[115px] 2xl:mt-[120px]">
            {/* Background Image */}
            <Image
                src={backgroundImageUrl}
                alt={title || "Hero Banner"}
                fill
                className="object-cover object-center z-0"
                priority
            />

            {/* Content */}
            <div className="relative z-20 container flex flex-col lg:flex-row items-center justify-between">
                {/* Left: Title + Subtitle */}
                <div className="text-center lg:text-left xl:max-w-[600px] 2xl:max-w-[800px] py-[30px]">
                    <h1 className="text-white mb-[10px] md:mb-[20px] !font-bold !text-[33px] md:!text-[45px] xl:!text-[50px] leading-[55px] 2xl:!text-[78px] xl:!leading-[70px] 2xl:!leading-[100px] uppercase">
                        {title}
                    </h1>
                    <div className="title-head uppercase" dangerouslySetInnerHTML={{ __html: description }} />
                </div>

                {/* Right: Logo */}
                {logoUrl && (
                    <div className="flex-shrink-0 hidden lg:block 2xl:mr-[30px]">
                        <Image
                            src={logoUrl}
                            alt={logoAlt || "Banner Logo"}
                            width={340}
                            height={340}
                            className="object-contain md:!w-[220px] xl:!w-[280px] 2xl:!w-[340px] md:!h-[220px] xl:!h-[280px] 2xl:!h-[340px]"
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default HeroBannerV2;
