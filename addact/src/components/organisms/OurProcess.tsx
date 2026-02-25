"use client";

import { useRef, useState } from "react";
import { OurProcessData } from "@/graphql/queries/getOurProcess";
import { 
  motion, 
  useScroll, 
  useMotionValueEvent, 
  AnimatePresence 
} from "framer-motion";
import dynamic from "next/dynamic";
import TechReveal from "../atom/TechReveal";

const NeuralParticles = dynamic(() => import("../atom/NeuralParticles"), { ssr: false });

export default function OurProcess(props: {
  data?: OurProcessData["home"]["ourprocess"];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const data = props.data;
  const processData = data?.ProcessData || [];

  const totalSteps = processData.length;
  // Dynamic height based on number of steps (e.g., 60vh per step)
  const sectionHeight = `${totalSteps * 60}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (totalSteps <= 1) return;
    const step = Math.min(
      Math.floor(latest * totalSteps),
      totalSteps - 1
    );
    if (step !== activeStep && step >= 0) {
      setActiveStep(step);
    }
  });

  if (processData.length === 0) return null;

  const getTitle = () => {
    const title = data?.Title?.[0];
    return (
      title?.h1 ||
      title?.h2 ||
      title?.h3 ||
      title?.h4 ||
      title?.h5 ||
      title?.h6 ||
      ""
    );
  };

  return (
    <section 
      ref={containerRef} 
      className="relative bg-white"
      style={{ height: sectionHeight }}
    >
      {/* Sticky Content Wrapper */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]">
          <NeuralParticles count={30} color="60, 76, 255" lineColor="60, 76, 255" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          
          {/* Top Header Section */}
          {getTitle() && (
            <div className="mb-12 md:mb-20">
              <div className="max-w-4xl">
                <h2 className="text-[32px] md:text-[60px] lg:text-7xl font-black text-black tracking-tight leading-[1.1] mb-2 md:mb-4 uppercase">
                  <TechReveal text={getTitle()} duration={1.2} />
                </h2>
              </div>
            </div>
          )}

          {/* Main Grid: Sidebar + Single Card Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Sidebar: Fixed Menu */}
            <aside className="lg:col-span-4 hidden lg:block border-l border-zinc-100 pl-10">
              <div className="space-y-10 relative">
                {processData.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={idx}
                      className="relative flex items-center w-full group transition-all text-left cursor-default pointer-events-none"
                    >
                      {/* Active Indicator Bar */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div 
                            layoutId="activeBar"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute left-[-41px] w-1.5 h-full bg-brand-blue"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </AnimatePresence>
                      
                      <span className={`text-sm xl:text-base font-bold uppercase tracking-[0.2em] transition-all duration-300 ${isActive ? "text-black translate-x-1" : "text-zinc-300"}`}>
                        {step.Title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Right Section: Animated Single Card Overlay */}
            <div className="lg:col-span-8 relative min-h-[450px] md:min-h-[400px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <div className="bg-white rounded-[32px] md:rounded-[40px] border border-zinc-100 p-6 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-shadow duration-500">
                    <div className="space-y-6 md:space-y-10">
                      {/* Title Block */}
                      <div className="space-y-4 md:space-y-6">
                        <h3 className="text-2xl md:text-5xl lg:text-7xl font-black text-black leading-tight tracking-tighter">
                          {processData[activeStep]?.Title}
                        </h3>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          className="h-1 bg-brand-blue max-w-[150px] md:max-w-[300px]"
                        />
                      </div>

                      {/* Description Text */}
                      <div 
                        className="text-zinc-500 text-[15px] md:text-2xl lg:text-3xl leading-relaxed font-medium"
                        dangerouslySetInnerHTML={{ __html: processData[activeStep]?.Description }}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Mobile View Progress Bar */}
        <div className="absolute top-[15%] left-0 right-0 lg:hidden px-6">
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 border-b border-zinc-100">
            {processData.map((step, idx) => (
                <div
                    key={idx}
                    className={`shrink-0 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeStep === idx ? "text-brand-blue" : "text-zinc-300"}`}
                >
                    {(idx + 1).toString().padStart(2, '0')}. {step.Title}
                </div>
            ))}
          </div>
        </div>

        {/* Mobile Bottom Dot Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 lg:hidden flex gap-2">
            {processData.map((_, idx) => (
                <div 
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeStep === idx ? "w-8 bg-brand-blue" : "w-1.5 bg-zinc-200"}`}
                />
            ))}
        </div>

      </div>
    </section>
  );
}
