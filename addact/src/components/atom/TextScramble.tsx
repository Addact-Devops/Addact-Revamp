"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextScrambleProps {
  text: string;
  className?: string;
  duration?: number;
  scrambleSpeed?: number;
  revealDelay?: number;
  triggerOnce?: boolean;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$€%&*/\\?!";

/**
 * TextScramble decrypts text by shuffling random characters before settling on the final text.
 */
export default function TextScramble({
  text,
  className = "",
  duration = 0.8,
  scrambleSpeed = 40,
  revealDelay = 0,
  triggerOnce = true,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: triggerOnce, margin: "-100px" });
  const iterationRef = useRef(0);

  useEffect(() => {
    if (isInView && !isScrambling) {
      scramble();
    }
  }, [isInView]);

  const scramble = () => {
    setIsScrambling(true);
    iterationRef.current = 0;
    
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (index < iterationRef.current) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iterationRef.current >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iterationRef.current += text.length / (duration * 1000 / scrambleSpeed);
    }, scrambleSpeed);
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block font-mono ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3, delay: revealDelay }}
    >
      {displayText}
    </motion.span>
  );
}
