"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

export interface BentoProps {
  textAutoHide?: boolean;
  headingText?: string;
  problemTitles?: string[];
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "132, 0, 255";
const MOBILE_BREAKPOINT = 768;

const ASSETS = {
  analytics: "/figma/solve-problems-with-ai/customer-analytics.png",
  chatbotStars: "/figma/solve-problems-with-ai/chatbot-stars.svg",
  forecastArrow: "/figma/solve-problems-with-ai/forecast-arrow.svg",
  fraudVisual: "/figma/solve-problems-with-ai/fraud-monitoring-hand.png",
  analyzingOrb: "/figma/solve-problems-with-ai/analyzing-orb.png",
} as const;

// ─── Helpers ────────────────────────────────────────────────────────────────

const createParticleElement = (
  x: number,
  y: number,
  color: string = DEFAULT_GLOW_COLOR,
): HTMLDivElement => {
  const el = document.createElement("div");
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glow: number,
  radius: number,
) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

// ─── GlobalSpotlight ────────────────────────────────────────────────────────

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disableAnimations || !gridRef.current || !enabled) return;

    const spotlight = document.createElement("div");
    spotlight.style.cssText = `
      position: fixed;
      width: 720px;
      height: 720px;
      border-radius: 999px;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.16) 0%,
        rgba(${glowColor}, 0.1) 18%,
        rgba(${glowColor}, 0.05) 34%,
        rgba(${glowColor}, 0.02) 52%,
        transparent 72%
      );
      z-index: 30;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (event: MouseEvent) => {
      if (!gridRef.current || !spotlightRef.current) return;
      const sectionRect = gridRef.current.getBoundingClientRect();
      const isInside =
        event.clientX >= sectionRect.left &&
        event.clientX <= sectionRect.right &&
        event.clientY >= sectionRect.top &&
        event.clientY <= sectionRect.bottom;

      const cards = gridRef.current.querySelectorAll(".magic-bento-card");

      if (!isInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        cards.forEach((card) =>
          (card as HTMLElement).style.setProperty("--glow-intensity", "0"),
        );
        return;
      }

      const { proximity, fadeDistance } =
        calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(event.clientX - centerX, event.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);
        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity =
            (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(
          cardElement,
          event.clientX,
          event.clientY,
          glowIntensity,
          spotlightRadius,
        );
      });

      gsap.to(spotlightRef.current, {
        left: event.clientX,
        top: event.clientY,
        duration: 0.12,
        ease: "power2.out",
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.18 : 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (!gridRef.current || !spotlightRef.current) return;
      gridRef.current
        .querySelectorAll(".magic-bento-card")
        .forEach((card) =>
          (card as HTMLElement).style.setProperty("--glow-intensity", "0"),
        );
      gsap.to(spotlightRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      spotlightRef.current?.remove();
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

// ─── InteractiveCard ────────────────────────────────────────────────────────

const InteractiveCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  glowColor?: string;
  particleCount?: number;
}> = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
  glowColor = DEFAULT_GLOW_COLOR,
  particleCount = DEFAULT_PARTICLE_COUNT,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(
        Math.random() * width,
        Math.random() * height,
        glowColor,
      ),
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => particle.remove(),
      });
    });
    particlesRef.current = [];
  }, []);

  const spawnParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();

    memoizedParticles.current.forEach((particle, index) => {
      const timeout = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
        );
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 80,
          y: (Math.random() - 0.5) * 80,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "none",
        });
        gsap.to(clone, { opacity: 0.3, duration: 1.5, repeat: -1, yoyo: true });
      }, index * 100);
      timeoutsRef.current.push(timeout);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;

    const setGlow = (pointerX: number, pointerY: number, intensity: number) => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty(
        "--glow-x",
        `${((pointerX - rect.left) / rect.width) * 100}%`,
      );
      element.style.setProperty(
        "--glow-y",
        `${((pointerY - rect.top) / rect.height) * 100}%`,
      );
      element.style.setProperty("--glow-intensity", intensity.toString());
    };

    const handleMouseEnter = (e: MouseEvent) => {
      isHoveredRef.current = true;
      setGlow(e.clientX, e.clientY, 1);
      spawnParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      setGlow(e.clientX, e.clientY, 0.95);
      if (!enableTilt && !enableMagnetism) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        gsap.to(element, {
          rotateX: ((y - centerY) / centerY) * -7,
          rotateY: ((x - centerX) / centerX) * 7,
          duration: 0.16,
          ease: "power2.out",
          transformPerspective: 1200,
        });
      }
      if (enableMagnetism) {
        magnetismAnimationRef.current?.kill();
        magnetismAnimationRef.current = gsap.to(element, {
          x: (x - centerX) * 0.035,
          y: (y - centerY) * 0.035,
          duration: 0.22,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearParticles();
      element.style.setProperty("--glow-intensity", "0");
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 0.28,
        ease: "power2.out",
      });
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height),
      );
      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position:absolute; width:${maxDistance * 2}px; height:${maxDistance * 2}px;
        border-radius:999px;
        background:radial-gradient(circle,rgba(${glowColor},0.42) 0%,rgba(${glowColor},0.18) 34%,transparent 72%);
        left:${x - maxDistance}px; top:${y - maxDistance}px; pointer-events:none; z-index:5;
      `;
      element.appendChild(ripple);
      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        },
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("click", handleClick);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("click", handleClick);
      clearParticles();
      magnetismAnimationRef.current?.kill();
    };
  }, [
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
    particleCount,
    spawnParticles,
    clearParticles,
  ]);

  return (
    // No overflow-hidden on outer div — required so ::after border pseudo-element is not clipped
    <div
      ref={cardRef}
      className={`magic-bento-card relative rounded-[10px] border border-white/12 bg-[#0f0f0f] ${className}`}
      style={style}
    >
      {/* overflow-hidden lives here so card content clips correctly */}
      <div className="relative h-full w-full overflow-hidden rounded-[10px]">
        {children}
      </div>
    </div>
  );
};

// ─── MagicBento ─────────────────────────────────────────────────────────────

const MagicBento: React.FC<BentoProps> = ({
  headingText,
  problemTitles = [],
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  const borderGlowClass = enableBorderGlow ? "card--border-glow" : "";

  const cardStyle = {
    color: "#ffffff",
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "#0f0f0f",
    "--glow-x": "50%",
    "--glow-y": "50%",
    "--glow-intensity": "0",
    "--glow-radius": `${spotlightRadius}px`,
  } as React.CSSProperties;

  return (
    <>
      {/*
        IMPORTANT: glowColor is JS-interpolated directly into the <style> string here.
        This is intentional and correct — unlike styled-jsx or CSS vars,
        a plain <style> tag renders the interpolated value as literal CSS,
        so rgba(132, 0, 255, ...) is valid and works in all browsers.
        This is exactly what ReactBits does and why their border glow works.
      */}
      <style>{`
        .magic-bento-card {
          isolation: isolate;
          transform-style: preserve-3d;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
        }

        /* ── ReactBits border glow — JS-interpolated glowColor baked into CSS ── */
        .card--border-glow::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.9)) 0%,
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.5)) 30%,
            transparent 60%
          );
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 3;
        }

        /* ── Inner ambient fill glow ── */
        .card--border-glow::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
            calc(var(--glow-radius) * 0.7) circle at var(--glow-x) var(--glow-y),
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.15)) 0%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 1;
        }

        .card--border-glow:hover {
          box-shadow:
            0 0 20px rgba(${glowColor}, 0.3),
            0 0 60px rgba(${glowColor}, 0.12),
            0 20px 60px rgba(0,0,0,0.4);
        }

        /* ── Typography ── */
        .solve-ai-heading {
          font-size: clamp(2.25rem, 1.6rem + 2.2vw, 3.75rem);
          line-height: 1.18;
        }
        .solve-ai-copy {
          font-size: clamp(1.5rem, 1.15rem + 0.7vw, 1.875rem);
          line-height: 1.42;
          letter-spacing: -0.02em;
        }
        .solve-ai-copy-small {
          font-size: clamp(1.45rem, 1.12rem + 0.55vw, 1.875rem);
          line-height: 1.42;
          letter-spacing: -0.02em;
        }
        .solve-ai-muted { color: rgba(255,255,255,0.72); font-weight: 300; }
        .solve-ai-strong { font-weight: 600; color: #ffffff; }

        /* ── Decorative elements ── */
        .solve-ai-shadow-star {
          width: clamp(8rem, 7rem + 5vw, 11rem);
          aspect-ratio: 1;
          background: rgba(255,255,255,0.08);
          clip-path: polygon(50% 0%,63% 35%,100% 50%,63% 65%,50% 100%,37% 65%,0% 50%,37% 35%);
          filter: drop-shadow(0 30px 48px rgba(0,0,0,0.32));
        }
        .solve-ai-fraud-glow {
          position: absolute; inset: auto 18% 14% 18%; height: 32%;
          background: radial-gradient(circle, rgba(60,76,255,0.3) 0%, rgba(60,76,255,0.05) 55%, transparent 75%);
          filter: blur(24px); pointer-events: none;
        }
        .solve-ai-forecast-left, .solve-ai-forecast-right { position: absolute; border-radius: 999px; }
        .solve-ai-forecast-left {
          left:-8%; bottom:20%; width:64%; height:18%; min-height:40px;
          background: linear-gradient(90deg,#3146ff 0%,#4858ff 70%,rgba(72,88,255,0.2) 100%);
          box-shadow: 0 0 24px rgba(60,76,255,0.34);
        }
        .solve-ai-forecast-right {
          right:-3%; bottom:8%; width:48%; height:12%; min-height:38px;
          background:#ffffff; border:1px solid rgba(190,190,255,0.24);
          box-shadow: 0 14px 40px rgba(0,0,0,0.22);
        }
        .solve-ai-forecast-right::before, .solve-ai-forecast-right::after {
          content:""; position:absolute; top:50%; transform:translateY(-50%); border-radius:999px;
        }
        .solve-ai-forecast-right::before { left:8%; width:22%; aspect-ratio:1; background:linear-gradient(180deg,#cfcfff 0%,#bcc0ff 100%); }
        .solve-ai-forecast-right::after  { right:14%; width:48%; height:24%; background:rgba(205,208,255,0.8); }

        .solve-ai-analyzing-shell {
          position:relative; width:min(100%,36rem); border-radius:999px;
          border:1px solid rgba(255,255,255,0.2);
          background:linear-gradient(180deg,rgba(14,14,14,0.95) 0%,rgba(12,12,12,0.98) 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 34px rgba(235,109,178,0.26), 0 0 56px rgba(60,76,255,0.16);
          padding:1.15rem 1.4rem;
        }
        .solve-ai-analyzing-shell::before {
          content:""; position:absolute; inset:-1px; border-radius:inherit; padding:1px;
          background:linear-gradient(90deg,rgba(214,67,210,0.95) 0%,rgba(254,212,162,0.85) 50%,rgba(60,76,255,0.92) 100%);
          -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
          -webkit-mask-composite:xor;
          mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
          mask-composite:exclude; opacity:0.95;
        }

        /* ── Animations ── */
        .solve-ai-analyzing-orb { animation: solve-ai-orb-pulse 4.4s ease-in-out infinite; }
        .solve-ai-stars          { animation: solve-ai-float 5.5s ease-in-out infinite; }
        .solve-ai-orbit-visual   { animation: solve-ai-float 6.5s ease-in-out infinite; }

        @keyframes solve-ai-float {
          0%,100% { transform:translateY(0px); }
          50%      { transform:translateY(-10px); }
        }
        @keyframes solve-ai-orb-pulse {
          0%,100% { transform:scale(1);    filter:drop-shadow(0 0 14px rgba(235,109,178,0.3)); }
          50%      { transform:scale(1.04); filter:drop-shadow(0 0 22px rgba(60,76,255,0.36)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .solve-ai-stars,.solve-ai-orbit-visual,.solve-ai-analyzing-orb { animation:none; }
        }
      `}</style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <div className="w-full">
        <h2 className="solve-ai-heading mb-8 max-w-[677px] w-full font-semibold! text-white md:mb-10 xl:mb-12!">
          {headingText || "How we solve your problems with AI"}
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3! xl:grid-cols-4!"
        >
          {/* Card 1 — AI Chatbots */}
          <InteractiveCard
            className={`${borderGlowClass} min-h-72 p-5 md:col-span-2 md:min-h-88 md:p-6 lg:col-span-2! xl:min-h-96! xl:p-10!`}
            style={cardStyle}
            disableAnimations={shouldDisableAnimations}
            enableTilt={enableTilt}
            enableMagnetism={enableMagnetism}
            clickEffect={clickEffect}
            glowColor={glowColor}
            particleCount={particleCount}
          >
            <div className="relative z-1 flex h-full flex-col justify-between gap-8">
              <p className="solve-ai-copy w-full max-w-full text-white md:max-w-[24ch]">
                {problemTitles[0] ||
                  "Automate customer interactions with AI chatbots that deliver instant responses and improve support efficiency."}
              </p>
              <div className="pointer-events-none flex items-end justify-between gap-6">
                <div className="solve-ai-shadow-star shrink-0" />
                <Image
                  src={ASSETS.chatbotStars}
                  alt=""
                  width={152}
                  height={185}
                  className="solve-ai-stars h-auto w-21 md:w-26 xl:w-32!"
                />
              </div>
            </div>
          </InteractiveCard>

          {/* Card 2 — Fraud visual */}
          <InteractiveCard
            className={`${borderGlowClass} min-h-72 p-0 md:min-h-88 xl:min-h-96!`}
            style={cardStyle}
            disableAnimations={shouldDisableAnimations}
            enableTilt={enableTilt}
            enableMagnetism={enableMagnetism}
            clickEffect={clickEffect}
            glowColor={glowColor}
            particleCount={particleCount}
          >
            <div className="solve-ai-fraud-glow" />
            <div className="solve-ai-orbit-visual relative h-full w-full">
              <Image
                src={ASSETS.fraudVisual}
                alt="AI monitoring visual"
                fill
                sizes="(min-width: 1280px) 22vw, (min-width: 768px) 48vw, 100vw"
                className="object-contain object-center"
              />
            </div>
          </InteractiveCard>

          {/* Card 3 — Detect Fraud */}
          <InteractiveCard
            className={`${borderGlowClass} min-h-72 p-5 md:min-h-88 md:p-6 xl:min-h-96! xl:p-10!`}
            style={cardStyle}
            disableAnimations={shouldDisableAnimations}
            enableTilt={enableTilt}
            enableMagnetism={enableMagnetism}
            clickEffect={clickEffect}
            glowColor={glowColor}
            particleCount={particleCount}
          >
            <div className="relative z-1 flex h-full items-start">
              <p className="solve-ai-copy-small w-full max-w-full text-white md:max-w-[13ch]">
                {problemTitles[1] ||
                  "Detect and prevent fraudulent activities in real time using intelligent AI-powered monitoring systems."}
              </p>
            </div>
          </InteractiveCard>

          {/* Card 4 — Analytics */}
          <InteractiveCard
            className={`${borderGlowClass} min-h-104 p-5 md:min-h-128 md:p-6 xl:min-h-[38.6875rem]! xl:p-10!`}
            style={cardStyle}
            disableAnimations={shouldDisableAnimations}
            enableTilt={enableTilt}
            enableMagnetism={enableMagnetism}
            clickEffect={clickEffect}
            glowColor={glowColor}
            particleCount={particleCount}
          >
            <div className="relative z-1 flex h-full flex-col justify-between gap-8">
              <p className="solve-ai-copy-small w-full max-w-full text-white md:max-w-[12ch]">
                {problemTitles[2] ||
                  "Understand your customers better with AI-driven analytics."}
              </p>
              <div className="relative mx-auto w-full max-w-76">
                <Image
                  src={ASSETS.analytics}
                  alt="AI analytics illustration"
                  width={1480}
                  height={807}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </InteractiveCard>

          <InteractiveCard
            className={`${borderGlowClass} min-h-104 p-5 md:min-h-128 md:p-6 xl:min-h-[38.6875rem]! xl:p-10!`}
            style={cardStyle}
            disableAnimations={shouldDisableAnimations}
            enableTilt={enableTilt}
            enableMagnetism={enableMagnetism}
            clickEffect={clickEffect}
            glowColor={glowColor}
            particleCount={particleCount}
          >
            <div className="relative z-1 flex h-full flex-col justify-between gap-8">
              <p className="solve-ai-copy-small w-full max-w-full text-white md:max-w-[13ch]">
                {problemTitles[3] ||
                  "Make smarter business decisions with AI-driven demand forecasting that predicts future trends."}
              </p>
              <div className="relative min-h-48 overflow-hidden">
                <div className="solve-ai-forecast-left" />
                <div className="solve-ai-forecast-right" />
                <Image
                  src={ASSETS.forecastArrow}
                  alt=""
                  width={153}
                  height={185}
                  className="pointer-events-none absolute bottom-[16%] left-[32%] h-auto w-[28%] min-w-24"
                />
              </div>
            </div>
          </InteractiveCard>

          <InteractiveCard
            className={`${borderGlowClass} min-h-80 p-5 md:col-span-2 md:min-h-96 md:p-6 lg:col-span-3! xl:col-span-2! xl:min-h-[38.6875rem]! xl:p-10!`}
            style={cardStyle}
            disableAnimations={shouldDisableAnimations}
            enableTilt={enableTilt}
            enableMagnetism={enableMagnetism}
            clickEffect={clickEffect}
            glowColor={glowColor}
            particleCount={particleCount}
          >
            <div className="relative z-1 flex h-full items-center justify-center">
              <div className="solve-ai-analyzing-shell">
                <div className="relative flex items-center gap-4 md:gap-5">
                  <Image
                    src={ASSETS.analyzingOrb}
                    alt="Analyzing indicator"
                    width={280}
                    height={280}
                    className="solve-ai-analyzing-orb h-14 w-14 shrink-0 md:h-16 md:w-16 xl:h-22! xl:w-22!"
                  />
                  <span className="text-[2rem] font-semibold leading-none tracking-[-0.04em] text-white/15 md:text-[2.5rem] xl:text-[3.75rem]!">
                    {problemTitles[4] || "Analysing..."}
                  </span>
                </div>
              </div>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </>
  );
};

export default MagicBento;
