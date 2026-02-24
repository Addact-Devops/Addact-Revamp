import TechReveal from "../atom/TechReveal";
import { motion } from "framer-motion";

type BrandValueProps = {
    title: string;
    subtitle: string;
    content: {
        type: string;
        children: { text: string }[];
    }[];
    image: {
        url: string;
        alternativeText: string | null;
        width: number | null;
        height: number | null;
    };
};

const BrandValue: React.FC<BrandValueProps> = ({ title, subtitle, content, image }) => {
    const paragraph = content?.[0]?.children?.[0]?.text || "";

    return (
        <section className="container my-[80px] sm:my-[100px]" id="brand-values">
            <div className="relative bg-[#050505] rounded-3xl p-[40px] sm:px-[80px] sm:py-[90px] lg:flex items-center justify-between overflow-hidden group">
                {/* Right Gradient Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3C4CFF]/5 blur-[100px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2 group-hover:bg-[#3C4CFF]/8 transition-all duration-700" />
                
                {/* Left Text Content */}
                <div className="text-white lg:w-1/2 space-y-6 mb-12 lg:mb-0 relative z-10">
                    <p className="text-[#3c4cff] font-bold tracking-widest uppercase text-sm md:text-base">{subtitle}</p>
                    <h2 className="mb-[30px] font-bold! text-[32px] md:text-[48px] 2xl:text-[60px] leading-tight text-white uppercase tracking-tight">
                        <TechReveal text={title} duration={1} />
                    </h2>
                    <p className="text-base md:text-xl text-white/70 leading-relaxed font-light max-w-xl">{paragraph}</p>
                </div>

                {/* Right Image */}
                <div className="lg:w-1/2 flex justify-center relative z-10">
                    <motion.img
                        src={image.url}
                        alt={image.alternativeText || "Brand Value Image"}
                        width={image.width || undefined}
                        height={image.height || undefined}
                        className="max-w-full h-auto drop-shadow-[0_20px_50px_rgba(60,76,255,0.2)]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                </div>

                {/* Scanning beam effect */}
                <motion.div
                    className="absolute left-0 right-0 h-[1.5px] z-5 pointer-events-none opacity-20"
                    style={{
                        background: "linear-gradient(90deg, transparent 0%, rgba(60,76,255,1) 50%, transparent 100%)",
                    }}
                    animate={{ y: ["0%", "100%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
            </div>
        </section>
    );
};

export default BrandValue;
