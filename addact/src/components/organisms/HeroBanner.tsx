"use client";

import Link from "next/link";
import Image from "next/image";

interface BannerProps {
    title: string | null;
    description: string;
    button: {
        label: string;
        url: string;
    };
    backgroundImageUrl: string;
}

const HeroBanner = ({ title, description, button, backgroundImageUrl }: BannerProps) => {
    return (
        <div className='relative w-full h-[600px] md:h-[700px] lg:h-[800px] text-white overflow-hidden'>
            <Image
                src={backgroundImageUrl}
                alt='Sitecore XM Cloud Banner'
                fill
                className='object-cover object-center z-0'
                priority
            />

            <div className='relative z-30 max-w-[1600px] mx-auto px-4 py-12 md:py-20 flex flex-col justify-center h-full'>
                <div className='max-w-4xl'>
                    <h1 className='text-4xl sm:text-5xl lg:!text-[90px] !font-bold uppercase !leading-tight'>
                        {title}
                    </h1>

                    <p className='mt-10 text-white/90 text-base sm:!text-2xl leading-relaxed'>{description}</p>

                    <div className='mt-10'>
                        <Link
                            href={button.url}
                            className='inline-block bg-blue-600 hover:bg-blue-700 text-white px-7 py-4 rounded-md font-medium transition text-lg'
                        >
                            {button.label}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
