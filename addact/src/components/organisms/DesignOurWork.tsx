"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import type { OurWork } from "@/graphql/queries/getDevelopmentDesignSlug";
import Image from "../atom/image";
import RichText from "../atom/richText";
import { useCursor } from "@/lib/useCursor";

const projectsData = [
  {
    id: 1,
    title: "Law Firm",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution and digital transformation.",
    tags: ["Law firm", "Legal Tech", "AI"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
  },
  {
    id: 2,
    title: "HealthCare",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution and digital transformation.",
    tags: ["Healthcare", "MedTech", "AI"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
  },
  {
    id: 3,
    title: "FinTech",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution and digital transformation.",
    tags: ["Finance", "FinTech", "Banking"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
  },
  {
    id: 4,
    title: "E-Commerce",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution and digital transformation.",
    tags: ["Retail", "E-Commerce", "AI"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
  },
  {
    id: 5,
    title: "Real Estate",
    description:
      "At ADDACT, we are dedicated center of excellence, to help enterprises navigate the AI revolution and digital transformation.",
    tags: ["PropTech", "Real Estate", "AI"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  },
];

export default function OurWork({ data }: { data?: OurWork | null }) {
  const dragCursor = useCursor("drag");
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable[]>([]);
  const animatingRef = useRef(false);
  const virtualIndexRef = useRef(0);
  // Tracks the fractional virtual position during live drag
  const dragVirtualRef = useRef(0);

  const dynamicProjects =
    data?.serviceList?.map((item, index) => ({
      id: item.listingContext?.id ?? index + 1,
      title: item.listingContext?.title ?? "Untitled Project",
      description: item.listingContext?.description ?? "",
      tags: item.tagLine?.map((tag) => tag.Title).filter(Boolean) ?? [],
      image:
        item.listingContext?.image?.url ??
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
    })) ?? [];

  const projects = dynamicProjects.length > 0 ? dynamicProjects : projectsData;
  const total = projects.length;
  const heading = data?.serviceTitle ?? "Our work";

  const getCardConfig = useCallback(() => {
    const vw = window.innerWidth;
    let cardWidth = 900;
    if (vw < 640) cardWidth = 300;
    else if (vw < 768) cardWidth = 480;
    else if (vw < 1024) cardWidth = 640;
    else if (vw < 1280) cardWidth = 800;
    return { cardWidth };
  }, []);

  // Core layout — accepts fractional virtualIndex for smooth live-drag interpolation
  const layoutCards = useCallback(
    (virtualIndex: number, animate = true) => {
      if (!trackRef.current) return;
      const cards = Array.from(trackRef.current.children) as HTMLElement[];
      const { cardWidth } = getCardConfig();
      const gap = 32;
      const step = cardWidth + gap;

      cards.forEach((card, i) => {
        // fractional offset — allows mid-drag positions between cards
        let offset = i - (((virtualIndex % total) + total) % total);

        // shortest path wrap
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        const absOffset = Math.abs(offset);
        const isActive = absOffset < 0.5;
        const isAdjacent = absOffset >= 0.5 && absOffset < 1.5;

        const x = offset * step;

        // Interpolate scale/opacity/rotateY smoothly based on fractional offset
        const scale = gsap.utils.interpolate(
          1,
          absOffset <= 1 ? 0.88 : 0.76,
          Math.min(absOffset, 2) / 2,
        );
        const opacity = gsap.utils.interpolate(
          1,
          absOffset <= 1 ? 0.55 : 0.25,
          Math.min(absOffset, 2) / 2,
        );
        const rotateY = offset * 18; // proportional rotation during drag
        const zIndex = isActive ? 10 : isAdjacent ? 5 : 1;
        const duration = animate ? 0.55 : 0;

        gsap.to(card, {
          x,
          scale,
          opacity,
          zIndex,
          rotateY: gsap.utils.clamp(-18, 18, rotateY),
          duration,
          ease: "power3.out",
          overwrite: true,
          transformPerspective: 1000,
          transformOrigin:
            offset < -0.1 ? "right center" : offset > 0.1 ? "left center" : "center center",
        });
      });
    },
    [total, getCardConfig],
  );

  const goTo = useCallback(
    (virtualTarget: number) => {
      if (animatingRef.current) return;
      animatingRef.current = true;
      virtualIndexRef.current = virtualTarget;
      dragVirtualRef.current = virtualTarget;
      layoutCards(virtualTarget, true);
      setTimeout(() => {
        animatingRef.current = false;
      }, 560);
    },
    [layoutCards],
  );

  const goNext = useCallback(() => goTo(virtualIndexRef.current + 1), [goTo]);
  const goPrev = useCallback(() => goTo(virtualIndexRef.current - 1), [goTo]);

  const goToReal = useCallback(
    (realIndex: number) => {
      if (animatingRef.current) return;
      const current = virtualIndexRef.current;
      const currentReal = ((current % total) + total) % total;
      let diff = realIndex - currentReal;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
      goTo(current + diff);
    },
    [total, goTo],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(Draggable);

    layoutCards(0, false);

    if (!wrapperRef.current) return;

    const { cardWidth } = getCardConfig();
    const gap = 32;
    const step = cardWidth + gap;
    // How many pixels of drag = 1 card step
    const pixelsPerCard = step * 0.6;

    let dragStartVirtual = 0;

    draggableRef.current = Draggable.create(wrapperRef.current, {
      type: "x",
      inertia: false,
      cursor: "grab",
      activeCursor: "grabbing",

      onPress() {
        // Freeze any running animation so drag starts from current position
        animatingRef.current = false;
        dragStartVirtual = virtualIndexRef.current;
        dragVirtualRef.current = dragStartVirtual;
      },

      onDrag(this: Draggable) {
        // Keep wrapper visually stationary — we drive cards ourselves
        gsap.set(wrapperRef.current, { x: 0 });

        // Convert drag delta → fractional virtual index
        const delta = this.startX - this.x; // positive = dragging left = next
        const fractional = dragStartVirtual + delta / pixelsPerCard;
        dragVirtualRef.current = fractional;

        // Live layout with NO animation (duration:0) for instant response
        layoutCards(fractional, false);
      },

      onDragEnd(this: Draggable) {
        gsap.set(wrapperRef.current, { x: 0 });

        // Snap to nearest whole card
        const nearest = Math.round(dragVirtualRef.current);
        virtualIndexRef.current = nearest;

        // Animate snap into place
        animatingRef.current = true;
        layoutCards(nearest, true);
        setTimeout(() => {
          animatingRef.current = false;
        }, 560);
      },
    });

    const handleResize = () => layoutCards(virtualIndexRef.current, false);
    window.addEventListener("resize", handleResize);

    return () => {
      draggableRef.current.forEach((d) => d.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, [layoutCards, getCardConfig, goNext, goPrev]);

  return (
    <section className="bg-[#0f0f0f] w-full py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="container-main mb-10 md:mb-14">
        <h2 className="!text-[36px] md:!text-[48px] lg:!text-[60px] !font-semibold text-white font-[Montserrat,sans-serif] capitalize leading-tight">
          {heading}
        </h2>
      </div>

      <div {...dragCursor} className="relative w-full">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[15%] bg-gradient-to-r from-[#0f0f0f] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[15%] bg-gradient-to-l from-[#0f0f0f] to-transparent" />

        <div ref={wrapperRef} className="w-full select-none touch-pan-y">
          <div
            ref={trackRef}
            className="relative flex items-center justify-center"
            style={{
              height: "520px",
              perspective: "1200px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            {projects.map((project, i) => (
              <div
                key={project.id}
                onClick={() => goToReal(i)}
                style={{ position: "absolute", willChange: "transform, opacity" }}
                className="border border-white/30 rounded-[10px] bg-[#0f0f0f] overflow-hidden flex flex-col md:flex-row
                           h-[480px] sm:h-[440px] md:h-[340px] lg:h-[380px]! xl:h-[418px]!
                           w-[300px] sm:w-[480px] md:w-[640px] lg:w-[800px]! xl:w-[900px]!
                           cursor-pointer"
              >
                <div className="shrink-0 w-full h-[200px] sm:w-full sm:h-[220px] md:w-[260px] md:h-full lg:w-[320px]! xl:w-[437px]! pt-[20px] px-[20px] pb-[20px] md:pt-[40px] md:pl-[40px] md:pb-[40px]">
                  <div className="w-full h-full rounded-[8px] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={437}
                      height={338}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:gap-4 p-5 md:p-6 lg:p-8 flex-1 justify-center min-w-0">
                  <div className="flex flex-col gap-2">
                    <h3 className="!text-[20px] sm:!text-[24px] md:!text-[26px] lg:!text-[28px] xl:!text-[30px] !font-semibold text-white font-[Montserrat,sans-serif] leading-tight">
                      {project.title}
                    </h3>
                    <div className="!text-[12px] sm:!text-[13px] md:!text-[14px] lg:!text-[16px] xl:!text-[20px] !font-normal text-white font-[Montserrat,sans-serif] leading-[1.65] line-clamp-6">
                      <RichText html={project.description} />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-white text-white px-3 py-[6px] rounded-[10px] !text-[11px] md:!text-[13px] lg:!text-[14px] !font-medium font-[Montserrat,sans-serif] whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
