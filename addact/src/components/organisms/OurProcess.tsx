"use client";

import { useRef, useEffect, useState } from "react";
import { OurProcessData } from "@/graphql/queries/getOurProcess";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import TechReveal from "../atom/TechReveal";

import { 
  ClipboardList, 
  Paintbrush, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  Settings
} from "lucide-react";

const NeuralParticles = dynamic(() => import("../atom/NeuralParticles"), { ssr: false });

const stepIcons = [
  ClipboardList,
  Paintbrush,
  Code2,
  ShieldCheck,
  Rocket,
  Settings
];

export default function OurProcess(props: {
  data?: OurProcessData["home"]["ourprocess"];
}) {
  const [data, setData] = useState<OurProcessData["home"]["ourprocess"]>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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

  const processData = data?.ProcessData || [];

  return (
    <section ref={containerRef} className="relative py-20 md:py-40 bg-white overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <NeuralParticles count={30} color="60, 76, 255" lineColor="60, 76, 255" connectDistance={150} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(60,76,255,0.02)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24 md:mb-40">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-3 mb-6"
            >
                <div className="w-10 h-px bg-brand-blue/30" />
                <span className="text-brand-blue text-xs md:text-sm font-bold uppercase tracking-[0.4em]">The Methodology</span>
                <div className="w-10 h-px bg-brand-blue/30" />
            </motion.div>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-black tracking-tighter uppercase leading-none">
                <TechReveal text={getTitle()} />
            </h2>
        </div>

        {/* Zig-Zag Timeline */}
        <div className="relative max-w-7xl mx-auto">
            
            {/* Central Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-100 -translate-x-1/2 hidden md:block">
                <motion.div 
                    className="absolute top-0 left-0 w-full bg-brand-blue origin-top"
                    style={{ height: "100%", scaleY }}
                />
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-24 md:gap-40">
                {processData.map((step, index) => {
                    const isEven = index % 2 === 0;
                    const Icon = stepIcons[index % stepIcons.length];
                    const phaseNumber = (index + 1).toString().padStart(2, '0');

                    return (
                        <div key={index} className={`flex flex-col md:flex-row items-center gap-10 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                            
                            {/* Graphic Side */}
                            <div className="w-full md:w-1/2 flex justify-center items-center">
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8, x: isEven ? -40 : 40 }}
                                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="relative"
                                >
                                    {/* Number Watermark */}
                                    <span className="absolute -top-10 -left-10 text-9xl font-black text-zinc-50 select-none z-0">
                                        {phaseNumber}
                                    </span>
                                    
                                    <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 bg-white rounded-[40px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.08)] border border-zinc-100 flex items-center justify-center group">
                                        {/* Animated Border Beam */}
                                        <div className="absolute inset-0 rounded-[40px] border border-brand-blue/0 group-hover:border-brand-blue/20 transition-colors duration-500" />
                                        
                                        <Icon size={80} className="text-brand-blue stroke-[1.2] group-hover:scale-110 transition-transform duration-500" />
                                        
                                        {/* Corner Label */}
                                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-black italic shadow-xl">
                                            {phaseNumber}
                                        </div>
                                    </div>

                                    {/* Connectivity Dot */}
                                    <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? '-right-4 md:-right-8' : '-left-4 md:-left-8'} hidden md:block`}>
                                        <div className="w-4 h-4 rounded-full bg-white border-2 border-brand-blue shadow-[0_0_15px_rgba(60,76,255,0.3)]" />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Content Side */}
                            <div className={`w-full md:w-1/2 px-4 md:px-20 text-center ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/5 text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-6">
                                        Phase {phaseNumber}
                                    </span>
                                    
                                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-black mb-6 tracking-tighter uppercase leading-tight">
                                        {step.Title}
                                    </h3>
                                    
                                    <div
                                        className="text-zinc-600 text-lg md:text-xl lg:text-2xl leading-relaxed font-normal max-w-xl mx-auto md:mx-0"
                                        dangerouslySetInnerHTML={{ __html: step.Description }}
                                    />

                                    {/* Tech Line Decor */}
                                    <div className={`mt-8 flex gap-2 ${isEven ? 'justify-start' : 'justify-end md:justify-end'} justify-center`}>
                                        <div className="w-12 h-1 bg-brand-blue rounded-full" />
                                        <div className="w-3 h-1 bg-zinc-100 rounded-full" />
                                        <div className="w-3 h-1 bg-zinc-100 rounded-full" />
                                    </div>
                                </motion.div>
                            </div>

                        </div>
                    );
                })}
            </div>

        </div>

      </div>
    </section>
  );
}
