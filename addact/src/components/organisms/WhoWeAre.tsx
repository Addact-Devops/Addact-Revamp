"use client";
import React, { useEffect, useRef, useState } from "react";
import "@/styles/components/whoweare.scss";

const WhoWeAre = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const paragraphLines = [
    "At ADDACT, we don’t just build websites,",
    "we craft exceptional digital experiences powered by Sitecore.",
    "We are a Certified Sitecore Agency that delivers personalized content journeys,",
    "automates campaigns, engages audiences, & drives real results.",
  ];

  const stats = [
    { number: 10, content: "Successful Sitecore Projects" },
    { number: 20, content: "Enterprise Clients Served" },
    { number: 10, content: "Years of Experience" },
    { number: 10, content: "Global Markets Reached" },
  ];

  // 👇 Counting effect
  const animateCount = (
    el: HTMLDivElement,
    target: number,
    duration: number = 2000
  ) => {
    let start = 0;
    const increment = target / (duration / 30);

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        el.innerText = `${target}+`;
        clearInterval(counter);
      } else {
        el.innerText = `${Math.ceil(start)}+`;
      }
    }, 30);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          numberRefs.current.forEach((ref, i) => {
            if (ref) animateCount(ref, stats[i].number);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="who-we-are gap" ref={sectionRef}>
      <div className="container">
        <div className="flex gap-10 md:gap-20 lg:gap-[100px] flex-wrap lg:flex-nowrap">
          <h2 className="w-full lg:w-[40%] border-after !text-[28px] md:!text-5xl xl:!text-6xl !pb-4 xl:!pb-10">
            Who Are We?
          </h2>

          <div className="w-full text-left">
            {paragraphLines.map((line, lineIndex) => (
              <p key={lineIndex} className="text-lg large inline">
                {line.split(" ").map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className={`inline-block opacity-20 ${
                      isVisible ? "fade-in" : ""
                    }`}
                    style={{
                      animationDelay: `${(
                        lineIndex * 1.5 +
                        wordIndex * 0.1
                      ).toFixed(2)}s`,
                    }}
                  >
                    {word}&nbsp;
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border border-white/15 mt-24 overflow-hidden">
          {stats.map((item, index) => (
            <div
              key={index}
              className="text-center p-[60px] border-r border-white/15 last:border-r-0"
            >
              <h2
                className="text-white !font-bold text-3xl mb-2 transition-colors duration-300 text-left"
                ref={(el) => {
                  numberRefs.current[index] = el;
                }}
              >
                0+
              </h2>
              <div className="text-2xl text-left font-normal leading-[1.75]">
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
