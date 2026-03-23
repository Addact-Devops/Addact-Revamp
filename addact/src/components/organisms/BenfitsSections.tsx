"use client";

import { Fragment } from "react";
import type { AIBenefit } from "@/graphql/queries/getAIService";
import RichText from "../atom/richText";

interface BenefitCardProps {
  number: number;
  title: string;
  description: string;
}

const BENEFITS: BenefitCardProps[] = [
  {
    number: 1,
    title: "Reduced Operational Costs",
    description:
      "Our skilled CMS experts bring deep platform knowledge to deliver powerful, scalable, and high-performing CMS deliverables.",
  },
  {
    number: 2,
    title: "Intelligent Process Automation",
    description:
      "Our skilled CMS experts bring deep platform knowledge to deliver powerful, scalable, and high-performing CMS deliverables.",
  },
  {
    number: 3,
    title: "Faster Data-Driven Decisions",
    description:
      "Our skilled CMS experts bring deep platform knowledge to deliver powerful, scalable, and high-performing CMS deliverables.",
  },
  {
    number: 4,
    title: "Personalized Customer Experiences",
    description:
      "Our skilled CMS experts bring deep platform knowledge to deliver powerful, scalable, and high-performing CMS deliverables.",
  },
  {
    number: 5,
    title: "Advanced Predictive Insights",
    description:
      "Our skilled CMS experts bring deep platform knowledge to deliver powerful, scalable, and high-performing CMS deliverables.",
  },
  {
    number: 6,
    title: "Sustainable Competitive Advantage",
    description:
      "Our skilled CMS experts bring deep platform knowledge to deliver powerful, scalable, and high-performing CMS deliverables.",
  },
];

const SECTION_HEADING = "AI Benefits for Businesses:";

interface BenefitsSectionProps {
  data?: AIBenefit | null;
}

export function BenefitCard({ number, title, description }: BenefitCardProps) {
  return (
    <div
      className={`flex flex-col gap-[18px] w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-14px)]! rounded-[10px] p-[30px] border border-solid transition-all duration-200 ease-in-out cursor-default border-[rgba(15,15,15,0.2)] bg-white shadow-none`}
    >
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center w-[44px] h-[50px] md:w-[52px] md:h-[88px] xl:min-w-[60px]! xl:h-[107px]! rounded-[10px] bg-[#3C4CFF] shrink-0">
          <span className="font-['Montserrat',sans-serif] font-semibold text-2xl leading-[34px] text-white select-none">
            {String(number).padStart(2, "0")}
          </span>
        </div>

        <h2 className="font-['Montserrat',sans-serif] font-semibold! text-[18px]! leading-[28px] md:text-[22px] md:leading-[34px] lg:text-[24px]! lg:leading-[38px]! xl:text-[30px]! xl:leading-[45px]! text-[#0f0f0f] m-0 pt-1 max-w-[374px] w-full">
          {title}
        </h2>
      </div>

      <div className="font-['Montserrat',sans-serif] font-normal [&_p]:text-[20px] [&_p]:leading-[34px] text-[#0f0f0f] m-0">
        <RichText html={description} />
      </div>
    </div>
  );
}

export default function BenefitsSection({ data }: BenefitsSectionProps) {
  const dynamicBenefits =
    data?.serviceList
      ?.map((item, index) => ({
        number: index + 1,
        title: item?.listingContext?.title || "",
        description: item?.listingContext?.description || "",
      }))
      .filter((item) => item.title || item.description) ?? [];

  const benefitsToRender = dynamicBenefits.length ? dynamicBenefits : BENEFITS;

  return (
    <Fragment>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap"
        rel="stylesheet"
      />

      <section className="bg-white w-full box-border px-4 py-10 md:px-10 md:py-14 xl:px-[160px]! xl:py-20!">
        <h2 className="font-['Montserrat',sans-serif] font-semibold! text-[#0f0f0f] m-0 text-[28px] leading-[38px] md:text-[40px] md:leading-[56px] xl:text-[60px]! xl:leading-[85px]! mb-8 lg:mb-[50px]!">
          {data?.title || SECTION_HEADING}
        </h2>

        <div className="flex flex-wrap gap-4 lg:gap-5!">
          {benefitsToRender.map((benefit) => (
            <BenefitCard
              key={benefit.number}
              number={benefit.number}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </section>
    </Fragment>
  );
}
