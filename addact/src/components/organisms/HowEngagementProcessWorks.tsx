"use client";

import Link from "next/link";

interface EngagementProcessCard {
  id: string;
  step: string;
  title: string;
  description: string;
}

interface HowEngagementProcessWorksProps {
  title?: string;
  cards?: EngagementProcessCard[];
}

const staticCards: EngagementProcessCard[] = [
  {
    id: "1",
    step: "01",
    title: "Share your Requirements",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution.",
  },
  {
    id: "2",
    step: "02",
    title: "Identify Suitable Candidates",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution.",
  },
  {
    id: "3",
    step: "03",
    title: "Conduct Interviews",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution.",
  },
  {
    id: "4",
    step: "04",
    title: "Resource Onboarding and Kick-off",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution.",
  },
];

const CARD_COUNT = 4;

const HowEngagementProcessWorks = ({
  title = "How our engagement process works",
  cards,
}: HowEngagementProcessWorksProps) => {
  const incomingCards = cards?.slice(0, CARD_COUNT) ?? [];
  const resolvedCards = [
    ...incomingCards,
    ...staticCards.slice(incomingCards.length, CARD_COUNT),
  ].slice(0, CARD_COUNT);

  return (
    <section className="bg-[#0F0F0F] py-[72px] md:py-[88px] xl:py-[110px]">
      <div className="container-main">
        <div className="flex justify-between items-center">
          <h2 className="mb-10 max-w-[660px] !text-[34px] !font-semibold !leading-[1.22] text-white md:mb-14 md:!text-[48px] lg:!text-[56px]">
            {title}
          </h2>
          <Link
            href={"#"}
            target={"_self"}
            className="px-4 py-2.5 sm:px-5 sm:py-3 md:py-4 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] inline-flex justify-center items-center gap-2 sm:gap-3 md:gap-4 xl:gap-5 overflow-hidden bg-white hover:bg-[#3C4CFF] transition-colors flex-shrink-0 group"
          >
            <span className="text-[#0F0F0F] text-sm sm:text-base md:text-lg font-semibold font-montserrat leading-5 sm:leading-6 md:leading-7 whitespace-nowrap group-hover:text-white">
              {"Contact Us"}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 sm:w-5 sm:h-5 stroke-[#0F0F0F] group-hover:stroke-white transition-colors"
            >
              <path
                d="M4.16699 10H15.8337M15.8337 10L10.0003 4.16669M15.8337 10L10.0003 15.8334"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-4 lg:justify-items-stretch lg:gap-5">
          {resolvedCards.map((card) => (
            <article
              key={card.id}
              className={[
                "group relative w-full max-w-[375px] overflow-hidden rounded-[8px] border border-[#222429] px-5 pb-5 pt-4 transition-all duration-300",
                "bg-[#07080B] hover:border-[#4A57FF] hover:bg-[linear-gradient(135deg,_#4A57FF_0%,_#3C4CFF_100%)]",
              ].join(" ")}
            >
              <span className="pointer-events-none absolute right-4 top-2 !text-[54px] !font-semibold !leading-none text-[#23262D] transition-colors duration-300 group-hover:text-[#6E79FF]">
                {card.step}
              </span>

              <div className="relative z-[1] mt-16">
                <h3 className="mb-3 min-h-[64px] !text-[30px] !font-semibold !leading-[1.35] text-[#E8EAEE] transition-colors duration-300 group-hover:text-white">
                  {card.title}
                </h3>
                <p className="!text-[22px] !leading-[1.8] text-[#A7ACB4] transition-colors duration-300 group-hover:text-[#EEF1FF]">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowEngagementProcessWorks;
