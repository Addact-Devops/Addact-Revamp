"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CTA } from "@/graphql/queries/getHomePage";
import { RightArrowIcon } from "../atom/icons";
import type { CSSProperties } from "react";

interface IProps {
    data: CTA;
}

/** Allow CSS custom properties (e.g. --cta-bg-mobile) on style objects */
type CSSVars = CSSProperties & Record<`--${string}`, string>;

const CtaBanner = ({ data }: IProps) => {
    const pathname = usePathname();
    const isIndustriesPage = pathname?.startsWith("/industries/");

    const desktopUrl = data?.CTAImage?.[0]?.Image?.url ?? "";
    const staticMobileUrl = "https://d3l7d9gtq0bnch.cloudfront.net/cta_bg_mobile_dc22d2edd3.png";

    // On industries/* use static image for mobile, else use desktop image for both
    const mobileUrl = isIndustriesPage ? staticMobileUrl : desktopUrl;

    const cta = data.CTALink[0];
    const href = cta.href;
    const label = cta.label;
    const target = cta?.isExternal ? "_blank" : "_self";

    const bgVars: CSSVars = {
        "--cta-bg-mobile": `url(${mobileUrl})`,
        "--cta-bg-desktop": `url(${desktopUrl})`,
    };

    return (
        <section>
            <div
                className="cta-bg text-white w-full h-full shadow-md bg-no-repeat bg-cover bg-center"
                // pass both URLs as CSS variables; CSS below chooses per breakpoint
                style={bgVars}
            >
                <div className="container">
                    <div className="pt-[40px] pb-[150px] md:pb-24 md:pt-[80px] banner-content-space">
                        <h2 className="!text-[28px] md:!text-[40px] 2xl:!text-[60px] md:w-[550px] lg:w-[800px] 2xl:leading-[85px]">
                            {data.Title[0].h2}
                        </h2>
                        <Link href={href} target={target}>
                            <button className="mt-[24px] md:mt-12 bg-white text-[#3C4CFF] text-[16px] lg:text-lg px-4 py-2 lg:px-5 lg:py-4 rounded hover:bg-gray-200 flex items-center gap-5 font-semibold cursor-pointer">
                                {label}
                                <RightArrowIcon />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scoped styles: choose the BG per breakpoint using the variables above */}
            <style jsx>{`
                /* Mobile first: use --cta-bg-mobile */
                .cta-bg {
                    background-image: var(--cta-bg-mobile) !important;
                }
                @media (min-width: 768px) {
                    .cta-bg {
                        background-image: var(--cta-bg-desktop) !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default CtaBanner;
