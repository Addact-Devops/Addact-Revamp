"use client";

import Link from "next/link";
import RichText from "../atom/richText";
import {
  openContactDrawer,
  shouldOpenContactDrawer,
} from "@/lib/contactDrawer";

interface ServiceCardProps {
  title: string;
  description: string;
  href?: string;
  target?: string;
  isExternal?: boolean;
}

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  href?: string;
  target?: string;
  isExternal?: boolean;
}

const SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: "AI Consulting & Strategy",
    description:
      "Our skilled CMS experts bring deep platform knowledge to deliver powerful, scalable, and high-performing CMS deliverables.",
  },
  {
    id: 2,
    title: "Generative AI Solutions",
    description:
      "Our skilled CMS experts bring deep platform knowledge to deliver powerful, scalable, and high-performing CMS deliverables.",
  },
  {
    id: 3,
    title: "Machine Learning Development",
    description:
      "Our skilled CMS experts bring deep platform knowledge to deliver powerful, scalable, and high-performing CMS deliverables.",
  },
  {
    id: 4,
    title: "AI Chatbot Development",
    description:
      "Our skilled CMS experts bring deep platform knowledge to deliver powerful, scalable, and high-performing CMS deliverables.",
  },
  {
    id: 5,
    title: "AI Integration",
    description:
      "Our skilled CMS experts bring deep platform knowledge to deliver powerful, scalable, and high-performing CMS deliverables.",
  },
  {
    id: 6,
    title: "Natural Language Processing (NLP)",
    description:
      "Our skilled CMS experts bring deep platform knowledge to deliver powerful, scalable, and high-performing CMS deliverables.",
  },
  {
    id: 7,
    title: "AI Automation",
    description:
      "Our skilled CMS experts bring deep platform knowledge to deliver powerful, scalable, and high-performing CMS deliverables.",
  },
];

const SECTION_HEADING = "Service We Are Providing";
const SECTION_DESCRIPTION =
  "With our rich and long-standing experience in development and design services, we have been successfully delivering experiences that are mature, meaningful.";
const CTA_LABEL = "Get a free AI Consultation";

const NAVBAR_HEIGHT = 80;

interface ServicesSectionProps {
  data?: ServiceSectionData | ServiceSectionData[] | null;
}

type ListingContextItem = {
  title?: string;
  description?: string;
  link?: {
    href?: string;
    label?: string | null;
    target?: string | null;
    isExternal?: boolean;
  } | null;
};

type ServiceSectionData = {
  listingContext?: ListingContextItem | ListingContextItem[] | null;
  serviceTitle?: string;
  serviceList?: {
    listingContext?: {
      id?: string | number;
      title?: string;
      description?: string;
      link?: {
        href?: string;
        target?: string | null;
        isExternal?: boolean;
      } | null;
    } | null;
  }[];
};

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export function ServiceCard({
  title,
  description,
  href,
  target,
  isExternal,
}: ServiceCardProps) {
  return (
    <Link
      href={href || "#"}
      target={isExternal ? "_blank" : `_${target}` || "_self"}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group block w-full rounded-[10px] border border-solid border-[rgba(15,15,15,0.2)] bg-white p-[30px] cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#3C4CFF] hover:border-[#3C4CFF] hover:shadow-[0_4px_20px_rgba(60,76,255,0.12)]"
    >
      <div className="flex items-center justify-between gap-3 mb-5">
        <h3 className="font-['Montserrat',sans-serif] font-semibold! text-[18px]! leading-[28px] md:text-[20px] md:leading-[30px]! xl:text-[30px]! xl:leading-[36px]! m-0 text-[#0f0f0f] group-hover:text-white transition-colors duration-200">
          {title}
        </h3>
        <ArrowUpRight className="w-6 h-6 shrink-0 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>

      <div className="font-['Montserrat',sans-serif] font-normal text-[14px] leading-[22px] md:text-[16px] md:leading-[26px]! xl:text-[20px]! xl:leading-[28px]! m-0 text-[#0f0f0f] group-hover:text-white/90 transition-colors duration-200">
        <RichText html={description} />
      </div>
    </Link>
  );
}

export default function ServicesSection({ data }: ServicesSectionProps) {
  const normalizedData = data ? (Array.isArray(data) ? data : [data]) : [];

  const primaryData = normalizedData[0];
  const baseListingContext = primaryData?.listingContext;
  const firstListingContext = Array.isArray(baseListingContext)
    ? baseListingContext[0]
    : baseListingContext;

  const dynamicServices =
    primaryData?.serviceList
      ?.map((service, index) => ({
        id: Number(service?.listingContext?.id) || index + 1,
        title: service?.listingContext?.title || "",
        description: service?.listingContext?.description || "",
        href: service?.listingContext?.link?.href || "",
        target: service?.listingContext?.link?.target || "_self",
        isExternal: service?.listingContext?.link?.isExternal || false,
      }))
      .filter((service) => service.title || service.description) ?? [];

  const servicesToRender = dynamicServices.length ? dynamicServices : SERVICES;
  const sectionHeading =
    firstListingContext?.title || primaryData?.serviceTitle || SECTION_HEADING;
  const sectionDescription =
    firstListingContext?.description || SECTION_DESCRIPTION;
  const ctaLabel = firstListingContext?.link?.label || CTA_LABEL;
  const ctaHref = firstListingContext?.link?.href || "#";
  const ctaTarget = firstListingContext?.link?.target || "_self";
  const ctaIsExternal = firstListingContext?.link?.isExternal || false;
  const useContactDrawer = !ctaIsExternal && shouldOpenContactDrawer(ctaHref);

  const handleServicesCtaClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!useContactDrawer) {
      return;
    }

    event.preventDefault();
    openContactDrawer();
  };

  return (
    <>
      <section className="bg-white w-full box-border px-4 py-10 md:px-10 md:py-16 lg:hidden!">
        <div className="flex flex-col gap-6 mb-8">
          <h2 className="font-['Montserrat',sans-serif] font-semibold! text-[#0f0f0f] m-0 text-[28px] leading-[38px] md:text-[40px]! md:leading-[52px]!">
            {sectionHeading}
          </h2>
          <p className="font-['Montserrat',sans-serif] font-normal text-[#0f0f0f] text-[14px] leading-[22px] md:text-[16px]! md:leading-[28px]! m-0">
            {sectionDescription}
          </p>
          {useContactDrawer ? (
            <button
              type="button"
              onClick={handleServicesCtaClick}
              className="flex items-center gap-2 bg-[#3C4CFF] text-white font-['Montserrat',sans-serif] font-semibold! text-[14px] md:text-[16px]! px-6 py-3 md:px-8! md:py-4! rounded-[6px] w-fit hover:opacity-90 transition-opacity duration-200 cursor-pointer border-none"
            >
              {ctaLabel}
              <ArrowUpRight className="w-4 h-4" />
            </button>
          ) : (
            <Link
              href={ctaHref}
              target={ctaIsExternal ? "_blank" : ctaTarget}
              rel={ctaIsExternal ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 bg-[#3C4CFF] text-white font-['Montserrat',sans-serif] font-semibold! text-[14px] md:text-[16px]! px-6 py-3 md:px-8! md:py-4! rounded-[6px] w-fit hover:opacity-90 transition-opacity duration-200 cursor-pointer border-none"
            >
              {ctaLabel}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-3">
          {servicesToRender.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              href={service.href}
              target={service.target}
              isExternal={service.isExternal}
            />
          ))}
        </div>
      </section>

      <div className="items-start justify-between px-10 xl:px-[160px]! bg-white hidden lg:flex!">
        <div
          className="sticky self-start shrink-0 w-[38%] xl:w-[653px]! flex flex-col gap-8 pt-[80px] pb-[80px]"
          style={{ top: `${NAVBAR_HEIGHT}px` }}
        >
          <h2 className="font-['Montserrat',sans-serif] font-semibold! text-[#0f0f0f] m-0 text-[32px] leading-[44px] xl:text-[60px]! xl:leading-[85px]!">
            {sectionHeading}
          </h2>
          <p className="font-['Montserrat',sans-serif] font-normal text-[#0f0f0f] text-[15px] leading-[26px] xl:text-[20px]! xl:leading-[34px]! m-0 xl:pr-15!">
            {sectionDescription}
          </p>
          {useContactDrawer ? (
            <button
              type="button"
              onClick={handleServicesCtaClick}
              className="flex items-center gap-2 bg-[#3C4CFF] text-white font-['Montserrat',sans-serif] font-semibold! text-[14px] xl:text-[16px]! px-7 py-4 rounded-[6px] w-fit hover:opacity-90 transition-opacity duration-200 cursor-pointer border-none"
            >
              {ctaLabel}
              <ArrowUpRight className="w-5 h-5" />
            </button>
          ) : (
            <Link
              href={ctaHref}
              target={ctaIsExternal ? "_blank" : ctaTarget}
              rel={ctaIsExternal ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 bg-[#3C4CFF] text-white font-['Montserrat',sans-serif] font-semibold! text-[14px] xl:text-[16px]! px-7 py-4 rounded-[6px] w-fit hover:opacity-90 transition-opacity duration-200 cursor-pointer border-none"
            >
              {ctaLabel}
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-[10px] w-[49%] xl:w-[788px]! py-[80px]">
          {servicesToRender.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              href={service.href}
              target={service.target}
              isExternal={service.isExternal}
            />
          ))}
        </div>
      </div>
    </>
  );
}
