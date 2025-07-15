"use client";

import Link from "next/link";
import Image from "next/image";

type HeroBannerProps = {
    title: string;
    description: string;
    backgroundImageUrl: string;
    button?: {
        label: string;
        url: string;
    };
    showAnchorLinks?: boolean;
};

const HeroBanner = ({ title, description, backgroundImageUrl, button, showAnchorLinks = false }: HeroBannerProps) => {
    return (
        <section className='relative text-white overflow-hidden md:mt-[120px]'>
            {/* Background Image */}
            <Image
                src={backgroundImageUrl}
                alt={title || "Hero Image"}
                fill
                className='object-cover object-center z-0'
                priority
            />

            {/* Overlay */}
            <div className='absolute inset-0 bg-[rgba(0,0,0,0.5)]'></div>

            {/* Content */}
            <div className='relative container min-h-[550px] 2xl:min-h-[659px] flex flex-col lg:justify-center justify-end h-full mb-[40px] lg:mb-0'>
                <div className='text-left max-w-[95%]'>
                    {/* Title */}
                    <h1 className='text-white mb-[10px] md:mb-[15px] font-semibold text-[45px] leading-[55px] md:text-[60px] md:leading-[63px]'>
                        {title}
                    </h1>

                    {/* Description */}
                    <div
                        className='text-white text-[15px] leading-[25px] lg:text-[17px] lg:leading-[30px] font-normal mt-0 lg:max-w-[50%]'
                        dangerouslySetInnerHTML={{ __html: description }}
                    />

                    {/* Optional Button */}
                    {button?.label && button?.url && (
                        <div className='mt-10'>
                            <Link
                                href={button.url}
                                className='inline-block bg-blue-600 hover:bg-blue-700 text-white px-7 py-4 rounded-md font-medium transition text-lg'
                            >
                                {button.label}
                            </Link>
                        </div>
                    )}
                </div>

                {/* Optional Anchor Links */}
                {showAnchorLinks && (
                    <div className='container absolute bottom-[14px] left-0 hidden lg:flex flex-wrap gap-[50px] justify-start text-white text-[16px] sm:text-base font-medium custom-links'>
                        <a href='#overview'>Overview</a>
                        <a href='#vision-mission'>Vision & Mission</a>
                        <a href='#brand-values'>Brand Values</a>
                        <a href='#who-we-are'>Who are we</a>

                        <style jsx>{`
                            .custom-links a {
                                position: relative;
                                padding-bottom: 6px;
                            }

                            .custom-links a::after {
                                content: "";
                                position: absolute;
                                bottom: -13px;
                                left: 0;
                                width: 100%;
                                height: 5px;
                                background: #e97777;
                                border-radius: 10px 10px 0 0;
                                z-index: 10000;
                                opacity: 0;
                                transition: opacity 0.3s ease;
                            }

                            .custom-links a:hover::after {
                                opacity: 1;
                            }
                        `}</style>
                    </div>
                )}
            </div>
        </section>
    );
};

export default HeroBanner;
