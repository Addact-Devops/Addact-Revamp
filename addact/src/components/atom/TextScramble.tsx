"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

const CYCLES_PER_LETTER = 2;
const SHUFFLE_SPEED = 30;

const CHARS = "!@#$%^&*()_+{}:\"<>?,./;'[]\\-=`~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

type Props = {
  text: string;
  className?: string;
};

export default function TextScramble({ text, className }: Props) {
  const [displayText, setDisplayText] = useState("");
  const timer = useRef<NodeJS.Timeout | null>(null);
  const queue = useRef<{ from: string; to: string; start: number; end: number; char?: string }[]>([]);
  const frame = useRef(0);

  const scramble = useCallback(() => {
    let complete = 0;
    const nextText = queue.current.map((item, i) => {
      const { from, to, start, end, char } = item;
      if (frame.current >= end) {
        complete++;
        return to;
      }
      if (frame.current >= start) {
        if (!char || Math.random() < 0.28) {
          const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          queue.current[i].char = randomChar;
          return randomChar;
        }
        return char;
      }
      return from;
    }).join("");

    setDisplayText(nextText);

    if (complete === queue.current.length) {
      if (timer.current) clearInterval(timer.current);
    } else {
      frame.current++;
    }
  }, []);

  useEffect(() => {
    const from = displayText || "";
    const to = text;
    const length = Math.max(from.length, to.length);
    queue.current = [];
    
    for (let i = 0; i < length; i++) {
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.current.push({
        from: from[i] || "",
        to: to[i] || "",
        start,
        end,
      });
    }

    if (timer.current) clearInterval(timer.current);
    frame.current = 0;
    timer.current = setInterval(scramble, SHUFFLE_SPEED);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [text, scramble]);

  return <span className={className}>{displayText}</span>;
}
