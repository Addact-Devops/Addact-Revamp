"use client";
import React, { useState, useEffect, FC } from "react";
import Cubes from "./CubeAnimation";

interface AccordionItem {
  id: number;
  number: string;
  title: string;
  description: string;
}

interface AccordionItemProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

const PROCESS_ITEMS: AccordionItem[] = [
  {
    id: 1,
    number: "1.",
    title: "AI Opportunity Discovery",
    description:
      "We analyze your business processes and goals to identify the best opportunities where AI can create real value and improve efficiency.",
  },
  {
    id: 2,
    number: "2.",
    title: "Data Assessment",
    description:
      "We evaluate your existing data assets, quality, and infrastructure to determine readiness and build a solid foundation for AI models.",
  },
  {
    id: 3,
    number: "3.",
    title: "Model Development",
    description:
      "Our team designs, trains, and fine-tunes AI models tailored to your specific use case, ensuring accuracy and performance at scale.",
  },
  {
    id: 4,
    number: "4.",
    title: "Integration & Deployment",
    description:
      "We seamlessly integrate AI solutions into your existing workflows and systems, deploying with minimal disruption to your operations.",
  },
  {
    id: 5,
    number: "5.",
    title: "Monitoring & Optimization",
    description:
      "Continuous performance monitoring, model retraining, and iterative improvements keep your AI systems accurate and effective over time.",
  },
];

const AccordionRow: FC<AccordionItemProps> = ({
  item,
  isOpen,
  onToggle,
  isMobile,
}) => {
  const interactionProps = isMobile
    ? { onClick: onToggle }
    : {
        onMouseEnter: onToggle,
      };

  return (
    <div
      {...interactionProps}
      className={`border-b border-white/15 cursor-pointer group ${isOpen ? "py-4 md:py-5" : ""}`}
    >
      <div
        className={`flex items-center gap-3  ${isOpen ? "" : "py-4 md:py-5"}`}
      >
        <span className="text-white text-base md:text-lg lg:!text-3xl font-medium !leading-tight">
          {item.number}&nbsp;{item.title}
        </span>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 opacity-100 pl-[20px] lg:pl-[35px] pt-2" : "max-h-0 opacity-0"}`}
      >
        <p className="text-white/50 text-sm md:text-[15px] lg:text-xl! leading-relaxed font-normal">
          {item.description}
        </p>
      </div>
    </div>
  );
};

const AIDevelopmentProcess: FC = () => {
  const [openId, setOpenId] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = (id: number): void => {
    if (isMobile) {
      setOpenId((prev) => (prev === id ? 0 : id));
    } else {
      setOpenId(id);
    }
  };

  return (
    <section className="w-full bg-[#0F0F0F]">
      <div className="container-main mx-auto flex flex-col min-h-screen px-6 py-10 md:px-12 md:py-16 lg:px-20! lg:py-24! xl:py-40!">
        <h1 className="text-3xl md:text-5xl lg:text-6xl! font-bold! text-white tracking-tight mb-10 md:mb-14 xl:mb-20!">
          AI Development Process
        </h1>

        <div className="flex flex-col lg:flex-row! gap-10 lg:gap-8 flex-1 items-start">
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="border-t border-white/15">
              {PROCESS_ITEMS.map((item) => (
                <AccordionRow
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => handleToggle(item.id)}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex items-start justify-center lg:justify-end">
            <div className="w-full max-w-[520px] aspect-square overflow-hidden ">
              <Cubes
                gridSize={9}
                borderStyle="2px dotted #fff"
                faceColor="#0d0d1a"
                rippleColor="#ffffff"
                autoAnimate={true}
                rippleOnClick={true}
                maxAngle={45}
                radius={3}
                rippleSpeed={2}
                shadow={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDevelopmentProcess;
