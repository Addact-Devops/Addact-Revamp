"use client";

import Image from "next/image";
import Link from "next/link";
import i1 from "../../../public/ai-ecosystem.png";
// Static data — will be replaced with GraphQL data later
const sectionData = {
  title: "Building AI EcoSystem That Align",
  description:
    "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution. From custom LLMs to automated workflows, we move your business beyond the hype into practical, revenue-generating AI implementation.",
  buttonLabel: "Book Your Free AI Consultation",
  buttonLink: "/contact-us",
  image: i1,
};

// Placeholder logos — will be replaced with actual logo images from GraphQL
const expertiseLogosRow1 = [
  { id: "1", src: "/images/ai-logo-1.svg", alt: "OpenAI" },
  { id: "2", src: "/images/ai-logo-2.svg", alt: "GPT" },
  { id: "3", src: "/images/ai-logo-3.svg", alt: "LLM" },
  { id: "4", src: "/images/ai-logo-4.svg", alt: "AI Tool" },
  { id: "5", src: "/images/ai-logo-5.svg", alt: "ML Platform" },
];

const expertiseLogosRow2 = [
  { id: "6", src: "/images/ai-logo-6.svg", alt: "Deep Learning" },
  { id: "7", src: "/images/ai-logo-7.svg", alt: "Neural Net" },
  { id: "8", src: "/images/ai-logo-8.svg", alt: "NLP" },
  { id: "9", src: "/images/ai-logo-9.svg", alt: "Computer Vision" },
  { id: "10", src: "/images/ai-logo-10.svg", alt: "AI Framework" },
];

const BuildingAIEcosystem = () => {
  return (
    <section className="bg-[#0F0F0F]">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 2xl:gap-6 items-center">
          {/* Left side — Image (hidden on mobile, shown on lg+) */}
          <div className="hidden lg:block w-full lg:w-[45%] 2xl:w-[50%]">
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image
                src={sectionData.image}
                alt={sectionData.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 50vw"
              />
            </div>
          </div>

          {/* Right side — Content */}
          <div className="w-full lg:w-[55%] 2xl:w-[50%] pt-3 md:pt-0">
            {/* Heading */}
            <h2 className="!text-[28px] md:!text-[40px] lg:!text-[48px] 2xl:!text-[60px] !font-semibold text-white leading-[1.2] mb-5 md:mb-6 2xl:mb-8">
              {sectionData.title.split(" ").slice(0, 2).join(" ")}
              <br className="hidden lg:block" />
              {sectionData.title.split(" ").slice(2).join(" ")}
            </h2>

            {/* Description */}
            <p className="text-white/70 text-[14px] md:text-[16px] 2xl:text-[18px] leading-[1.8] mb-8 md:mb-10 2xl:mb-12 max-w-[600px]">
              {sectionData.description}
            </p>

            {/* On Hand Expertise — Marquee */}
            <div className="relative mb-8 md:mb-10 2xl:mb-12">
              {/* Label — positioned as legend between border lines */}
              <span className="inline-block text-[#0F0F0F] border border-white/20 bg-white text-[12px] md:text-[14px] font-medium px-4 py-1.5 md:py-2 rounded-xl relative z-10 translate-y-1/2 ml-4 md:ml-6">
                On Hand Expertise
              </span>

              {/* Marquee container-main — glass effect */}
              <div className="border border-white/20 rounded-lg overflow-hidden py-6 md:py-8 2xl:py-10 group bg-white/[0.03] backdrop-blur-sm">
                {/* Row 1 — Left to Right */}
                <div className="flex overflow-hidden mb-4 md:mb-6 marquee-mask">
                  <div className="flex gap-8 md:gap-12 2xl:gap-16 items-center animate-marquee-ltr group-hover:[animation-play-state:paused]">
                    {[
                      ...expertiseLogosRow1,
                      ...expertiseLogosRow1,
                      ...expertiseLogosRow1,
                      ...expertiseLogosRow1,
                    ].map((logo, index) => (
                      <div
                        key={`row1-${logo.id}-${index}`}
                        className="flex-shrink-0 w-[50px] h-[50px] md:w-[60px] md:h-[60px] 2xl:w-[70px] 2xl:h-[70px] flex items-center justify-center"
                      >
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={70}
                          height={70}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 2 — Right to Left */}
                <div className="flex overflow-hidden marquee-mask">
                  <div className="flex gap-8 md:gap-12 2xl:gap-16 items-center animate-marquee-rtl group-hover:[animation-play-state:paused]">
                    {[
                      ...expertiseLogosRow2,
                      ...expertiseLogosRow2,
                      ...expertiseLogosRow2,
                      ...expertiseLogosRow2,
                    ].map((logo, index) => (
                      <div
                        key={`row2-${logo.id}-${index}`}
                        className="flex-shrink-0 w-[50px] h-[50px] md:w-[60px] md:h-[60px] 2xl:w-[70px] 2xl:h-[70px] flex items-center justify-center"
                      >
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={70}
                          height={70}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href={sectionData.buttonLink}
              className="inline-flex items-center gap-3 bg-white text-[#0F0F0F] border border-white text-[16px] md:text-[18px] !font-semibold px-6 py-3 md:px-8 md:py-4 rounded-[10px] transition-all duration-300 hover:bg-[#3C4CFF] hover:border-[#3C4CFF] hover:text-white"
            >
              {sectionData.buttonLabel}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Marquee animations */}
      <style jsx global>{`
        @keyframes marquee-ltr {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        @keyframes marquee-rtl {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee-ltr {
          animation: marquee-ltr 25s linear infinite;
        }

        .animate-marquee-rtl {
          animation: marquee-rtl 25s linear infinite;
        }

        .marquee-mask {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        @media (max-width: 768px) {
          .animate-marquee-ltr {
            animation-duration: 18s;
          }
          .animate-marquee-rtl {
            animation-duration: 18s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-ltr,
          .animate-marquee-rtl {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default BuildingAIEcosystem;
