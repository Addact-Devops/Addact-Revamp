"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { RadialDiagram } from "./RadialDiagram";
import { AccordionItem, AccordionList } from "./AccordionList";
import RichText from "../atom/richText";
import type { Whyaddact } from "@/graphql/queries/getHomePage";

interface WhyWorkWithUsProps {
  data: Whyaddact;
}

export default function WhyWorkWithUs({ data }: WhyWorkWithUsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileCardIndex, setMobileCardIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Transform API data to AccordionItem format
  const items: AccordionItem[] =
    data?.GlobalCard?.map((card) => ({
      title: card.Title,
      description: card.Description,
      image: card.Image,
    })) || [];

  const heading = data?.Title?.[0]?.h2 || "Why work with us";

  if (!items || items.length === 0) {
    return null;
  }

  // Update active index when mobile card changes
  const handleMobileCardChange = (index: number) => {
    setMobileCardIndex(index);
    setActiveIndex(index);
  };

  return (
    <section className="bg-white py-12 md:py-20 lg:py-24! relative overflow-hidden">
      {/* Mobile View - Cards + Non-clickable SVG */}
      <div className="block lg:hidden">
        <div className="px-6 pb-64 md:pb-72">
          <h2 className="text-stone-950 text-[26px] !font-semibold font-['Montserrat'] leading-normal mb-8">
            {heading}
          </h2>

          {/* Carousel - One card at a time */}
          <div className="relative" ref={containerRef}>
            <div className="overflow-hidden">
              <motion.div
                className="flex cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={containerRef}
                dragElastic={0.1}
                onDragEnd={(e, { offset }) => {
                  const cardWidth = containerRef.current?.offsetWidth || 0;
                  const threshold = cardWidth * 0.2; // 20% swipe threshold

                  if (
                    offset.x < -threshold &&
                    mobileCardIndex < items.length - 1
                  ) {
                    // Swiped left - go to next card
                    handleMobileCardChange(mobileCardIndex + 1);
                  } else if (offset.x > threshold && mobileCardIndex > 0) {
                    // Swiped right - go to previous card
                    handleMobileCardChange(mobileCardIndex - 1);
                  }
                }}
                animate={{ x: `-${mobileCardIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white border border-black/10 rounded-[10px] p-5 w-full shrink-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-stone-950 text-[20px] font-medium font-['Montserrat'] leading-8">
                        {item?.title}
                      </h3>
                    </div>
                    {item?.description && (
                      <div className="text-stone-950 text-sm font-normal font-['Montserrat'] leading-[1.7]">
                        <RichText html={item?.description} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleMobileCardChange(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === mobileCardIndex
                      ? "bg-[#3C4CFF] w-8"
                      : "bg-black/20"
                  }`}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Non-clickable SVG Diagram - synced with card index - Half cut at bottom */}
          <div
            className="absolute -bottom-[260px] md:-bottom-[305px] left-1/2 -translate-x-1/2 w-[500px] md:w-[600px]"
            style={{ pointerEvents: "none" }}
          >
            <div style={{ aspectRatio: "1057/1091" }}>
              <RadialDiagram
                activeIndex={activeIndex}
                onSpokeClick={() => {}} // No-op for mobile
                mobileRotateOnly="270deg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View - Original Layout */}
      <div className="hidden lg:block">
        <div className="mx-auto max-w-[1920px] pl-0 pr-6 lg:pr-10 xl:pr-16 2xl:pr-24">
          <div className="grid grid-cols-12 items-center gap-8 xl:gap-12 2xl:gap-16">
            {/* Radial Diagram */}
            <motion.div
              className="col-span-6 self-center"
              style={{ aspectRatio: "1057/1091" }}
            >
              <div className="w-full max-w-[700px] xl:max-w-[860px] 2xl:max-w-[1020px]">
                <RadialDiagram
                  activeIndex={activeIndex}
                  onSpokeClick={setActiveIndex}
                />
              </div>
            </motion.div>

            {/* Content */}
            <div className="col-span-6 self-center w-full min-w-0">
              <motion.h2
                className="mb-8 text-stone-950 text-4xl xl:text-5xl 2xl:text-6xl !font-semibold font-['Montserrat'] leading-tight"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {heading}
              </motion.h2>

              <AccordionList
                items={items}
                activeIndex={activeIndex}
                onItemClick={setActiveIndex}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
