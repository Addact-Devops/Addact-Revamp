"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // ✅ new import

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
    const pathname = usePathname(); // ✅ get current path

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            const yOffset = -130; // Adjust for sticky header height
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <section className="relative text-white overflow-hidden">
            {/* Background Image */}
            <Image
                src={backgroundImageUrl}
                alt={title || "Hero Image"}
                fill
                className="object-cover object-center z-0"
                priority
            />

            {/* Overlay */}
            <div className="absolute bg-[rgba(0,0,0,0.5)]"></div>

            {/* Content */}
            <div className="relative container mt-[68px] md:mt-[120px] min-h-[550px] 2xl:min-h-[659px] flex flex-col lg:justify-center justify-end h-full mb-[40px] lg:mb-0">
                <div className="text-left max-w-[95%]">
                    <h1 className="text-white mb-[10px] md:mb-[15px] !font-bold !text-[33px] md:!text-[45px] leading-[55px] 2xl:!text-[60px] !2xl:leading-[63px] lg:max-w-[60%]">
                        {title}
                    </h1>

                    <div
                        className="text-white text-[15px] leading-[25px] lg:text-[17px] lg:leading-[30px] font-normal mt-0 lg:max-w-[50%]"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />

                    {button?.label && button?.url && (
                        <div className="mt-10">
                            {button.url.includes("#") ? (
                                <button
                                    onClick={() => {
                                        const targetId = button.url.replace("#", "");
                                        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="inline-block bg-[#3C4CFF] hover:bg-[#3440CB] text-white px-[10px] py-[10px] rounded-md font-semibold transition text-lg text-[15px]"
                                >
                                    {button.label}
                                </button>
                            ) : (
                                <Link
                                    href={button.url}
                                    className="inline-block bg-[#3C4CFF] hover:bg-[#3440CB] text-white px-[10px] py-[10px] rounded-md font-semibold transition text-lg text-[15px]"
                                >
                                    {button.label}
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                {/* Conditional Anchor Links based on URL path */}
                {showAnchorLinks && (
                    <div className="container absolute bottom-[14px] left-0 hidden lg:flex flex-wrap gap-[50px] justify-start text-white text-[16px] sm:text-base font-medium custom-links">
                        {pathname === "/careers" ? (
                            <>
                                <a href="#perks" onClick={(e) => handleScroll(e, "perks")}>
                                    Perks
                                </a>
                                <a href="#open-positions" onClick={(e) => handleScroll(e, "open-positions")}>
                                    Open positions
                                </a>
                                <a href="#life-at-addact" onClick={(e) => handleScroll(e, "life-at-addact")}>
                                    Life at Addact
                                </a>
                            </>
                        ) : pathname === "/about-us" ? (
                            <>
                                <a href="#overview" onClick={(e) => handleScroll(e, "overview")}>
                                    Overview
                                </a>
                                <a href="#vision-mission" onClick={(e) => handleScroll(e, "vision-mission")}>
                                    Vision & Mission
                                </a>
                                {/* <a href='#brand-values' onClick={(e) => handleScroll(e, "brand-values")}>
                                    Brand Values
                                </a> */}
                                <a href="#who-we-are" onClick={(e) => handleScroll(e, "who-we-are")}>
                                    Who are we
                                </a>
                            </>
                        ) : pathname === "/contact-us" ? (
                            <>
                                <a href="#weekday-component" onClick={(e) => handleScroll(e, "weekday-component")}>
                                    Availability
                                </a>
                                <a href="#maps-component" onClick={(e) => handleScroll(e, "maps-component")}>
                                    Our offices
                                </a>
                                <a href="#contact-page-form" onClick={(e) => handleScroll(e, "contact-page-form")}>
                                    Get in touch
                                </a>
                            </>
                        ) : null}

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
                                background: #3c4cff;
                                border-radius: 10px 10px 0 0;
                                z-index: 3;
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
