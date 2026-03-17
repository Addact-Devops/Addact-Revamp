"use client";
import React, { useState, useEffect, FC, useMemo } from "react";
import Cubes from "./CubeAnimation";
import RichText from "../atom/richText";
import type { OurProcess } from "@/graphql/queries/getAIService";

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
        <div className="text-white/50 text-sm md:text-[15px] lg:text-xl! leading-relaxed font-normal">
          <RichText html={item.description || ""} />
        </div>
      </div>
    </div>
  );
};

interface AIDevelopmentProcessProps {
  data?: OurProcess | null;
}

const AIDevelopmentProcess: FC<AIDevelopmentProcessProps> = ({ data }) => {
  const processItems: AccordionItem[] = useMemo(
    () =>
      data?.ProcessData?.map((item, index) => ({
        id: index + 1,
        number: `${index + 1}.`,
        title: item?.Title || "",
        description: item?.Description || "",
      })).filter((item) => item.title || item.description) ?? [],
    [data?.ProcessData],
  );

  const sectionTitle = useMemo(
    () =>
      data?.Title?.map(
        (heading) =>
          heading?.h1 ||
          heading?.h2 ||
          heading?.h3 ||
          heading?.h4 ||
          heading?.h5 ||
          heading?.h6 ||
          "",
      ).find(Boolean) || "",
    [data?.Title],
  );

  const [openId, setOpenId] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (!processItems.length) {
      setOpenId(0);
      return;
    }
    if (!processItems.some((item) => item.id === openId)) {
      setOpenId(processItems[0].id);
    }
  }, [processItems, openId]);

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
          {sectionTitle}
        </h1>

        <div className="flex flex-col lg:flex-row! gap-10 lg:gap-8 flex-1 items-start">
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="border-t border-white/15">
              {processItems.map((item) => (
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
