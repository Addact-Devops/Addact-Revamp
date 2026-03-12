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
  const staticMobileUrl =
    "https://d3l7d9gtq0bnch.cloudfront.net/cta_bg_mobile_dc22d2edd3.png";

  // On industries/* use static image for mobile, else use desktop image for both
  const mobileUrl = isIndustriesPage ? staticMobileUrl : desktopUrl;

  const cta = data?.CTALink[0];
  const href = cta?.href || "";
  const label = cta?.label || "";
  const target = cta?.isExternal ? "_blank" : "_self";

  const bgVars: CSSVars = {
    "--cta-bg-mobile": `url(${mobileUrl})`,
    "--cta-bg-desktop": `url(${desktopUrl})`,
  };

  return (
    <section className="relative overflow-hidden">
      <div
        className="cta-bg relative text-white w-full h-full shadow-md bg-no-repeat bg-cover bg-center"
        style={bgVars}
      >
        <div className="absolute -bottom-10 right-0 hidden md:block pointer-events-none z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="619"
            height="480"
            viewBox="0 0 619 480"
            fill="none"
            className="w-[619px] h-auto"
          >
            <foreignObject
              x="-13.3538"
              y="-13.3538"
              width="725.11"
              height="679.708"
            >
              <div
                style={{
                  backdropFilter: "blur(6.68px)",
                  clipPath: "url(#bgblur_0_18204_4552_clip_path)",
                  height: "100%",
                  width: "100%",
                }}
              ></div>
            </foreignObject>
            <g data-figma-bg-blur-radius="13.3538">
              <path
                d="M698.403 653H570.205L348.23 146.156L126.256 653H0L294.615 0H402.831L698.403 653Z"
                fill="white"
                fillOpacity="0.02"
              />
              <path
                d="M402.615 0.333984L697.885 652.666H570.423L348.536 146.022L348.23 145.324L347.925 146.022L126.038 652.666H0.517578L294.831 0.333984H402.615Z"
                stroke="white"
                strokeOpacity="0.7"
                strokeWidth="0.667689"
              />
            </g>
            <defs>
              <clipPath
                id="bgblur_0_18204_4552_clip_path"
                transform="translate(13.3538 13.3538)"
              >
                <path d="M698.403 653H570.205L348.23 146.156L126.256 653H0L294.615 0H402.831L698.403 653Z" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="container-main relative">
          <div className="absolute inset-0 bg-linear-to-r from-[#0f0f0f] from-[38.053%] via-[rgba(15,15,15,0.7)] via-[58.884%] to-[rgba(15,15,15,0)] to-[80.044%] z-10" />

          <div className="relative z-20 pt-[40px] pb-[150px] md:py-[90px] banner-content-space">
            <h2 className="!text-[28px] md:!text-[40px] 2xl:!text-[60px] md:w-[550px] lg:!w-[800px] 2xl:leading-[85px]">
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

      <style jsx>{`
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
