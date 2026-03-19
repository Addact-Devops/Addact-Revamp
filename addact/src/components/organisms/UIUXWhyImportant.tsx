import React, { useRef } from "react";
import Image from "next/image";
import type { OurProcess } from "@/graphql/queries/getDevelopmentDesignSlug";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

type UXPoint = {
    id: string;
    title: string;
    description: string;
    number: string;
};

const points: UXPoint[] = [
    {
        id: "01",
        number: "01",
        title: "Improves Usability",
        description:
            "A well-designed interface makes it easier for users to navigate, understand features, and complete tasks efficiently.",
    },
    {
        id: "02",
        number: "02",
        title: "Increases User Engagement",
        description:
            "Intuitive interactions and thoughtful design keep users engaged and encourage them to explore your product further.",
    },
    {
        id: "03",
        number: "03",
        title: "Boosts Conversion Rates",
        description:
            "Clear user journeys reduce friction and guide users toward key actions such as sign-ups, purchases, or feature adoption.",
    },
    {
        id: "04",
        number: "04",
        title: "Reduces User Frustration",
        description:
            "Poor UX creates confusion & drop-offs. Good UX removes obstacles & makes interactions smooth & predictable.",
    },
    {
        id: "05",
        number: "05",
        title: "Improves Usability",
        description:
            "A well-designed interface makes it easier for users to navigate, understand features, and complete tasks efficiently.",
    },
    {
        id: "06",
        number: "06",
        title: "Improves Usability",
        description:
            "A well-designed interface makes it easier for users to navigate, understand features, and complete tasks efficiently.",
    },
    {
        id: "07",
        number: "07",
        title: "Improves Usability",
        description:
            "A well-designed interface makes it easier for users to navigate, understand features, and complete tasks efficiently.",
    },
    {
        id: "08",
        number: "08",
        title: "Improves Usability",
        description:
            "A well-designed interface makes it easier for users to navigate, understand features, and complete tasks efficiently.",
    },
];

const getHeadingText = (titleList?: OurProcess["Title"]) => {
    if (!titleList?.length) {
        return "Why UX Is Important";
    }

    const item = titleList[0] as Record<string, unknown>;

    return (
        (item.h1 as string | undefined) ??
        (item.h2 as string | undefined) ??
        (item.h3 as string | undefined) ??
        (item.h4 as string | undefined) ??
        (item.h5 as string | undefined) ??
        (item.h6 as string | undefined) ??
        "Why UX Is Important"
    );
};

const TiltedCard = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const rotateX = useSpring(0, { damping: 30, stiffness: 100, mass: 2 });
    const rotateY = useSpring(0, { damping: 30, stiffness: 100, mass: 2 });
    const scale = useSpring(1, { damping: 30, stiffness: 100, mass: 2 });
    const glareOpacity = useSpring(0, { damping: 30, stiffness: 100, mass: 2 });
    const mouseX = useMotionValue(50);
    const mouseY = useMotionValue(50);
    const glareX = useSpring(mouseX, { damping: 28, stiffness: 120, mass: 1.4 });
    const glareY = useSpring(mouseY, { damping: 28, stiffness: 120, mass: 1.4 });
    const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 26%, rgba(255,255,255,0) 60%)`;

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const offsetX = event.clientX - rect.left - rect.width / 2;
        const offsetY = event.clientY - rect.top - rect.height / 2;
        const amplitude = 12;
        rotateX.set((offsetY / (rect.height / 2)) * -amplitude);
        rotateY.set((offsetX / (rect.width / 2)) * amplitude);
        mouseX.set(((event.clientX - rect.left) / rect.width) * 100);
        mouseY.set(((event.clientY - rect.top) / rect.height) * 100);
    };

    const resetTilt = () => {
        rotateX.set(0);
        rotateY.set(0);
        scale.set(1);
        glareOpacity.set(0);
    };

    return (
        <div
            ref={ref}
            className='h-full [perspective:900px]'
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {
                scale.set(1.03);
                glareOpacity.set(1);
            }}
            onMouseLeave={resetTilt}
        >
            <motion.div
                className='relative h-full [transform-style:preserve-3d]'
                style={{
                    rotateX,
                    rotateY,
                    scale,
                    willChange: "transform",
                }}
            >
                {children}
                <motion.div
                    className='pointer-events-none absolute inset-0 rounded-[10px]'
                    style={{
                        background: glare,
                        opacity: glareOpacity,
                        mixBlendMode: "screen",
                    }}
                />
            </motion.div>
        </div>
    );
};

const UIUXWhyImportant = ({ data }: { data?: OurProcess | null }) => {
    const heading = getHeadingText(data?.Title);
    const dynamicPoints: UXPoint[] =
        data?.ProcessData?.map((item, index) => ({
            id: item.id ?? `ux-point-${index + 1}`,
            number: String(index + 1).padStart(2, "0"),
            title: item.Title,
            description: item.Description,
        })) ?? [];

    const renderedPoints = dynamicPoints.length > 0 ? dynamicPoints : points;

    return (
        <section className='bg-white px-4 sm:px-8 py-16 md:py-24 lg:py-20! xl:px-16!'>
            <div className='mx-auto w-full max-w-[1604px]'>
                <h2 className='text-center font-montserrat text-[34px] font-semibold! leading-tight text-[#0f0f0f] sm:text-[42px] lg:text-[54px]! xl:text-[60px]!'>
                    {heading}
                </h2>

                <div className='mt-15 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3! xl:grid-cols-4!'>
                    {renderedPoints &&
                        renderedPoints?.length > 0 &&
                        renderedPoints?.map((item) => (
                            <TiltedCard key={item.id}>
                                <article className='relative flex min-h-[200px] flex-col overflow-hidden rounded-[10px] border border-[#3c4cff]/35 bg-gradient-to-b from-[rgba(60,76,255,0)] to-[rgba(60,76,255,0.06)] p-5 shadow-[-5px_5px_16px_0px_rgba(60,76,255,0.14),-4px_4px_12px_0px_rgba(15,15,15,0.10)] sm:min-h-[350px] sm:p-6 xl:py-10! xl:px-6! lg:min-h-[438px]!'>
                                    <Image
                                        src='/figma/uiux/ux-card-bg.png'
                                        alt=''
                                        fill
                                        sizes='(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw'
                                        className='pointer-events-none absolute inset-0 h-full w-full scale-[1.06] object-cover opacity-45 blur-[30px]'
                                    />
                                    <span className='absolute right-5 top-5 font-montserrat text-[62px] font-semibold leading-none text-[#3c4cff]/12 sm:right-6 sm:top-6 sm:text-[82px] lg:text-[100px]'>
                                        {item.number}
                                    </span>
                                    <div className='relative z-10 mt-auto flex flex-col'>
                                        <h3 className='max-w-[216px] font-montserrat text-[16px]! font-semibold! leading-[1.25] text-[#0f0f0f] sm:text-[20px]! lg:text-[24px]!'>
                                            {item.title}
                                        </h3>
                                        <p className='mt-5 font-montserrat text-base font-normal leading-[1.6] text-[#0f0f0f]/80 sm:text-[18px] lg:text-[20px]! w-full xl:w-80 justify-start'>
                                            {item.description}
                                        </p>
                                    </div>
                                </article>
                            </TiltedCard>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default UIUXWhyImportant;
