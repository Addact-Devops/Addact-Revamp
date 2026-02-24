"use client";

import { motion } from "framer-motion";

const Loader = ({ fullPage = true }: { fullPage?: boolean }) => {
  return (
    <div 
      className={
        fullPage 
          ? "fixed inset-0 flex flex-col items-center justify-center z-[9999] bg-[#0A0A0A]" 
          : "flex flex-col items-center justify-center py-8 w-full"
      }
    >
      <div className="relative scale-75">
        {/* Animated Brand Symbol (The 'A' from Addact) */}
        <svg
          width={fullPage ? "80" : "60"}
          height={fullPage ? "80" : "60"}
          viewBox="0 0 28.2175 26.6615"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          <motion.path
            d="M28.2175 26.6615H23.0379L14.0695 6.1848L5.10109 26.6615H0L11.9033 0.280029H16.2755L28.2175 26.6615Z"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0, 1, 1, 0.5, 1],
              fill: ["rgba(60, 76, 255, 0)", "rgba(60, 76, 255, 0)", "rgba(60, 76, 255, 0.2)", "rgba(60, 76, 255, 0.5)"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.4, 0.6, 0.8, 1]
            }}
            stroke="#3C4CFF"
            strokeWidth="0.5"
          />
        </svg>

        {/* Neural Pulse Backdrop */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 -m-8 rounded-full bg-[#3C4CFF]/20 blur-[40px] z-0"
        />
        
        {/* Orbiting particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{
              duration: 2 + i,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 -m-4 flex items-start justify-center"
          >
            <div className="w-1.2 h-1.2 rounded-full bg-[#3C4CFF] shadow-[0_0_10px_#3C4CFF]" />
          </motion.div>
        ))}
      </div>

      {/* Loading Progress Text */}
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="mt-6 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-[9px] uppercase tracking-[0.4em] font-medium">
          {fullPage ? "Addact Technology" : "Loading More"}
        </span>
        <div className="h-[1px] w-16 bg-linear-to-r from-transparent via-[#3C4CFF] to-transparent opacity-50" />
      </motion.div>
    </div>
  );
};

export default Loader;
