"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import TechReveal from "../atom/TechReveal";
import Magnetic from "../molecules/Magnetic";

const NeuralParticles = dynamic(() => import("../atom/NeuralParticles"), { ssr: false });

export default function BlogHeroBanner({
  searchText,
  categories,
  bgImageUrl,
  title,
  description,
  setSearchText,
  selectedCategory,
  setSelectedCategory,
}: {
  searchText: string;
  selectedCategory: string;
  categories: string[];
  bgImageUrl: string | null;
  title: string;
  description: string;
  setCategories: (value: string[]) => void;
  setBgImageUrl: (value: string | null) => void;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setSearchText: (value: string) => void;
  setSelectedCategory: (value: string) => void;
}) {
  const [localSearch, setLocalSearch] = useState(searchText || "");
  const router = useRouter();
  const pathname = usePathname();
  const filterRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (!localSearch && searchText) {
      setLocalSearch(searchText);
    }
  }, []);

  const handleURLSearch = () => {
    const params = new URLSearchParams();
    if (localSearch.trim()) {
      params.set("query", localSearch.trim());
    }
    if (selectedCategory && selectedCategory !== "All Blogs") {
      params.set("category", selectedCategory);
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setSearchText(localSearch);
  };

  const allCategories = ["All Blogs", ...categories];

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative bg-[#050505] md:mt-[120px] text-white overflow-hidden min-h-[500px] flex flex-col justify-center"
    >
      {/* Background with Neural Particles & Vertical Lines */}
      <div className="absolute inset-0 z-0">
        {bgImageUrl ? (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
            style={{ backgroundImage: `url(${bgImageUrl})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-[#050505]" />
        )}
        
        {/* Signature Neural Network Overlay (Interactive) */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
          <NeuralParticles count={50} color="100, 130, 255" lineColor="80, 110, 255" connectDistance={140} interactive={true} />
        </div>


        {/* Scanning beam effect */}
        <motion.div
            className="absolute left-0 right-0 h-[1.5px] z-20 pointer-events-none"
            style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(60,76,255,0.4) 30%, rgba(139,92,246,0.6) 50%, rgba(60,76,255,0.4) 70%, transparent 100%)",
            }}
            animate={{ y: ["0vh", "100vh"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        />

        {/* Cinematic Grain Texture */}
        <div className="absolute inset-0 z-1 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

        <div className="absolute inset-0 bg-linear-to-b from-black/90 via-black/40 to-[#050505] z-11" />
      </div>

      <div className="container relative z-20 pt-[80px] md:pt-[100px] pb-[40px] md:pb-[60px] text-center px-4">
        <h1 className="text-[36px] sm:text-[42px] md:text-[60px] font-bold mb-[20px] leading-[1.1] tracking-tight uppercase">
          <TechReveal text={title} duration={1.2} />
        </h1>
        
        <motion.p 
          className="text-white/70 text-[16px] sm:text-[18px] md:text-[20px] max-w-[700px] mx-auto mb-[32px] md:mb-[48px] font-light leading-relaxed px-2"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {description}
        </motion.p>

        {/* Premium Search Bar */}
        <motion.div 
          className="max-w-[560px] mx-auto relative group"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3C4CFF]/40 to-[#3C4CFF]/10 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative flex items-center bg-black/40 backdrop-blur-2xl rounded-full border border-white/10 overflow-hidden px-1.5 sm:px-2 shadow-2xl hover:border-[#3C4CFF]/30 transition-all duration-300">
            <div className="pl-3 sm:pl-4 text-[#3C4CFF] shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search our insights..."
              className="flex-1 min-w-0 bg-transparent border-none text-white px-2 sm:px-4 py-3 sm:py-4 focus:ring-0 outline-none placeholder:text-white/40 font-medium text-[15px] sm:text-base"
              value={localSearch}
              onChange={(e) => {
                const val = e.target.value;
                setLocalSearch(val);
                setSearchText(val);
                const url = new URL(window.location.href);
                if (val.trim()) url.searchParams.set("query", val.trim());
                else url.searchParams.delete("query");
                url.searchParams.set("page", "1");
                window.history.replaceState({}, "", url.toString());
              }}
              onKeyDown={(e) => { if (e.key === "Enter") handleURLSearch(); }}
            />
            <Magnetic>
                <button
                onClick={handleURLSearch}
                className="bg-[#3C4CFF] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold hover:bg-[#505FFF] transition duration-300 mr-1 sm:mr-2 shadow-lg shadow-[#3C4CFF]/20 text-[14px] sm:text-[15px] shrink-0"
                >
                Search
                </button>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Modern Pill Filters */}
      <div className="relative border-y border-white/5 bg-white/1 backdrop-blur-lg">
        <div 
          ref={filterRef}
          className="container overflow-x-auto no-scrollbar scroll-smooth"
        >
          <div className="flex items-center md:justify-center min-w-max h-[64px] sm:h-[72px] gap-1 sm:gap-2 px-4 sm:px-6">
            {allCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    const url = new URL(window.location.href);
                    if (cat === "All Blogs") url.searchParams.delete("category");
                    else url.searchParams.set("category", cat);
                    url.searchParams.set("page", "1");
                    window.history.pushState({}, "", url.toString());
                  }}
                  className={`relative px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[14px] sm:text-[15px] font-semibold transition-colors duration-300 whitespace-nowrap ${
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-[#3C4CFF] rounded-full z-0 shadow-lg shadow-[#3C4CFF]/40"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Shadow Masks for Scroll (Better visibility for mobile) */}
        <div className="absolute left-0 top-px bottom-px w-12 bg-linear-to-r from-[#050505] to-transparent pointer-events-none md:hidden z-20" />
        <div className="absolute right-0 top-px bottom-px w-12 bg-linear-to-l from-[#050505] to-transparent pointer-events-none md:hidden z-20" />
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
