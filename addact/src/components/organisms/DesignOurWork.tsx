import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import type { OurWork } from "@/graphql/queries/getDevelopmentDesignSlug";
import Image from "../atom/image";

const projectsData = [
  {
    id: 1,
    title: "Law Firm",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution. At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution and digital transformation.",
    tags: ["Law firm", "Legal Tech", "AI"],
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
  },
  {
    id: 2,
    title: "HealthCare",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution. At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution and digital transformation.",
    tags: ["Healthcare", "MedTech", "AI"],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
  },
  {
    id: 3,
    title: "FinTech",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution. At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution and digital transformation.",
    tags: ["Finance", "FinTech", "Banking"],
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
  },
  {
    id: 4,
    title: "E-Commerce",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution. At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution and digital transformation.",
    tags: ["Retail", "E-Commerce", "AI"],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
  },
  {
    id: 5,
    title: "Real Estate",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution. At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution and digital transformation.",
    tags: ["PropTech", "Real Estate", "AI"],
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  },
];

export default function OurWork({ data }: { data?: OurWork | null }) {
  const dynamicProjects =
    data?.serviceList?.map((item, index) => ({
      id: item.listingContext?.id ?? index + 1,
      title: item.listingContext?.title ?? "Untitled Project",
      description: item.listingContext?.description ?? "",
      tags: item.tagLine?.map((tag) => tag.Title).filter(Boolean) ?? [],
      image:
        item.listingContext?.image?.url ??
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
    })) ?? [];

  const projects = dynamicProjects.length > 0 ? dynamicProjects : projectsData;
  const heading = data?.serviceTitle ?? "Our work";

  return (
    <section className="bg-[#0f0f0f] w-full py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="container-main mb-10 md:mb-14">
        <h2 className="!text-[36px] md:!text-[48px] lg:!text-[60px] !font-semibold text-white font-[Montserrat,sans-serif] capitalize leading-tight">
          {heading}
        </h2>
      </div>

      <div className="relative w-full">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[15%] bg-gradient-to-r from-[#0f0f0f] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[15%] bg-gradient-to-l from-[#0f0f0f] to-transparent" />

        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Navigation]}
          className="our-work-swiper"
        >
          {projects &&
            projects?.length > 0 &&
            projects?.map((project) => (
              <SwiperSlide
                key={project.id}
                className="!w-[300px] sm:!w-[480px] md:!w-[640px] lg:!w-[800px] xl:!w-[900px]"
              >
                <div className="border border-white/30 rounded-[10px] bg-transparent overflow-hidden flex flex-col md:flex-row h-[480px] sm:h-[440px] md:h-[340px] lg:h-[380px] xl:h-[418px]">
                  <div
                    className="shrink-0 w-full md:w-[42%] lg:w-[40%] xl:w-[38%]
                             pt-[20px] pl-[20px] pb-[20px]
                             md:pt-[40px] md:pl-[40px] md:pb-[40px]
                             h-[200px] sm:h-[220px] md:h-full"
                  >
                    <div className="w-full h-full rounded-[8px] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 md:gap-4 p-5 md:p-6 lg:p-8 flex-1 justify-center min-w-0">
                    <div className="flex flex-col gap-2">
                      <h3 className="!text-[20px] sm:!text-[24px] md:!text-[26px] lg:!text-[28px] xl:!text-[30px] !font-semibold text-white font-[Montserrat,sans-serif] leading-tight">
                        {project.title}
                      </h3>
                      <p className="!text-[12px] sm:!text-[13px] md:!text-[14px] lg:!text-[16px] xl:!text-[20px] !font-normal text-white font-[Montserrat,sans-serif] leading-[1.65] line-clamp-6">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-white text-white px-3 py-[6px] rounded-[10px] !text-[11px] md:!text-[13px] lg:!text-[14px] !font-medium font-[Montserrat,sans-serif] whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
}
