import { useState } from "react";
import { motion } from "framer-motion";
import { RadialDiagram } from "./RadialDiagram";
import { AccordionItem, AccordionList } from "./AccordionList";

const items: AccordionItem[] = [
  {
    title: "Skilled CMS Developers",
    description:
      "Our CMS specialists bring deep platform expertise to deliver powerful, scalable solutions — from custom content architectures to seamless integrations — that accelerate your digital transformation.",
  },
  {
    title: "Seamless Communication",
    description:
      "We maintain transparent, real-time communication across every stage of your project, ensuring your vision is heard, understood, and brought to life without friction or guesswork.",
  },
  {
    title: "Client-Centric Collaboration",
    description:
      "Your goals are our goals. We embed ourselves as a true partner — listening, adapting, and delivering solutions that keep your business objectives at the absolute forefront.",
  },
  {
    title: "40 Hours of Free Consultancy",
    description:
      "Kickstart your journey with 40 complimentary consulting hours. Our experts assess your needs, map a clear roadmap, and align strategy — before a single line of code is written.",
  },
  {
    title: "Agile & Flexible Engagement Models",
    description:
      "From dedicated teams to sprint-based delivery, we offer engagement models that flex with your budget, timeline, and evolving project requirements — no rigid contracts.",
  },
  {
    title: "Post-Deployment Support",
    description:
      "Our relationship doesn't end at launch. We provide ongoing monitoring, maintenance, and performance optimisation to keep your product running at its best long after go-live.",
  },
];

export default function WhyWorkWithUs() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-white py-12 md:py-20 lg:py-24! relative overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 md:px-10 lg:px-20! xl:px-32! max-w-[1920px]">
        <div className="flex flex-col-reverse xl:flex-row! lg:items-start! items-center gap-8 md:gap-12 lg:gap-16! xl:gap-20!">
          {/* Radial Diagram - responsive positioning */}
          <motion.div
            className="shrink-0 w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]! xl:max-w-[900px]! 2xl:max-w-[1057px]! aspect-square xl:absolute! lg:-left-20! xl:-left-44! lg:-top-20!"
            style={{ aspectRatio: "1057/1091" }}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <RadialDiagram
              activeIndex={activeIndex}
              onSpokeClick={setActiveIndex}
            />
          </motion.div>

          {/* Content - responsive margins */}
          <div className="flex-1 w-full min-w-0 xl:ml-auto! lg:max-w-full! xl:max-w-[400px] 2xl:max-w-[900px]! lg:pl-8! xl:pl-12!">
            <motion.h2
              className="justify-start text-stone-950 text-2xl md:text-3xl lg:text-6xl! font-semibold! font-['Montserrat'] leading-[85px] mb-10"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Why work with us
            </motion.h2>

            <AccordionList
              items={items}
              activeIndex={activeIndex}
              onItemClick={setActiveIndex}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
