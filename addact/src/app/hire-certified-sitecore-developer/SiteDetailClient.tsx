"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import OurPartners from "@/components/organisms/OurPartners";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const IndustriesWeServe = dynamic(() => import("@/components/organisms/IndustriesWeServe"), { ssr: false });

import { Minus, Plus } from "lucide-react";
import StaticOurProcess from "./StaticOurProcess";
import StaticOurInsights from "./StaticOurInsights";
import StaticContactUs from "./StaticContactUs";

const faqs = [
    {
        question: "Why should I hire Sitecore developers from Addact?",
        answer: "Addact provides certified Sitecore developers with proven project experience and strong platform knowledge. We focus on agility, scalability, and delivering enterprise value through tailored development services.",
    },
    {
        question: "Do your Sitecore developers work with XM Cloud and Sitecore XP?",
        answer: "Yes, our developers are trained and experienced with the latest Sitecore products, including XM Cloud, XP, SXA, and CDP integrations.",
    },
    {
        question: "Can I scale the number of Sitecore developers during my project?",
        answer: "Absolutely. Our hiring model is flexible—scale your team up or down based on project phases, timelines, and business goals.",
    },
    {
        question: "How does Addact ensure code quality and performance?",
        answer: "We follow Sitecore coding standards, version control, CI/CD practices, and performance benchmarking to ensure high-quality, maintainable code.",
    },
    {
        question: "What level of support do you offer post-deployment?",
        answer: "Our developers provide continuous monitoring, updates, enhancements, and troubleshooting to ensure your Sitecore website stays optimized and secure.",
    },
    {
        question: "How fast can I hire a Sitecore developer from Addact?",
        answer: "You can start the hiring process immediately. After understanding your requirements, we share relevant CVs within 24–48 hours and begin onboarding in just a few days.",
    },
];

export default function SiteDetailClient() {
    const [activeTab, setActiveTab] = useState("expertise");
    const [currentSlide, setCurrentSlide] = useState(0);

    // FAQ open states
    const [openIndexes, setOpenIndexes] = useState<number[] | null>(null);

    useEffect(() => {
        const stored = typeof window !== "undefined" && sessionStorage.getItem("faq-open-static");
        if (stored) {
            setOpenIndexes(JSON.parse(stored));
        } else {
            setOpenIndexes([0]); // default open first one
        }
    }, []);

    useEffect(() => {
        if (openIndexes !== null) {
            sessionStorage.setItem("faq-open-static", JSON.stringify(openIndexes));
        }
    }, [openIndexes]);

    const toggleIndex = (index: number) => {
        setOpenIndexes((prev) => {
            if (!prev) return [index];
            return prev[0] === index ? [] : [index];
        });
    };

    const sliderSettings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (_: number, next: number) => setCurrentSlide(next),
    };

    const getIndicatorStyle = (totalSlides: number) => {
        const segmentWidth = 100 / totalSlides;
        return {
            width: `${segmentWidth}%`,
            left: `${currentSlide * segmentWidth}%`,
        };
    };

    // Mobile accordion (Why Choose Addact)
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (openIndexes === null) return null;

    return (
        <>
            <main className="bg-dark">
                <header className="fixed top-0 w-full z-50 bg-[#0F0F0F] shadow-[0_4px_12px_rgba(60,76,255,0.25)]">
                    <div className="container mx-auto flex justify-center items-center py-[20px] xl:py-[30px]">
                        <Image
                            src="https://d3l7d9gtq0bnch.cloudfront.net/Logo_1_ffdf03e2d1.png"
                            alt="Company Logo"
                            width={220}
                            height={27}
                            className="w-[160px] h-[20px] xl:w-[220px] xl:h-[27px]"
                        />
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative text-white overflow-hidden">
                    <Image
                        alt="Hire Sitecore Developer for Smarter Workflows "
                        src="https://d3l7d9gtq0bnch.cloudfront.net/Hire_Sitecore_Dev_9a5274b54e.png"
                        fill
                        decoding="async"
                        className="object-cover object-center z-0"
                        style={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            inset: 0,
                            color: "transparent",
                        }}
                    />
                    <div className="absolute bg-[rgba(0,0,0,0.5)]"></div>
                    <div className="relative container mt-[68px] md:mt-[120px] min-h-[550px] 2xl:min-h-[659px] flex flex-col lg:justify-center justify-end h-full mb-[40px] lg:mb-0">
                        <div className="text-left max-w-[95%]">
                            <h1 className="text-white mb-[10px] md:mb-[15px] !font-bold !text-[33px] md:!text-[45px] leading-[55px] 2xl:!text-[60px] !2xl:leading-[63px] lg:max-w-[60%]">
                                Hire Sitecore Developer for Smarter Workflows{" "}
                            </h1>
                            <div className="text-white text-[15px] leading-[25px] lg:text-[17px] lg:leading-[30px] font-normal mt-0 lg:max-w-[50%]">
                                Hire Sitecore developers who bring platform expertise, agility, and strategic value to
                                every digital experience.&nbsp;
                            </div>
                            <div className="mt-10">
                                <button
                                    onClick={() => {
                                        document.querySelector("#contact-us")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="px-[15px] py-[12px] md:px-6 md:py-3 rounded-xl cursor-pointer font-semibold text-[15px] md:text-[18px] bg-[#3c4cff] text-white"
                                >
                                    Hire Now
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <OurPartners />
                <section className="my-[60px] xl:my-[100px] 2xl:my-[200px]">
                    <div className="container">
                        <div className="flex flex-col">
                            <h2 className="border-after !text-[28px] md:!text-[40px] 2xl:!text-[60px] !pb-4 xl:!pb-10 xl:max-w-[40%] 2xl:max-w-[50%]">
                                Our Sitecore Development Services
                            </h2>

                            <div className="w-full text-white mt-12 lg:mt-24">
                                {/* Tabs */}
                                <div className="max-w-none w-fit p-[5px] mx-auto border border-[#1C1C1C] rounded-xl mb-[25px] md:mb-16">
                                    <div className="flex justify-center gap-1">
                                        <button
                                            onClick={() => {
                                                setActiveTab("expertise");
                                                setCurrentSlide(0);
                                            }}
                                            className={`px-[15px] py-[12px] md:px-6 md:py-3 rounded-xl cursor-pointer font-semibold text-[15px] md:text-[18px] ${
                                                activeTab === "expertise" ? "bg-[#3c4cff] text-white" : ""
                                            }`}
                                        >
                                            Our Expertise
                                        </button>
                                        <button
                                            onClick={() => {
                                                setActiveTab("hiring");
                                                setCurrentSlide(0);
                                            }}
                                            className={`px-[15px] py-[12px] md:px-6 md:py-3 rounded-xl cursor-pointer font-semibold text-[15px] md:text-[18px] ${
                                                activeTab === "hiring" ? "bg-[#3c4cff] text-white" : ""
                                            }`}
                                        >
                                            Our Hiring Model
                                        </button>
                                    </div>
                                </div>

                                {/* Expertise Tab */}
                                {activeTab === "expertise" && (
                                    <>
                                        {/* Desktop grid */}
                                        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <div className="group relative md:bg-[#1C1C1C] border-l-[5px] border-[#3C4CFF] sm:p-8 p-[20px]">
                                                <h3 className="text-white !text-[20px] md:!text-[30px] mb-6">
                                                    Sitecore Development Services
                                                </h3>
                                                <p>
                                                    Build personalized, scalable, and high-performing digital platforms
                                                    and get custom Sitecore implementations, component development, and
                                                    optimization.
                                                </p>
                                            </div>
                                            <div className="group relative md:bg-[#1C1C1C] border-l-[5px] border-[#3C4CFF] sm:p-8 p-[20px]">
                                                <h3 className="text-white !text-[20px] md:!text-[30px] mb-6">
                                                    Sitecore Migration Services
                                                </h3>
                                                <p>
                                                    Seamlessly migrate from legacy platforms to Sitecore and ensure
                                                    structured planning, zero data loss, and full compatibility with
                                                    your digital ecosystem.
                                                </p>
                                            </div>
                                            <div className="group relative md:bg-[#1C1C1C] border-l-[5px] border-[#3C4CFF] sm:p-8 p-[20px]">
                                                <h3 className="text-white !text-[20px] md:!text-[30px] mb-6">
                                                    Sitecore Managed Services
                                                </h3>
                                                <p>
                                                    From upgrades and monitoring to proactive issue resolution, our
                                                    managed Sitecore services help keep your platform optimized and
                                                    secure at all times.
                                                </p>
                                            </div>
                                            <div className="group relative md:bg-[#1C1C1C] border-l-[5px] border-[#3C4CFF] sm:p-8 p-[20px]">
                                                <h3 className="text-white !text-[20px] md:!text-[30px] mb-6">
                                                    Sitecore Support and Maintenance
                                                </h3>
                                                <p>
                                                    Our post-launch support covering bug fixes, enhancements, updates,
                                                    and ongoing performance tuning to keep your platform stable and
                                                    future ready.
                                                </p>
                                            </div>
                                            <div className="group relative md:bg-[#1C1C1C] border-l-[5px] border-[#3C4CFF] sm:p-8 p-[20px]">
                                                <h3 className="text-white !text-[20px] md:!text-[30px] mb-6">
                                                    Sitecore Upgrade Services
                                                </h3>
                                                <p>
                                                    Upgrade to the latest Sitecore versions and manage the upgrade path
                                                    end-to-end with careful planning and zero downtime, ensuring
                                                    security, features, and scalability.
                                                </p>
                                            </div>
                                            <div className="group relative md:bg-[#1C1C1C] border-l-[5px] border-[#3C4CFF] sm:p-8 p-[20px]">
                                                <h3 className="text-white !text-[20px] md:!text-[30px] mb-6">
                                                    Sitecore Integration Services
                                                </h3>
                                                <p>
                                                    Integrate Sitecore with your CRM, ERP, analytics, and MarTech
                                                    platforms and create unified, omnichannel ecosystems for data-driven
                                                    decisions.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Mobile slider */}
                                        <div className="md:hidden">
                                            <Slider {...sliderSettings}>
                                                <div className="space-y-[16px]">
                                                    <div className="relative group bg-[#1C1C1C] border-l-[3px] border-[#3C4CFF] p-[16px]">
                                                        <h3 className="text-white !text-[20px] md:!text-[30px] mb-3">
                                                            Sitecore Development Services
                                                        </h3>
                                                        <p>
                                                            Build personalized, scalable, and high-performing digital
                                                            platforms and get custom Sitecore implementations, component
                                                            development, and optimization.
                                                        </p>
                                                    </div>
                                                    <div className="relative group bg-[#1C1C1C] border-l-[3px] border-[#3C4CFF] p-[16px]">
                                                        <h3 className="text-white !text-[20px] md:!text-[30px] mb-3">
                                                            Sitecore Migration Services
                                                        </h3>
                                                        <p>
                                                            Seamlessly migrate from legacy platforms to Sitecore and
                                                            ensure structured planning, zero data loss, and full
                                                            compatibility with your digital ecosystem.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="space-y-[16px]">
                                                    <div className="relative group bg-[#1C1C1C] border-l-[3px] border-[#3C4CFF] p-[16px]">
                                                        <h3 className="text-white !text-[20px] md:!text-[30px] mb-3">
                                                            Sitecore Managed Services
                                                        </h3>
                                                        <p>
                                                            From upgrades and monitoring to proactive issue resolution,
                                                            our managed Sitecore services help keep your platform
                                                            optimized and secure at all times.
                                                        </p>
                                                    </div>
                                                    <div className="relative group bg-[#1C1C1C] border-l-[3px] border-[#3C4CFF] p-[16px]">
                                                        <h3 className="text-white !text-[20px] md:!text-[30px] mb-3">
                                                            Sitecore Support and Maintenance
                                                        </h3>
                                                        <p>
                                                            Our post-launch support covering bug fixes, enhancements,
                                                            updates, and ongoing performance tuning to keep your
                                                            platform stable and future ready.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="space-y-[16px]">
                                                    <div className="relative group bg-[#1C1C1C] border-l-[3px] border-[#3C4CFF] p-[16px]">
                                                        <h3 className="text-white !text-[20px] md:!text-[30px] mb-3">
                                                            Sitecore Upgrade Services
                                                        </h3>
                                                        <p>
                                                            Upgrade to the latest Sitecore versions and manage the
                                                            upgrade path end-to-end with careful planning and zero
                                                            downtime, ensuring security, features, and scalability.
                                                        </p>
                                                    </div>
                                                    <div className="relative group bg-[#1C1C1C] border-l-[3px] border-[#3C4CFF] p-[16px]">
                                                        <h3 className="text-white !text-[20px] md:!text-[30px] mb-3">
                                                            Sitecore Integration Services
                                                        </h3>
                                                        <p>
                                                            Integrate Sitecore with your CRM, ERP, analytics, and
                                                            MarTech platforms and create unified, omnichannel ecosystems
                                                            for data-driven decisions.
                                                        </p>
                                                    </div>
                                                </div>
                                            </Slider>

                                            {/* Indicator line */}
                                            <div className="relative mt-[40px] h-[1px] bg-gray-600">
                                                <div
                                                    className="absolute top-0 left-0 h-[2px] bg-[#3C4CFF] transition-all duration-300"
                                                    style={getIndicatorStyle(3)}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Hiring Tab */}
                                {activeTab === "hiring" && (
                                    <>
                                        <p className="text-center max-w-3xl mx-auto text-sm text-gray-300 mb-14 hidden md:block">
                                            We offer multiple hiring models to give you the flexibility, control, and
                                            scalability you need. Looking for a dedicated Sitecore developer for a
                                            long-term engagement or need expert assistance for a shorter phase, hire
                                            Sitecore developer now.{" "}
                                        </p>

                                        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-[#1C1C1C] p-[20px] border border-[#FFFFFF33]">
                                                <h3 className="text-white !text-[20px] md:!text-[30px] mb-6">
                                                    Flexible Engagement
                                                </h3>
                                                <p>
                                                    Choose from full-time, part-time, or project-based Sitecore
                                                    developers tailored to your business needs.
                                                </p>

                                                <button
                                                    onClick={() => {
                                                        document
                                                            .querySelector("#contact-us")
                                                            ?.scrollIntoView({ behavior: "smooth" });
                                                    }}
                                                    rel=""
                                                    className="mt-8 inline-flex items-center justify-center gap-[20px] w-[180px] h-[60px] border border-white rounded-[8px] px-[20px] py-[16px] font-semibold text-[18px] leading-[28px] text-white hover:bg-[#3440CB] hover:border-[#3C4CFF] transition"
                                                >
                                                    Hire Now
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="30"
                                                        height="30"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        className="lucide lucide-arrow-right"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M5 12h14"></path>
                                                        <path d="m12 5 7 7-7 7"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="bg-[#1C1C1C] p-[20px] border border-[#FFFFFF33]">
                                                <h3 className="text-white !text-[20px] md:!text-[30px] mb-6">
                                                    Skilled Professionals
                                                </h3>
                                                <p>
                                                    Work with pre-vetted Sitecore experts with proven experience in
                                                    delivering enterprise-grade solutions.
                                                </p>

                                                <button
                                                    onClick={() => {
                                                        document
                                                            .querySelector("#contact-us")
                                                            ?.scrollIntoView({ behavior: "smooth" });
                                                    }}
                                                    rel=""
                                                    className="mt-8 inline-flex items-center justify-center gap-[20px] w-[180px] h-[60px] border border-white rounded-[8px] px-[20px] py-[16px] font-semibold text-[18px] leading-[28px] text-white hover:bg-[#3440CB] hover:border-[#3C4CFF] transition"
                                                >
                                                    Hire Now
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="30"
                                                        height="30"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        className="lucide lucide-arrow-right"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M5 12h14"></path>
                                                        <path d="m12 5 7 7-7 7"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Mobile slider */}
                                        <div className="md:hidden">
                                            <Slider {...sliderSettings}>
                                                <div>
                                                    <div className="bg-[#1C1C1C] p-[16px] border border-[#FFFFFF33]">
                                                        <h3 className="text-white !text-[20px] md:!text-[30px] mb-3">
                                                            Flexible Engagement
                                                        </h3>
                                                        <p>
                                                            Choose from full-time, part-time, or project-based Sitecore
                                                            developers tailored to your business needs.
                                                        </p>

                                                        <button
                                                            onClick={() => {
                                                                document
                                                                    .querySelector("#contact-us")
                                                                    ?.scrollIntoView({ behavior: "smooth" });
                                                            }}
                                                            rel=""
                                                            className="mt-8 inline-flex items-center justify-center gap-[10px] w-[150px] h-[50px] border border-white rounded-[8px] px-[12px] py-[8px] font-semibold text-[14px] leading-[20px] text-white hover:bg-[#3440CB] hover:border-[#3C4CFF] transition"
                                                        >
                                                            Hire Now
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="30"
                                                                height="30"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                className="lucide lucide-arrow-right !w-[22px] !h-[22px]"
                                                                aria-hidden="true"
                                                            >
                                                                <path d="M5 12h14"></path>
                                                                <path d="m12 5 7 7-7 7"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="bg-[#1C1C1C] p-[16px] border border-[#FFFFFF33]">
                                                        <h3 className="text-white !text-[20px] md:!text-[30px] mb-3">
                                                            Skilled Professionals
                                                        </h3>
                                                        <p>
                                                            Work with pre-vetted Sitecore experts with proven experience
                                                            in delivering enterprise-grade solutions.
                                                        </p>

                                                        <button
                                                            onClick={() => {
                                                                document
                                                                    .querySelector("#contact-us")
                                                                    ?.scrollIntoView({ behavior: "smooth" });
                                                            }}
                                                            rel=""
                                                            className="mt-8 inline-flex items-center justify-center gap-[10px] w-[150px] h-[50px] border border-white rounded-[8px] px-[12px] py-[8px] font-semibold text-[14px] leading-[20px] text-white hover:bg-[#3440CB] hover:border-[#3C4CFF] transition"
                                                        >
                                                            Hire Now
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="30"
                                                                height="30"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                className="lucide lucide-arrow-right !w-[22px] !h-[22px]"
                                                                aria-hidden="true"
                                                            >
                                                                <path d="M5 12h14"></path>
                                                                <path d="m12 5 7 7-7 7"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </Slider>

                                            {/* Indicator line */}
                                            <div className="relative mt-[40px] h-[1px] bg-gray-600">
                                                <div
                                                    className="absolute top-0 left-0 h-[2px] bg-[#3C4CFF] transition-all duration-300"
                                                    style={getIndicatorStyle(2)}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                <IndustriesWeServe />
                <section className="my-[60px] xl:my-[100px] 2xl:my-[200px]">
                    <div className="container">
                        <div className="flex flex-col">
                            <h2 className="border-after !text-[28px] md:!text-[40px] 2xl:!text-[60px] !pb-4 xl:!pb-10">
                                Why Choose Addact
                            </h2>

                            {/* Mobile Accordion */}
                            <div className="block sm:hidden mt-8 -mx-6 bg-[#1c1c1c]">
                                {/* 1 */}
                                <div className="border-t border-b border-gray-700">
                                    <button
                                        onClick={() => toggleAccordion(0)}
                                        className="flex justify-between items-center w-full py-4 px-6 text-left text-white"
                                    >
                                        <span className="text-lg font-[400] md:font-semibold">
                                            Experienced Sitecore Developers
                                        </span>
                                        <svg
                                            className={`w-5 h-5 transform transition-transform duration-300 ${
                                                openIndex === 0 ? "rotate-180" : ""
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {openIndex === 0 && (
                                        <div className="pb-4 px-6 text-[16px] text-white">
                                            Our Sitecore-certified developers are well-versed with SXA, XM Cloud, CDP,
                                            and XP ensuring intelligent, scalable websites that align with your
                                            enterprise goals.
                                        </div>
                                    )}
                                </div>

                                {/* 2 */}
                                <div className="border-b border-gray-700">
                                    <button
                                        onClick={() => toggleAccordion(1)}
                                        className="flex justify-between items-center w-full py-4 px-6 text-left text-white"
                                    >
                                        <span className="text-lg font-[400] md:font-semibold">
                                            Free Sitecore Consultancy
                                        </span>
                                        <svg
                                            className={`w-5 h-5 transform transition-transform duration-300 ${
                                                openIndex === 1 ? "rotate-180" : ""
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {openIndex === 1 && (
                                        <div className="pb-4 px-6 text-[16px] text-white">
                                            Get started with 40 hours of free Sitecore consulting. We help you identify
                                            the right approach, architecture, and developer resources suited to your
                                            objectives.
                                        </div>
                                    )}
                                </div>

                                {/* 3 */}
                                <div className="border-b border-gray-700">
                                    <button
                                        onClick={() => toggleAccordion(2)}
                                        className="flex justify-between items-center w-full py-4 px-6 text-left text-white"
                                    >
                                        <span className="text-lg font-[400] md:font-semibold">
                                            Flexible Hiring Models
                                        </span>
                                        <svg
                                            className={`w-5 h-5 transform transition-transform duration-300 ${
                                                openIndex === 2 ? "rotate-180" : ""
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {openIndex === 2 && (
                                        <div className="pb-4 px-6 text-[16px] text-white">
                                            Choose the model that fits dedicated developers, part-time specialists, or
                                            an entire Sitecore team. We adapt to your project scope and delivery
                                            timeline.
                                        </div>
                                    )}
                                </div>

                                {/* 4 */}
                                <div className="border-b border-gray-700">
                                    <button
                                        onClick={() => toggleAccordion(3)}
                                        className="flex justify-between items-center w-full py-4 px-6 text-left text-white"
                                    >
                                        <span className="text-lg font-[400] md:font-semibold">
                                            Seamless Communication
                                        </span>
                                        <svg
                                            className={`w-5 h-5 transform transition-transform duration-300 ${
                                                openIndex === 3 ? "rotate-180" : ""
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {openIndex === 3 && (
                                        <div className="pb-4 px-6 text-[16px] text-white">
                                            Experience transparent communication and real-time collaboration with our
                                            developers ensuring complete alignment and faster decision-making.
                                        </div>
                                    )}
                                </div>

                                {/* 5 */}
                                <div className="border-b border-gray-700">
                                    <button
                                        onClick={() => toggleAccordion(4)}
                                        className="flex justify-between items-center w-full py-4 px-6 text-left text-white"
                                    >
                                        <span className="text-lg font-[400] md:font-semibold">
                                            Post-Deployment Support
                                        </span>
                                        <svg
                                            className={`w-5 h-5 transform transition-transform duration-300 ${
                                                openIndex === 4 ? "rotate-180" : ""
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {openIndex === 4 && (
                                        <div className="pb-4 px-6 text-[16px] text-white">
                                            We stay involved beyond deployment with ongoing monitoring, enhancements,
                                            bug resolution, and performance optimization.
                                        </div>
                                    )}
                                </div>

                                {/* 6 */}
                                <div className="border-b border-gray-700">
                                    <button
                                        onClick={() => toggleAccordion(5)}
                                        className="flex justify-between items-center w-full py-4 px-6 text-left text-white"
                                    >
                                        <span className="text-lg font-[400] md:font-semibold">
                                            Quality-First Development
                                        </span>
                                        <svg
                                            className={`w-5 h-5 transform transition-transform duration-300 ${
                                                openIndex === 5 ? "rotate-180" : ""
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {openIndex === 5 && (
                                        <div className="pb-4 px-6 text-[16px] text-white">
                                            We follow Sitecore best practices, structured QA processes, and secure
                                            coding standards to deliver robust, enterprise-grade Sitecore services.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Desktop Grid */}
                            <section className="hidden sm:block">
                                <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 sm:mt-14 2xl:mt-24">
                                    {/* Card 1 */}
                                    <div className="relative">
                                        <div className="text-white p-4 2xl:p-7">
                                            <div className="w-10 lg:w-14 lg:h-14 2xl:w-20 h-10 2xl:h-20 mb-4">
                                                <Image
                                                    src="https://d3l7d9gtq0bnch.cloudfront.net/Skilled_CMS_Developers_umbraco_0a48b2cd50.svg"
                                                    alt="Experienced Sitecore Developers"
                                                    width={80}
                                                    height={80}
                                                />
                                            </div>
                                            <h3 className="!text-[25px] 2xl:!text-3xl my-[30px]">
                                                Experienced Sitecore Developers
                                            </h3>
                                            <div className="text-[18px] 2xl:text-[20px] text-white">
                                                Our Sitecore-certified developers are well-versed with SXA, XM Cloud,
                                                CDP, and XP ensuring intelligent, scalable websites that align with your
                                                enterprise goals.
                                            </div>
                                        </div>
                                        <div className="absolute top-1/8 right-0 h-3/4 w-[1px] bg-white opacity-40"></div>
                                    </div>

                                    {/* Card 2 */}
                                    <div className="relative">
                                        <div className="text-white p-4 2xl:p-7">
                                            <div className="w-10 lg:w-14 lg:h-14 2xl:w-20 h-10 2xl:h-20 mb-4">
                                                <Image
                                                    src="https://d3l7d9gtq0bnch.cloudfront.net/40_hours_of_free_Consultancy_umbraco_9989f2b8ce.svg"
                                                    alt="Free Sitecore Consultancy"
                                                    width={80}
                                                    height={80}
                                                />
                                            </div>
                                            <h3 className="!text-[25px] 2xl:!text-3xl my-[30px]">
                                                Free Sitecore Consultancy
                                            </h3>
                                            <div className="text-[18px] 2xl:text-[20px] text-white">
                                                Get started with 40 hours of free Sitecore consulting. We help you
                                                identify the right approach, architecture, and developer resources
                                                suited to your objectives.
                                            </div>
                                        </div>
                                        <div className="absolute top-1/8 right-0 h-3/4 w-[1px] bg-white opacity-40"></div>
                                    </div>

                                    {/* Card 3 */}
                                    <div className="relative">
                                        <div className="text-white p-4 2xl:p-7">
                                            <div className="w-10 lg:w-14 lg:h-14 2xl:w-20 h-10 2xl:h-20 mb-4">
                                                <Image
                                                    src="https://d3l7d9gtq0bnch.cloudfront.net/Agile_and_Flexible_Engagement_Models_umbraco_c181b111cc.svg"
                                                    alt="Flexible Hiring Models"
                                                    width={80}
                                                    height={80}
                                                />
                                            </div>
                                            <h3 className="!text-[25px] 2xl:!text-3xl my-[30px]">
                                                Flexible Hiring Models
                                            </h3>
                                            <div className="text-[18px] 2xl:text-[20px] text-white">
                                                Choose the model that fits dedicated developers, part-time specialists,
                                                or an entire Sitecore team. We adapt to your project scope and delivery
                                                timeline.
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 4 */}
                                    <div className="relative">
                                        <div className="text-white p-4 2xl:p-7">
                                            <div className="w-10 lg:w-14 lg:h-14 2xl:w-20 h-10 2xl:h-20 mb-4">
                                                <Image
                                                    src="https://d3l7d9gtq0bnch.cloudfront.net/Seamless_Communication_umbraco_9bf37df5fd.svg"
                                                    alt="Seamless Communication"
                                                    width={80}
                                                    height={80}
                                                />
                                            </div>
                                            <h3 className="!text-[25px] 2xl:!text-3xl my-[30px]">
                                                Seamless Communication
                                            </h3>
                                            <div className="text-[18px] 2xl:text-[20px] text-white">
                                                Experience transparent communication and real-time collaboration with
                                                our developers ensuring complete alignment and faster decision-making.
                                            </div>
                                        </div>
                                        <div className="absolute top-1/8 right-0 h-3/4 w-[1px] bg-white opacity-40"></div>
                                    </div>

                                    {/* Card 5 */}
                                    <div className="relative">
                                        <div className="text-white p-4 2xl:p-7">
                                            <div className="w-10 lg:w-14 lg:h-14 2xl:w-20 h-10 2xl:h-20 mb-4">
                                                <Image
                                                    src="https://d3l7d9gtq0bnch.cloudfront.net/Post_Deployment_Support_umbraco_f8b8d45b6d.svg"
                                                    alt="Post-Deployment Support"
                                                    width={80}
                                                    height={80}
                                                />
                                            </div>
                                            <h3 className="!text-[25px] 2xl:!text-3xl my-[30px]">
                                                Post-Deployment Support
                                            </h3>
                                            <div className="text-[18px] 2xl:text-[20px] text-white">
                                                We stay involved beyond deployment with ongoing monitoring,
                                                enhancements, bug resolution, and performance optimization.
                                            </div>
                                        </div>
                                        <div className="absolute top-1/8 right-0 h-3/4 w-[1px] bg-white opacity-40"></div>
                                    </div>

                                    {/* Card 6 */}
                                    <div className="relative">
                                        <div className="text-white p-4 2xl:p-7">
                                            <div className="w-10 lg:w-14 lg:h-14 2xl:w-20 h-10 2xl:h-20 mb-4">
                                                <Image
                                                    src="https://d3l7d9gtq0bnch.cloudfront.net/Quality_Focused_Development_umbraco_42912118fa.svg"
                                                    alt="Quality-First Development"
                                                    width={80}
                                                    height={80}
                                                />
                                            </div>
                                            <h3 className="!text-[25px] 2xl:!text-3xl my-[30px]">
                                                Quality-First Development
                                            </h3>
                                            <div className="text-[18px] 2xl:text-[20px] text-white">
                                                We follow Sitecore best practices, structured QA processes, and secure
                                                coding standards to deliver robust, enterprise-grade Sitecore services.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
                <section data-ref="cta-banner2">
                    <div
                        className="text-white bg-center bg-cover bg-no-repeat w-full h-full shadow-md"
                        style={{
                            backgroundImage: 'url("https://d3l7d9gtq0bnch.cloudfront.net/CTA_2_30d48f8e3d.png")',
                        }}
                    >
                        <div className="container">
                            <div className="flex flex-col md:justify-center md:items-center py-[40px] md:py-24 md:text-center">
                                <h2 className="!text-[28px] md:!text-[40px] 2xl:!text-[60px] 2xl:leading-[85px]">
                                    Deliver Faster. Drive Results. Hire Sitecore Experts from Addact.
                                </h2>
                                <button
                                    onClick={() => {
                                        document.querySelector("#contact-us")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="mt-[40px] md:mt-12 bg-white text-[#3C4CFF] text-[16px] lg:text-lg px-4 py-2 lg:px-5 lg:py-4 rounded hover:bg-gray-200 flex items-center gap-5 font-semibold cursor-pointer"
                                >
                                    Talk to Our Experts
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 30 30"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M18.0383 7.4126L25.6258 15.0001L18.0383 22.5876"
                                            stroke="#3C4CFF"
                                            strokeWidth="2"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                        <path
                                            d="M4.375 15L25.4125 15"
                                            stroke="#3C4CFF"
                                            strokeWidth="2"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <StaticOurProcess />

                <ClientTestimonials />
                <StaticOurInsights />
                <section className="my-[60px] xl:my-[100px] 2xl:my-[200px]">
                    <div className="container mx-auto px-4">
                        <h2 className="border-after !text-[28px] md:!text-[40px] 2xl:!text-[60px] !pb-4 xl:!pb-10">
                            Frequently <br className="block" />
                            Asked Questions
                        </h2>

                        <div className="border border-gray-700 mt-12 lg:mt-24">
                            {faqs.map((faq, index) => {
                                const isOpen = openIndexes.includes(index);
                                return (
                                    <div
                                        key={index}
                                        className={`border-t border-gray-700 hover:bg-[#3440CB] ${
                                            index === 0 ? "border-t-0" : ""
                                        }`}
                                    >
                                        <button
                                            onClick={() => toggleIndex(index)}
                                            className="w-full flex items-start text-left transition-colors duration-200 px-0 py-6 pr-5 lg:pr-0"
                                        >
                                            <span className="ml-5 lg:ml-[40px] mr-5 lg:mr-[65px] mt-1 shrink-0 w-5 lg:w-[30px] h-5 lg:h-[30px] flex items-center justify-center">
                                                {isOpen ? (
                                                    <Minus size={30} strokeWidth={2.5} />
                                                ) : (
                                                    <Plus size={30} strokeWidth={2.5} />
                                                )}
                                            </span>
                                            <span
                                                className="font-montserrat text-lg md:text-2xl font-semibold leading-none"
                                                style={{ lineHeight: "100%" }}
                                            >
                                                {faq.question}
                                            </span>
                                        </button>

                                        <div
                                            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out`}
                                            style={{
                                                maxHeight: isOpen ? "500px" : "0px",
                                            }}
                                        >
                                            <div className="pl-[60px] lg:pl-[135px] pr-6 pb-6 text-base md:text-xl font-normal font-montserrat leading-[34px]">
                                                <p>{faq.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <StaticContactUs />

                <footer className="relative bg-[#0F0F0F] text-white lg:py-[60px] py-[40px] border-t border-b border-white/15 z-[4]">
                    {/* Background vertical lines */}
                    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                        <div className="relative w-full h-full">
                            <div
                                className="absolute top-0 bottom-0 w-[1px] bg-white/10"
                                style={{ left: "calc(50% - 247px)" }}
                            ></div>
                            <div
                                className="absolute top-0 bottom-0 w-[1px] bg-white/10"
                                style={{ left: "calc(50% + 247px)" }}
                            ></div>
                            <div
                                className="absolute top-0 bottom-0 w-[1px] bg-white/10"
                                style={{ left: "calc(50% - 494px)" }}
                            ></div>
                            <div
                                className="absolute top-0 bottom-0 w-[1px] bg-white/10"
                                style={{ left: "calc(50% + 494px)" }}
                            ></div>
                            <div
                                className="absolute top-0 bottom-0 w-[1px] bg-white/10"
                                style={{ left: "calc(50% - 741px)" }}
                            ></div>
                            <div
                                className="absolute top-0 bottom-0 w-[1px] bg-white/10"
                                style={{ left: "calc(50% + 741px)" }}
                            ></div>
                            <div
                                className="absolute top-0 bottom-0 w-[1px] bg-white/10"
                                style={{ left: "calc(50% - 988px)" }}
                            ></div>
                            <div
                                className="absolute top-0 bottom-0 w-[1px] bg-white/10"
                                style={{ left: "calc(50% + 988px)" }}
                            ></div>
                            <div className="absolute top-0 bottom-0 w-[1px] bg-white/10 left-1/2 transform -translate-x-1/2"></div>
                        </div>
                    </div>

                    {/* Background icon */}
                    <img
                        alt="footer background"
                        loading="lazy"
                        width={1200}
                        height={1200}
                        decoding="async"
                        className="absolute bottom-0 right-0 max-h-[400px] h-full w-auto z-0 object-cover opacity-100 scale-x-[-1] md:top-0 md:left-0 md:bottom-auto md:right-auto md:max-h-none md:scale-x-100"
                        style={{ color: "transparent" }}
                        src="https://d3l7d9gtq0bnch.cloudfront.net/A_icon_e290067057.png"
                    />

                    <div className="container">
                        <div className="pl-0 relative grid grid-cols-12">
                            {/* Logo + tagline */}
                            <div className="col-span-12 md:col-span-3 flex flex-col justify-start">
                                <img
                                    alt=""
                                    loading="lazy"
                                    width={380}
                                    height={47}
                                    decoding="async"
                                    className="mb-[10px] sm:mb-[15px] lg:mb-[20px]  h-auto w-[170px] lg:w-[200px] xl:w-[320px] 2xl:w-[380px] 2xl:h-[47px]"
                                    style={{ color: "transparent" }}
                                    src="https://d3l7d9gtq0bnch.cloudfront.net/Logo_1_ffdf03e2d1.png"
                                />
                                <p className="text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[20px] 2xl:text-[24px] font-normal text-white">
                                    We add Values!
                                </p>
                            </div>

                            {/* Footer links */}
                            <div className="col-span-12 md:col-span-9 2xl:pl-[142px] 2xl:pr-[35px] xl:pl-[108px] xl:pr-[0px] mt-[40px] md:mt-0">
                                {/* Contact Info - Desktop */}
                                <div className="grid md:grid-cols-2 2xl:gap-4 xl:gap-6">
                                    <div>
                                        <div className="2xl:text-[24px] xl:text-[20px] text-[20px] font-semibold mb-[5px] md:mb-6">
                                            Contact Info
                                        </div>
                                        <div className="custom-html-content">
                                            <p>
                                                <a href="mailto:info@addact.net" className="!mt-0">
                                                    info@addact.net
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-[30px] md:mt-0">
                                        <div className="2xl:text-[24px] xl:text-[20px] text-[20px] font-semibold  mb-[5px] md:mb-6">
                                            INDIA
                                        </div>
                                        <div className="custom-html-content">
                                            <p>
                                                914 Sankalp Square 3B, Sindhu Bhavan Marg, Ahmedabad, Gujarat - 380059{" "}
                                                <a href="tel:919427722717">+91 94277 22717</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}
