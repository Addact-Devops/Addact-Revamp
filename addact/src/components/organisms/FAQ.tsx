"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Faq } from "@/graphql/queries/getHomePage";
import RichText from "../atom/richText";
import { motion, AnimatePresence } from "framer-motion";

interface IProps {
    data: Faq;
}

const FAQ = ({ data }: IProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative py-[90px] lg:py-[150px] overflow-hidden bg-[#050505]" id="faq">
            {/* Background Glows for Depth */}
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#3C4CFF]/5 blur-[160px] rounded-full pointer-events-none" />
            
            <div className="w-full px-6 md:px-12 lg:px-20 max-w-[1750px] mx-auto relative z-10">
                {/* Header */}
                <div className="mb-[60px] md:mb-[100px]">
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-white font-bold text-[36px] md:text-[52px] 2xl:text-[72px] leading-[1.05] w-full"
                    >
                        {data?.Title || "Frequently Asked Questions"}
                    </motion.h2>
                </div>

                {/* FAQ Box Container - Full Width Reach */}
                <div className="w-full border border-white/10 rounded-[24px] md:rounded-[40px] overflow-hidden bg-white/1 backdrop-blur-3xl shadow-2xl">
                    {data?.FAQ?.map((faq, index) => {
                        const isOpen = openIndex === index;
                        
                        return (
                            <div
                                key={index}
                                className={`group transition-all duration-500 ${
                                    index !== 0 ? "border-t border-white/5" : ""
                                } ${isOpen ? "bg-white/4" : "hover:bg-white/2"}`}
                            >
                                <button
                                    onClick={() => toggleIndex(index)}
                                    className="w-full flex items-center justify-between gap-[20px] md:gap-[50px] text-left px-[28px] sm:px-[50px] lg:px-[80px] py-[30px] md:py-[50px] group/btn"
                                >
                                    <span className={`text-[17px] md:text-[26px] font-bold tracking-tight transition-colors duration-300 flex-1 ${
                                        isOpen ? "text-white" : "text-zinc-400 group-hover/btn:text-zinc-100"
                                    }`}>
                                        {faq.Title}
                                    </span>

                                    <div className={`shrink-0 flex items-center justify-center w-[36px] h-[36px] md:w-[48px] md:h-[48px] rounded-full transition-all duration-500 border ${
                                        isOpen 
                                            ? "bg-[#3C4CFF] border-[#3C4CFF] text-white shadow-[0_0_30px_rgba(60,76,255,0.45)]" 
                                            : "bg-white/5 border-white/10 text-zinc-500 group-hover/btn:bg-white/10 group-hover/btn:border-white/20 group-hover/btn:text-zinc-100"
                                    }`}>
                                        {isOpen ? <Minus size={24} strokeWidth={2.5} /> : <Plus size={24} strokeWidth={2.5} />}
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <div className="px-[28px] sm:px-[50px] lg:px-[80px] pb-[40px] md:pb-[70px]">
                                                <div className="text-zinc-400 text-[16px] md:text-[21px] leading-[1.8] font-medium w-full max-w-[1200px]">
                                                    <RichText html={faq.Description} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
