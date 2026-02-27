"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "@/styles/components/whoweare.scss";
import { getWhoAreWe, WhoAreWeResponse } from "@/graphql/queries/whoAreWe";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import RichText from "../atom/richText";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import TechReveal from "../atom/TechReveal";

const NeuralParticles = dynamic(() => import("../atom/NeuralParticles"), { ssr: false });
gsap.registerPlugin(ScrollTrigger);
const WhoWeAre = () => {
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [data, setData] = useState<WhoAreWeResponse>();
  const counterSectionRef = useRef<HTMLDivElement>(null);
  const counterSuffixes = useMemo(() => ["%", "+", "", "+"], []); // order matches data?.whoAreWes[0].Counter
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    (async () => {
      const res = await getWhoAreWe();
      setData(res);
    })();
  }, []);
  useEffect(() => {
    if (!containerRef.current) return;
    const wordCount = document.querySelectorAll(".word").length;
    const baseHeight = window.innerWidth < 768 ? 27 : 1;
    const minHeight = wordCount * baseHeight;
    containerRef.current.style.minHeight = `${minHeight}px`;
  }, []);

  // Animate counters
  const animateCount = (
    el: HTMLDivElement,
    target: number,
    suffix: string = "",
    duration: number = 2000,
  ) => {
    let start = 0;
    const interval = 30; // ms
    const steps = Math.max(1, Math.floor(duration / interval));
    const increment = target / steps;

    const isFractional = !Number.isInteger(target);
    const intTarget = Math.floor(target);

    const formatFinal = (num: number) => {
      const decimals =
        num % 1 !== 0 ? num.toString().split(".")[1]?.length || 0 : 0;
      return decimals > 0 ? num.toFixed(decimals) : `${num}`;
    };

    const timer = setInterval(() => {
      start += increment;

      if (start >= target) {
        el.innerText = `${formatFinal(target)}${suffix}`;
        clearInterval(timer);
        return;
      }

      let display: number;
      if (isFractional) {
        // 1,2,3,4 ... then final 4.9
        display = Math.min(Math.floor(start), intTarget);
      } else {
        // 1..N (never exceeding target)
        display = Math.min(Math.ceil(start), target);
      }
      el.innerText = `${display}${suffix}`;
    }, interval);
  };

  useEffect(() => {
    if (!counterSectionRef.current || !data?.whoAreWes[0]?.Counter) return;

    const trigger = ScrollTrigger.create({
      trigger: counterSectionRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        numberRefs.current.forEach((ref, i) => {
          const item = data.whoAreWes[0].Counter[i];
          if (ref && item) {
            animateCount(ref, item.NumberCount, counterSuffixes[i] || "");
          }
        });
      },
    });

    return () => trigger.kill();
  }, [data, counterSuffixes]);

  return (
    <>
      <section
        className="who-we-are my-[80px] lg:my-[100px] 2xl:my-[200px] !mx-h-[100%] !h-[100%] relative overflow-hidden bg-white"
        ref={containerRef}
      >
        <div className="container relative z-20">
          <div className="flex gap-10 md:gap-[40px] 2xl:gap-[100px] flex-wrap lg:flex-nowrap">
            <div className="w-full lg:w-[40%] flex items-center gap-3">
              <motion.h2
                className="text-[28px]! md:text-[40px]! 2xl:text-[60px]! mb-10! leading-tight text-zinc-900 border-after border-black/20 pb-4! xl:pb-10!"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <TechReveal text={data?.whoAreWes[0].Title[0].Title || ""} duration={1.2} />
              </motion.h2>
            </div>

            <div className="relative overflow-hidden w-full text-left large">
              <div className="sticky top-0 flex items-center justify-center">
                <div
                  className={
                    "flex flex-wrap gap-x-[10px] [&_p]:lg:!text-[22px] [&_p]:2xl:!text-[34px] [&_p]:!leading-relaxed [&_p]:text-black font-medium"
                  }
                >
                  <RichText
                    html={data?.whoAreWes[0].Title[0].Description ?? ""}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            ref={counterSectionRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 2xl:gap-6 mt-[40px] md:mt-20 2xl:mt-24"
          >
            {data?.whoAreWes[0].Counter.map((item, index) => {
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white border border-zinc-200 rounded-[16px] p-6 md:p-8 2xl:p-10 transition-all duration-500 hover:border-[#3C4CFF]/60 hover:shadow-[0_40px_80px_-20px_rgba(60,76,255,0.15)] flex flex-col justify-center min-h-[160px] md:min-h-[200px] overflow-hidden"
                >
                  {/* Internal Technical Grid - Moved here & Increased Visibility */}
                  <div 
                    className="absolute inset-0 z-0 opacity-[0.08] group-hover:opacity-[0.14] transition-opacity duration-500 pointer-events-none"
                    style={{ 
                      backgroundImage: `linear-gradient(#3C4CFF 1.5px, transparent 1.5px), linear-gradient(90deg, #3C4CFF 1.5px, transparent 1.5px)`,
                      backgroundSize: '25px 25px'
                    }}
                  />

                  {/* Internal Neural Particles - Moved here */}
                  <div className="absolute inset-0 z-0 opacity-[0.04] group-hover:opacity-[0.1] transition-opacity duration-500 pointer-events-none">
                    <NeuralParticles count={15} color="60, 76, 255" lineColor="60, 76, 255" connectDistance={100} />
                  </div>

                  {/* Subtle Background Glow */}
                  <div className="absolute inset-0 bg-linear-to-br from-[#3C4CFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                   <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <h2
                            className="text-[#3C4CFF] font-extrabold text-3xl md:text-4xl 2xl:text-5xl transition-colors duration-300 text-left"
                            ref={(el) => {
                                numberRefs.current[index] = el;
                            }}
                        >
                            {`0${counterSuffixes[index] || ""}`}
                        </h2>
                    </div>
                    <div className="text-[14px] md:text-[18px] 2xl:text-xl text-left font-bold leading-tight text-zinc-900 group-hover:text-[#3C4CFF] transition-colors duration-300">
                        {item.CounterTitle}
                    </div>
                  </div>

                  {/* Decorative Border Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#3C4CFF] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhoWeAre;
