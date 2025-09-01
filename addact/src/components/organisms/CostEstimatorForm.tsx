"use client";

import React, { useEffect, useMemo, useState } from "react";

const pageOptions = ["Less than 100", "100-500", "500-1000", "1000+"];
const componentOptions = ["Less than 25", "25-50", "Above 50"];
const hostingProviders = [
    "GoDaddy",
    "Hostinger",
    "AWS",
    "Azure",
    "Google Cloud",
    "DigitalOcean",
    "Vercel",
    "Netlify",
    "Cloudflare",
    "Other",
];
const timelineOptions = ["1-3 months", "3-6 months", "Flexible"];

/* ---------- Small UI Bits ---------- */

const ToggleLeftLabel = ({
    checked,
    onChange,
    onTouch,
}: {
    checked: boolean;
    onChange: (val: boolean) => void;
    onTouch?: () => void;
}) => {
    const click = () => {
        onChange(!checked);
        onTouch?.();
    };
    return (
        <div className="flex items-center gap-[10px] 2xl:gap-[20px]">
            <span className="text-[#23272A] text-[14px] md:text-[20px] 2xl:text-[25px] select-none">
                {checked ? "Yes" : "No"}
            </span>

            <button
                type="button"
                aria-pressed={checked}
                onClick={click}
                className={`relative md:inline-flex items-center h-[22px] md:h-[33px] 2xl:h-[50px] w-[40px] md:w-[50px] 2xl:w-[88px] flex-shrink-0 cursor-pointer rounded-full border-[2px] md:border-[3px] 2xl:border-[6px] border-transparent transition-colors duration-200 ease-in-out ${
                    checked ? "bg-[#3C4CFF]" : "bg-[#D6D9FF]"
                }`}
            >
                <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-[16px] md:h-[26px] 2xl:h-[38px] w-[16px] md:w-[26px] 2xl:w-[38px] rounded-full bg-white 
                    shadow-[0px_2.39px_4.79px_0px_#1018280F,0px_2.39px_7.18px_0px_#1018281A] ring-0 transition duration-200 ease-in-out

                    /* Mobile (<md): absolute knob so default left align */
                    absolute top-1/2 -translate-y-1/2
                    ${checked ? "left-[19px]" : "left-[2px]"}

                    /* md+ : restore original flow + translate logic */
                    md:static md:top-auto md:left-auto md:-translate-y-0
                    ${checked ? "md:translate-x-[18px] 2xl:translate-x-[38px]" : "md:translate-x-0"}
                `}
                />
            </button>
        </div>
    );
};

const NumberInput = ({
    value,
    onChange,
    min = 0,
    placeholder = "Enter Number",
    onTouch,
}: {
    value: number | "";
    onChange: (v: number | "") => void;
    min?: number;
    placeholder?: string;
    onTouch?: () => void;
}) => {
    const [text, setText] = useState<string>(value === "" ? "" : String(value));

    useEffect(() => {
        setText(value === "" ? "" : String(value));
    }, [value]);

    const parse = (raw: string): number | "" => {
        if (raw.trim() === "") return "";
        const n = Number(raw.replace(/[^\d-]/g, ""));
        if (Number.isNaN(n)) return "";
        return Math.max(min, Math.trunc(n));
    };

    return (
        <div className="relative md:inline-flex mt-[15px] md:mt-0">
            <input
                type="text"
                value={text}
                onChange={(e) => {
                    const t = e.target.value;
                    setText(t);
                    onChange(parse(t)); // live update
                    onTouch?.();
                }}
                placeholder={placeholder}
                className="w-full md:w-[280px] 2xl:w-[345px] h-[40px] md:h-[50px] 2xl:h-[70px] pr-[30px] md:pr-[44px] pl-4 border rounded-md text-[14px] xl:text-[18px] 2xl:text-[25px] outline-none border-[#3C4CFF66] focus:border-[#3C4CFF] text-[#23272A]"
            />
            <div className="absolute right-[10px] md:right-[20px] top-1/2 -translate-y-1/2 flex flex-col gap-[4px] 2xl:gap-[7px]">
                <button
                    type="button"
                    aria-label="Increase"
                    onClick={() => {
                        const next = (typeof value === "number" ? value : Math.max(min, 0)) + 1;
                        setText(String(next));
                        onChange(next);
                        onTouch?.();
                    }}
                    className="rounded-[6px] bg-white flex items-center justify-center"
                >
                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" className="!w-[12px]">
                        <path
                            d="M1 7.5L7 1.5L13 7.5"
                            stroke="#3C4CFF"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <button
                    type="button"
                    aria-label="Decrease"
                    onClick={() => {
                        const base = typeof value === "number" ? value : Math.max(min, 0);
                        const next = Math.max(min, base - 1);
                        setText(String(next));
                        onChange(next);
                        onTouch?.();
                    }}
                    className="bg-white flex items-center justify-center"
                >
                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" className="!w-[12px]">
                        <path
                            d="M1 1.5L7 7.5L13 1.5"
                            stroke="#3C4CFF"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

/* ---------- Reusable Question Title (Absolute blue number + 15px left padding) ---------- */
const QTitle = ({ num, children }: { num: number; children: React.ReactNode }) => (
    <div className="relative pl-[28px] md:pl-[40px] 2xl:pl-[60px] text-[14px] md:text-[20px] xl:text-[23px] 2xl:text-[28px] text-[#23272A] font-[600]">
        <span className="absolute left-0 top-0 text-[#3C4CFF]">{`${String(num).padStart(2, "0")}.`}</span>
        {children}
    </div>
);

/* ---------- NEW ProgressRing (300px, 1px base ring, 28.08px gradient arc, center icon) ---------- */
const ProgressRing = ({ percent, label }: { percent: number; label: string }) => {
    // 250px below 2xl (1536px), 300px at/above 2xl
    const [size, setSize] = React.useState<number>(250);
    const [stroke, setStroke] = React.useState<number>(20); // default 20 below 2xl

    React.useEffect(() => {
        const apply = () => {
            if (typeof window !== "undefined" && window.matchMedia("(min-width: 1536px)").matches) {
                setSize(300);
                setStroke(28.08);
            } else {
                setSize(250);
                setStroke(20);
            }
        };
        apply();
        window.addEventListener("resize", apply);
        return () => window.removeEventListener("resize", apply);
    }, []);

    const cx = size / 2;
    const cy = size / 2;

    // Keep original look at 300px, but ensure no clipping at 250px
    // Add a small padding so stroke never touches the edges.
    const padding = 4; // px
    const baseR = 135; // original radius for 300px
    const safeRForSize = Math.floor(size / 2 - stroke / 2 - padding);
    const r = size >= 300 ? baseR : safeRForSize;

    const circumference = 2 * Math.PI * r;
    const dash = circumference;
    const offset = circumference * (1 - Math.min(Math.max(percent, 0), 100) / 100);

    // unique gradient id to avoid DOM clashes if multiple rings render
    const gradId = React.useMemo(() => `ringGrad-${label.replace(/\s+/g, "-")}`, [label]);

    // scale the center icon a bit when size is 250 (proportional to the 300px baseline)
    const iconScale = size / 300; // 1 at 300px, ~0.833 at 250px
    const iconW = Math.round(105 * iconScale);
    const iconH = Math.round(95 * iconScale);

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <defs>
                    {/* gradient along the stroke (approximate 90deg as in your spec) */}
                    <linearGradient id={gradId} x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="0%" stopColor="#6571FF" />
                        <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>
                </defs>

                {/* 1px default circle border */}
                <circle
                    cx={cx}
                    cy={cy}
                    r={r + stroke / 5}
                    fill="none"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth={1}
                />

                {/* Progress arc (starts at top, clockwise) */}
                <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke={`url(#${gradId})`}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={`${dash} ${dash}`}
                    strokeDashoffset={offset}
                    transform={`rotate(-90 ${cx} ${cy})`}
                    /* smooth ring fill change */
                    style={{ transition: "stroke-dashoffset 500ms ease-in-out" }}
                />
            </svg>

            {/* center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                {/* your icon (unchanged paths, only width/height scale when size=250) */}
                <svg width={iconW} height={iconH} viewBox="0 0 120 113" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.28472 95.1842L19.6199 111.519C20.2482 112.148 20.8765 112.776 22.133 112.776C23.3896 112.776 24.0179 112.148 24.6462 111.519C34.6986 101.467 47.2642 96.4408 60.458 96.4408C73.6518 96.4408 86.2174 101.467 96.2698 111.519C96.8981 112.148 97.5264 112.776 98.7829 112.776C99.4112 112.776 100.668 112.148 101.296 111.519L117.631 95.1842C120.144 92.6711 120.144 89.5297 117.631 87.0166L79.3063 48.6917C72.3953 43.6655 66.1125 41.1523 59.8297 41.1523C53.5469 41.1523 46.6359 43.6655 42.2379 48.6917L3.28472 87.0166C1.39989 88.9014 1.39989 92.6711 3.28472 95.1842Z"
                        fill="white"
                    />
                    <path
                        d="M27.1627 49.3198L34.7021 41.7805C40.9848 35.4977 49.7807 31.728 59.2049 31.728C68.6291 31.728 77.4249 35.4977 83.7077 41.7805L91.247 49.3198L117.006 23.5604C118.263 22.3039 118.263 20.419 117.006 19.1625L98.7864 0.942416C97.5298 -0.314139 95.645 -0.314139 94.3884 0.942416C74.9118 20.419 42.8697 20.419 22.7648 0.942416C22.7648 -0.314139 20.88 -0.314139 19.6234 0.942416L1.40335 19.1625C0.146799 20.419 0.146799 22.3039 1.40335 23.5604L27.1627 49.3198Z"
                        fill="white"
                        fillOpacity="0.5"
                    />
                </svg>

                <div className="mt-3 md:text-[22px] 2xl:text-[30px] font-[500]">{label}</div>
            </div>
        </div>
    );
};

/* ---------- Main ---------- */

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

const CostEstimatorForm = () => {
    const [step, setStep] = useState<1 | 2 | 3>(1);

    // Keep for initial sidebar view (0% state)
    const [sidebarActivated, setSidebarActivated] = useState(false);

    // Slide-interaction gates
    const [s1Interacted, setS1Interacted] = useState(false);
    const [s2Interacted, setS2Interacted] = useState(false);
    const [s3Interacted, setS3Interacted] = useState(false);

    const s1Visible = s1Interacted || step > 1;
    const s2Visible = s2Interacted || step > 2;
    const s3Visible = s3Interacted || step > 3;

    // Persist state
    const [loaded, setLoaded] = useState(false);

    // Slide 1
    const [sitecoreVersion, setSitecoreVersion] = useState("7.x or older");
    const [sitecoreProduct, setSitecoreProduct] = useState("XP/XM");
    const [pagesIndex, setPagesIndex] = useState(0);
    const [componentsIndex, setComponentsIndex] = useState(0);

    // Touch markers
    const [touchedSV, setTouchedSV] = useState(false);
    const [touchedSP, setTouchedSP] = useState(false);
    const [touchedPages, setTouchedPages] = useState(false);
    const [touchedComponents, setTouchedComponents] = useState(false);

    // Slide 2
    const [hasSubsites, setHasSubsites] = useState(false);
    const [subsiteCount, setSubsiteCount] = useState<number | "">("");
    const [languageCount, setLanguageCount] = useState<number | "">("");
    const [hasCustom, setHasCustom] = useState(false);
    const [customCount, setCustomCount] = useState<number | "">("");

    const [touchedSubsites, setTouchedSubsites] = useState(false);
    const [touchedCustom, setTouchedCustom] = useState(false);
    const [touchedLang, setTouchedLang] = useState(false);

    // Slide 3
    const [hostingProvider, setHostingProvider] = useState<string>("");
    const [hostingOther, setHostingOther] = useState<string>("");
    const [usePersonalization, setUsePersonalization] = useState<boolean>(false);
    const [needsAccessibility, setNeedsAccessibility] = useState<boolean>(false);
    const [timelineIndex, setTimelineIndex] = useState<number>(1);
    const [email, setEmail] = useState<string>("");

    const [touchedHosting, setTouchedHosting] = useState(false);
    const [touchedPers, setTouchedPers] = useState(false);
    const [touchedAccess, setTouchedAccess] = useState(false);
    const [touchedTimeline, setTouchedTimeline] = useState(false);

    // NEW: track select open state for arrow rotation
    const [isHostingOpen, setIsHostingOpen] = useState(false);

    /* ---------- RESTORE ---------- */
    useEffect(() => {
        try {
            const saved = localStorage.getItem("costEstimatorForm");
            if (saved) {
                const d = JSON.parse(saved);

                setStep(d.step ?? 1);
                setSidebarActivated(d.sidebarActivated ?? false);

                setS1Interacted(d.s1Interacted ?? false);
                setS2Interacted(d.s2Interacted ?? false);
                setS3Interacted(d.s3Interacted ?? false);

                setSitecoreVersion(d.sitecoreVersion ?? "7.x or older");
                setSitecoreProduct(d.sitecoreProduct ?? "XP/XM");
                setPagesIndex(d.pagesIndex ?? 0);
                setComponentsIndex(d.componentsIndex ?? 0);

                setTouchedSV(d.touchedSV ?? false);
                setTouchedSP(d.touchedSP ?? false);
                setTouchedPages(d.touchedPages ?? false);
                setTouchedComponents(d.touchedComponents ?? false);

                setHasSubsites(d.hasSubsites ?? false);
                setSubsiteCount(d.subsiteCount ?? "");
                setLanguageCount(d.languageCount ?? "");
                setHasCustom(d.hasCustom ?? false);
                setCustomCount(d.customCount ?? "");

                setHostingProvider(d.hostingProvider ?? "");
                setHostingOther(d.hostingOther ?? "");
                setUsePersonalization(d.usePersonalization ?? false);
                setNeedsAccessibility(d.needsAccessibility ?? false);
                setTimelineIndex(d.timelineIndex ?? 1);
                setEmail(d.email ?? "");

                setTouchedSubsites(d.touchedSubsites ?? false);
                setTouchedLang(d.touchedLang ?? false);
                setTouchedCustom(d.touchedCustom ?? false);
                setTouchedHosting(d.touchedHosting ?? false);
                setTouchedPers(d.touchedPers ?? false);
                setTouchedAccess(d.touchedAccess ?? false);
                setTouchedTimeline(d.touchedTimeline ?? false);
            }
        } catch {}
        setLoaded(true);
    }, []);

    /* ---------- SAVE ---------- */
    useEffect(() => {
        if (!loaded) return;
        const d = {
            step,
            sidebarActivated,

            s1Interacted,
            s2Interacted,
            s3Interacted,

            sitecoreVersion,
            sitecoreProduct,
            pagesIndex,
            componentsIndex,

            touchedSV,
            touchedSP,
            touchedPages,
            touchedComponents,

            hasSubsites,
            subsiteCount,
            languageCount,
            hasCustom,
            customCount,

            hostingProvider,
            hostingOther,
            usePersonalization,
            needsAccessibility,
            timelineIndex,
            email,

            touchedSubsites,
            touchedLang,
            touchedCustom,
            touchedHosting,
            touchedPers,
            touchedAccess,
            touchedTimeline,
        };
        localStorage.setItem("costEstimatorForm", JSON.stringify(d));
    }, [
        loaded,
        step,
        sidebarActivated,
        s1Interacted,
        s2Interacted,
        s3Interacted,
        sitecoreVersion,
        sitecoreProduct,
        pagesIndex,
        componentsIndex,
        touchedSV,
        touchedSP,
        touchedPages,
        touchedComponents,
        hasSubsites,
        subsiteCount,
        languageCount,
        hasCustom,
        customCount,
        hostingProvider,
        hostingOther,
        usePersonalization,
        needsAccessibility,
        timelineIndex,
        email,
        touchedSubsites,
        touchedLang,
        touchedCustom,
        touchedHosting,
        touchedPers,
        touchedAccess,
        touchedTimeline,
    ]);

    /* ---------- Answers for the right sidebar ---------- */
    const answers = useMemo(() => {
        const items: { id: string; text: string }[] = [];
        let id = 1;

        if (s1Visible) {
            items.push({ id: `${String(id++).padStart(2, "0")}.`, text: sitecoreVersion });
            items.push({ id: `${String(id++).padStart(2, "0")}.`, text: sitecoreProduct });
            items.push({
                id: `${String(id++).padStart(2, "0")}.`,
                text:
                    pagesIndex === 0
                        ? "< 100 pages"
                        : pagesIndex === 1
                        ? "100–500 pages"
                        : pagesIndex === 2
                        ? "500–1000 pages"
                        : "1000+ pages",
            });
            items.push({
                id: `${String(id++).padStart(2, "0")}.`,
                text:
                    componentsIndex === 0
                        ? "< 25 components"
                        : componentsIndex === 1
                        ? "25–50 components"
                        : "> 50 components",
            });
        }

        if (s2Visible) {
            const subsiteText =
                hasSubsites && subsiteCount !== ""
                    ? `sub-websites: ${subsiteCount} `
                    : hasSubsites
                    ? "Sub-websites"
                    : "No sub-websites";

            items.push({ id: `${String(id++).padStart(2, "0")}.`, text: subsiteText });

            items.push({
                id: `${String(id++).padStart(2, "0")}.`,
                text: languageCount !== "" ? `Languages: ${languageCount}` : `Languages: ${languageCount}`,
            });

            const customText =
                hasCustom && customCount !== ""
                    ? `custom modules/pipelines: ${customCount} `
                    : hasCustom
                    ? "Custom modules/pipelines:"
                    : "custom modules/pipelines: No";

            items.push({ id: `${String(id++).padStart(2, "0")}.`, text: customText });
        }

        if (s3Visible) {
            items.push({
                id: `${String(id++).padStart(2, "0")}.`,
                text:
                    hostingProvider === ""
                        ? "Hosting: pending"
                        : hostingProvider === "Other" && hostingOther
                        ? `Hosting: ${hostingOther}`
                        : `Hosting: ${hostingProvider}`,
            });
            items.push({
                id: `${String(id++).padStart(2, "0")}.`,
                text: `Personalization: ${usePersonalization ? "Yes" : "No"}`,
            });
            items.push({
                id: `${String(id++).padStart(2, "0")}.`,
                text: `Accessibility/GDPR: ${needsAccessibility ? "Yes" : "No"}`,
            });
            items.push({
                id: `${String(id++).padStart(2, "0")}.`,
                text: `Timeline: ${timelineOptions[timelineIndex]}`,
            });
        }

        return items;
    }, [
        s1Visible,
        s2Visible,
        s3Visible,
        sitecoreVersion,
        sitecoreProduct,
        pagesIndex,
        componentsIndex,
        hasSubsites,
        subsiteCount,
        languageCount,
        hasCustom,
        customCount,
        hostingProvider,
        hostingOther,
        usePersonalization,
        needsAccessibility,
        timelineIndex,
    ]);

    /* ---------- Progress ---------- */
    const BASE_TOTAL = 10; // S1(4) + S2(3) + S3(3)
    const hostingValid = hostingProvider !== "" && (hostingProvider !== "Other" || hostingOther.trim().length > 0);
    const emailValid = isEmail(email);

    const answeredBase = useMemo(() => {
        let c = 0;

        if (s1Visible) c += 4;

        if (s2Visible) {
            c += 2; // subsites + custom defaults
            if (languageCount !== "") c += 1;
        }

        if (s3Visible) {
            c += 2; // personalization + accessibility defaults
            if (hostingValid) c += 1;
        }

        return Math.min(c, BASE_TOTAL);
    }, [s1Visible, s2Visible, s3Visible, languageCount, hostingValid]);

    const percent = Math.round(((answeredBase + (s3Visible && emailValid ? 1 : 0)) / (BASE_TOTAL + 1)) * 100);

    /* ---------- Validation ---------- */
    const slide1Valid = true;
    const slide2Valid =
        languageCount !== "" && (!hasSubsites || subsiteCount !== "") && (!hasCustom || customCount !== "");
    const slide3Valid = hostingValid && emailValid;
    const allValid = slide1Valid && slide2Valid && slide3Valid;

    /* ---------- Helpers ---------- */
    const markS1 = () => {
        if (!s1Interacted) setS1Interacted(true);
        if (!sidebarActivated) setSidebarActivated(true);
    };
    const markS2 = () => {
        if (!s2Interacted) setS2Interacted(true);
    };
    const markS3 = () => {
        if (!s3Interacted) setS3Interacted(true);
    };

    /* ---------- Handlers ---------- */
    const handleSliderChange = (value: number, type: "pages" | "components" | "timeline") => {
        if (type === "pages") {
            setPagesIndex(value);
            setTouchedPages(true);
            markS1();
        }
        if (type === "components") {
            setComponentsIndex(value);
            setTouchedComponents(true);
            markS1();
        }
        if (type === "timeline") {
            setTimelineIndex(value);
            setTouchedTimeline(true);
            markS3();
        }
    };

    const handleArrowClick = (type: "pages" | "components" | "timeline", direction: "prev" | "next") => {
        if (type === "pages") {
            setPagesIndex((v) => (direction === "prev" ? Math.max(0, v - 1) : Math.min(pageOptions.length - 1, v + 1)));
            setTouchedPages(true);
            markS1();
        }
        if (type === "components") {
            setComponentsIndex((v) =>
                direction === "prev" ? Math.max(0, v - 1) : Math.min(componentOptions.length - 1, v + 1)
            );
            setTouchedComponents(true);
            markS1();
        }
        if (type === "timeline") {
            setTimelineIndex((v) =>
                direction === "prev" ? Math.max(0, v - 1) : Math.min(timelineOptions.length - 1, v + 1)
            );
            setTouchedTimeline(true);
            markS3();
        }
    };

    const tryGoToStep2 = () => {
        setStep(2);
        if (!sidebarActivated) setSidebarActivated(true);
    };

    const tryGoToStep3 = () => {
        if (!slide2Valid) {
            setTouchedLang(true);
            if (hasSubsites) setTouchedSubsites(true);
            if (hasCustom) setTouchedCustom(true);
            return;
        }
        setStep(3);
    };

    const [showExpertModal, setShowExpertModal] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [expertName, setExpertName] = useState("");
    const [expertEmail, setExpertEmail] = useState("");
    const [isExpertSubmitting, setIsExpertSubmitting] = useState(false);

    const trySubmit = async () => {
        if (!slide3Valid || !slide2Valid) {
            setTouchedHosting(true);
            setTouchedLang(true);
            if (hasSubsites) setTouchedSubsites(true);
            if (hasCustom) setTouchedCustom(true);
            return;
        }

        setIsSubmitting(true); // 🔹 Start loading

        const formattedAnswers = [
            { label: "Sitecore Version", value: sitecoreVersion },
            { label: "Sitecore Product", value: sitecoreProduct },
            { label: "Number of Pages", value: pageOptions[pagesIndex] },
            { label: "Unique Components", value: componentOptions[componentsIndex] },
            { label: "Sub Website", value: hasSubsites ? subsiteCount || "Yes" : "No" },
            { label: "Language Support", value: languageCount || "N/A" },
            { label: "Custom Modules", value: hasCustom ? customCount || "Yes" : "No" },
            { label: "Hosting Provider", value: hostingProvider === "Other" ? hostingOther : hostingProvider },
            { label: "Personalization Rule", value: usePersonalization ? "Yes" : "No" },
            { label: "Accessibility Standards", value: needsAccessibility ? "Yes" : "No" },
            { label: "Migration Timeline", value: timelineOptions[timelineIndex] },
        ];

        let ipData: Record<string, unknown> = {};
        try {
            const ipRes = await fetch("https://ipapi.co/json/");
            ipData = await ipRes.json();
        } catch (err: unknown) {
            console.error("IP lookup failed", err);
        }

        try {
            const res = await fetch("/api/send-estimation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    answers: formattedAnswers,
                    ip: ipData.ip || "Unknown",
                    country: ipData.country_name || "Unknown",
                    countryCode: ipData.country_code || "Unknown",
                }),
            });

            const result = await res.json();
            if (result.success) {
                setShowThankYou(true); // 🔹 Show Thank You popup
            } else {
                alert("❌ Failed to send email: " + (result.error || "Unknown error"));
            }
        } catch {
            alert("❌ Something went wrong!");
        } finally {
            setIsSubmitting(false); // 🔹 Stop loading
        }
    };

    const handleExpertSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!expertName.trim() || !isEmail(expertEmail)) return;

        setIsExpertSubmitting(true);

        try {
            const res = await fetch("/api/send-estimation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: expertEmail,
                    answers: [
                        { label: "Name", value: expertName },
                        { label: "Source", value: "Contact Our Experts Popup" },
                    ],
                    ip: "Unknown",
                    country: "Unknown",
                    countryCode: "Unknown",
                }),
            });

            const result = await res.json();
            if (result.success) {
                setShowExpertModal(false); // close expert modal
                setShowThankYou(true); // show thank you modal
                setExpertName(""); // reset
                setExpertEmail("");
            } else {
                alert("❌ Failed to send email: " + (result.error || "Unknown error"));
            }
        } catch {
            alert("❌ Something went wrong!");
        } finally {
            setIsExpertSubmitting(false);
        }
    };

    const primaryEnabledClass =
        "bg-[#3C4CFF] rounded-[80px] text-[13px] md:text-[14px] text-white h-[35px] md:h-[42px] 2xl:h-[57px] px-[10px] md:px-[20px] flex items-center justify-center gap-[10px] hover:bg-[#3440CB] font-[500] 2xl:font-[600]";
    const primaryDisabledClass =
        "bg-[#BFC3FF] rounded-[80px] text-[14px] text-white h-[35px] md:h-[42px] 2xl:h-[57px] px-[10px] md:px-[20px] flex items-center justify-center gap-[10px] cursor-not-allowed opacity-70 font-[500] 2xl:font-[600]";

    /* ---------- Shared slider classes with smooth thumb/track transition ---------- */
    const smoothRange = `
        cursor-pointer flex-1 appearance-none bg-transparent
        [&::-webkit-slider-runnable-track]:h-[3px] [&::-webkit-slider-runnable-track]:bg-[#3C4CFF] [&::-webkit-slider-runnable-track]:rounded-full
        [&::-moz-range-track]:h-[3px] [&::-moz-range-track]:bg-[#3C4CFF] [&::-moz-range-track]:rounded-full
        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[30px] 2xl:[&::-webkit-slider-thumb]:h-[50px] [&::-webkit-slider-thumb]:w-[6px] 2xl:[&::-webkit-slider-thumb]:w-[10px]
        [&::-webkit-slider-thumb]:rounded-[90px] [&::-webkit-slider-thumb]:bg-[#3C4CFF] [&::-webkit-slider-thumb]:mt-[-14.5px] 2xl:[&::-webkit-slider-thumb]:mt-[-23.5px]
        [&::-moz-range-thumb]:h-[30px] 2xl:[&::-moz-range-thumb]:h-[50px] [&::-moz-range-thumb]:w-[6px] 2xl:[&::-moz-range-thumb]:w-[10px] [&::-moz-range-thumb]:rounded-[90px] [&::-moz-range-thumb]:bg-[#3C4CFF]
        /* smoothness */
        [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-300 [&::-webkit-slider-thumb]:ease-out
        [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-300 [&::-moz-range-thumb]:ease-out
        [&::-webkit-slider-runnable-track]:transition-all [&::-webkit-slider-runnable-track]:duration-300 [&::-webkit-slider-runnable-track]:ease-out
        `.replace(/\s+/g, " ");

    return (
        <div className="py-[50px] md:py-[70px] lg:py-[100px] bg-black">
            <div className="container xl:flex md:gap-[15px] xl:gap-[24px] items-start">
                {/* Left Panel */}
                <div className="flex-1 bg-white rounded-lg p-[15px] md:p-[30px] xl:p-[40px] 2xl:p-[60px]">
                    <div className="text-[#23272A] text-[20px] md:text-[28px] lg:text-[35px] 2xl:text-[45px] !font-[900] mb-[20px] md:mb-[40px] 2xl:mb-[60px]">
                        Estimator Questions
                    </div>

                    {step === 1 && (
                        <>
                            {/* Q1 */}
                            <div className="mb-[30px] lg:mb-[40px] 2xl:mb-[60px]">
                                <QTitle num={1}>
                                    Which Sitecore version is your website currently running on?{" "}
                                    <span className="text-red-500">*</span>
                                </QTitle>
                                <div className="flex flex-wrap justify-between md:justify-start gap-[20px] xl:gap-[25px] 2xl:gap-[50px] pl-[30px] md:pl-[40px] 2xl:pl-[60px] mt-[15px] md:mt-[20px] 2xl:mt-[40px]">
                                    {["7.x or older", "8.x", "9.x", "10.x"].map((v) => (
                                        <label
                                            key={v}
                                            className="flex w-[46%] md:w-auto basis-[1/2] shrink-0 md:basis-auto md:shrink gap-[7px] md:gap-[10px] 2xl:gap-[20px] text-[14px] md:text-[18px] 2xl:text-[22px] font-[400] text-[#23272A] items-center cursor-pointer"
                                            onClick={() => {
                                                setSitecoreVersion(v);
                                                setTouchedSV(true);
                                                markS1();
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name="sitecoreVersion"
                                                value={v}
                                                checked={sitecoreVersion === v}
                                                readOnly
                                                className="hidden"
                                            />
                                            <span className="w-[15px] md:w-[20px] xl:w-[25px] 2xl:w-[30px] h-[15px] md:h-[20px] xl:h-[25px] 2xl:h-[30px] rounded-full border-[1.5px] 2xl:border-2 flex items-center justify-center border-[#3C4CFF]">
                                                {sitecoreVersion === v && (
                                                    <span className="w-[11px] xl:w-[15px] 2xl:w-[20px] h-[11px] xl:h-[15px] 2xl:h-[20px] bg-[#3C4CFF] rounded-full"></span>
                                                )}
                                            </span>
                                            {v}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Q2 */}
                            <div className="mb-[30px] lg:mb-[40px] 2xl:mb-[60px]">
                                <QTitle num={2}>
                                    Which Sitecore product is your website currently running on?{" "}
                                    <span className="text-red-500">*</span>
                                </QTitle>
                                <div className="flex justify-between md:justify-start gap-[20px] xl:gap-[25px] 2xl:gap-[50px] flex-wrap  pl-[30px] md:pl-[40px] 2xl:pl-[60px] mt-[15px] md:mt-[20px] 2xl:mt-[40px]">
                                    {["XP/XM", "XP/XM + SXA", "XP/XM + Headless JSS"].map((v) => (
                                        <label
                                            key={v}
                                            className="gap-[10px] 2xl:gap-[20px] text-[14px] md:text-[18px] 2xl:text-[22px] font-[400] text-[#23272A] flex items-center cursor-pointer"
                                            onClick={() => {
                                                setSitecoreProduct(v);
                                                setTouchedSP(true);
                                                markS1();
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name="sitecoreProduct"
                                                value={v}
                                                checked={sitecoreProduct === v}
                                                readOnly
                                                className="hidden"
                                            />
                                            <span className="w-[15px] md:w-[20px] xl:w-[25px] 2xl:w-[30px] h-[15px] md:h-[20px] xl:h-[25px] 2xl:h-[30px] rounded-full border-[1.5px] 2xl:border-2 flex items-center justify-center border-[#3C4CFF]">
                                                {sitecoreProduct === v && (
                                                    <span className="w-[11px] xl:w-[15px] 2xl:w-[20px] h-[11px] xl:h-[15px] 2xl:h-[20px] bg-[#3C4CFF] rounded-full"></span>
                                                )}
                                            </span>
                                            {v}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Q3 - Pages */}
                            <div className="mb-[30px] lg:mb-[40px] 2xl:mb-[60px]">
                                <QTitle num={3}>
                                    How many pages does your website have? <span className="text-red-500">*</span>
                                </QTitle>
                                <div className="flex items-center gap-[10px] md:gap-4 mt-[15px] md:mt-[20px] 2xl:mt-[40px] flex-wrap">
                                    {/* Prev button */}
                                    <button
                                        className="h-[30px] md:h-[40px] 2xl:h-[50px] w-[30px] md:w-[40px] 2xl:w-[50px] rounded-full border-[1.5px] 2xl:border-3 border-[#3C4CFF] text-[#3C4CFF] flex items-center justify-center"
                                        onClick={() => handleArrowClick("pages", "prev")}
                                    >
                                        <svg
                                            width="14"
                                            height="24"
                                            className="!w-[9px] md:!w-[12px] 2xl:!w-[14px] md:!h-[20px] 2xl:!h-[24px]"
                                            viewBox="0 0 14 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M11.5703 22L1.57031 12L11.5703 2"
                                                stroke="#3C4CFF"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                    {/* Range */}
                                    <input
                                        type="range"
                                        min={0}
                                        max={pageOptions.length - 1}
                                        step={1}
                                        value={pagesIndex}
                                        onChange={(e) => handleSliderChange(Number(e.target.value), "pages")}
                                        className={smoothRange}
                                    />

                                    {/* Next button */}
                                    <button
                                        className="h_[50px] w_[50px] h-[30px] md:h-[40px] 2xl:h-[50px] w-[30px] md:w-[40px] 2xl:w-[50px] rounded-full border-[1.5px] 2xl:border-3 border-[#3C4CFF] text-[#3C4CFF] flex items-center justify-center"
                                        onClick={() => handleArrowClick("pages", "next")}
                                    >
                                        <svg
                                            width="14"
                                            height="24"
                                            className="!w-[9px] md:!w-[12px] 2xl:!w-[14px] md:!h-[20px] 2xl:!h-[24px]"
                                            viewBox="0 0 14 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M2.42969 22L12.4297 12L2.42969 2"
                                                stroke="#3C4CFF"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                    {/* span (visible only md & above) */}
                                    <span className="hidden md:flex border-[#3C4CFF66] border-1 rounded-[6px] text-[14px] md:text-[18px] 2xl:text-[22px] px-[10px] 2xl:px-[15px] text-[#23272A] w-[170px] md:w-[200px] 2xl:w-[250px] text-center h-[40px] md:h-[50px] 2xl:h-[70px] justify-center items-center transition-all duration-200">
                                        {pageOptions[pagesIndex]}
                                    </span>

                                    {/* span (visible only below md, new row) */}
                                    <span className="flex md:hidden w-full md:mt-3 border-[#3C4CFF66] border-1 rounded-[6px] text-[14px] px-[10px] text-[#23272A] h-[40px] md:h-[50px] justify-center items-center transition-all duration-200">
                                        {pageOptions[pagesIndex]}
                                    </span>
                                </div>
                            </div>

                            {/* Q4 - Components */}
                            <div className="mb-[30px] lg:mb-[40px] 2xl:mb-[60px]">
                                <QTitle num={4}>
                                    How many unique components does your website have?{" "}
                                    <span className="text-red-500">*</span>
                                </QTitle>
                                <div className="flex items-center gap-[10px] 2xl:gap-[20px] mt-[15px] md:mt-[20px] 2xl:mt-[40px] flex-wrap">
                                    <button
                                        className="h-[30px] md:h-[40px] 2xl:h-[50px] w-[30px] md:w-[40px] 2xl:w-[50px] rounded-full border-[1.5px] 2xl:border-3 border-[#3C4CFF] text-[#3C4CFF] flex items-center justify-center"
                                        onClick={() => handleArrowClick("components", "prev")}
                                    >
                                        <svg
                                            width="14"
                                            height="24"
                                            className="!w-[9px] md:!w-[12px] 2xl:!w-[14px] md:!h-[20px] 2xl:!h-[24px]"
                                            viewBox="0 0 14 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M11.5703 22L1.57031 12L11.5703 2"
                                                stroke="#3C4CFF"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                    <input
                                        type="range"
                                        min={0}
                                        max={componentOptions.length - 1}
                                        step={1}
                                        value={componentsIndex}
                                        onChange={(e) => handleSliderChange(Number(e.target.value), "components")}
                                        className={smoothRange}
                                    />

                                    <button
                                        className="h-[30px] md:h-[40px] 2xl:h-[50px] w-[30px] md:w-[40px] 2xl:w-[50px] rounded-full border-[1.5px] 2xl:border-3 border-[#3C4CFF] text-[#3C4CFF] flex items-center justify-center"
                                        onClick={() => handleArrowClick("components", "next")}
                                    >
                                        <svg
                                            width="14"
                                            height="24"
                                            className="!w-[9px] md:!w-[12px] 2xl:!w-[14px] md:!h-[20px] 2xl:!h-[24px]"
                                            viewBox="0 0 14 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M2.42969 22L12.4297 12L2.42969 2"
                                                stroke="#3C4CFF"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                    {/* md+ me inline */}
                                    <span className="hidden md:flex border-[#3C4CFF66] border-1 rounded-[6px] text-[14px] md:text-[18px] 2xl:text-[22px] px-[10px] 2xl:px-[15px] text-[#23272A]  w-[170px] md:w-[200px] 2xl:w-[250px] text-center h-[40px] md:h-[50px] 2xl:h-[70px] justify_center justify-center items-center transition-all duration-200">
                                        {componentOptions[componentsIndex]}
                                    </span>

                                    {/* <md me next row */}
                                    <span className="flex md:hidden w-full md:mt-3 border-[#3C4CFF66] border-1 rounded-[6px] text-[14px] px-[10px] text-[#23272A] h-[40px] md:h-[50px] justify_center justify-center items-center transition-all duration-200">
                                        {componentOptions[componentsIndex]}
                                    </span>
                                </div>
                            </div>

                            {/* Next */}
                            <div className="flex justify-end">
                                <button onClick={tryGoToStep2} className={primaryEnabledClass}>
                                    Next{" "}
                                    <svg
                                        width="16"
                                        height="15"
                                        viewBox="0 0 16 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="!w-[12px] md:!w-[16px]"
                                    >
                                        <path
                                            d="M1 8.50003H12.86L9.23 12.86C9.14595 12.9611 9.08265 13.0778 9.0437 13.2034C9.00474 13.329 8.99091 13.461 9.00298 13.592C9.02736 13.8564 9.15578 14.1003 9.36 14.27C9.56422 14.4398 9.8275 14.5214 10.0919 14.497C10.3563 14.4727 10.6003 14.3442 10.77 14.14L15.77 8.14003C15.8036 8.0923 15.8337 8.04217 15.86 7.99003C15.86 7.94003 15.91 7.91003 15.93 7.86003C16.0233 7.6291 16.0233 7.37096 15.93 7.14003C15.93 7.09003 15.88 7.06003 15.86 7.01003C15.8337 6.95789 15.8036 6.90775 15.77 6.86003L10.77 0.860029C10.686 0.758911 10.5828 0.675337 10.4665 0.61408C10.3501 0.552822 10.2229 0.51508 10.0919 0.503008C9.96099 0.490936 9.82897 0.504772 9.70338 0.543724C9.5778 0.582676 9.46112 0.645983 9.36 0.730029C9.25888 0.814075 9.17531 0.917214 9.11405 1.03356C9.05279 1.1499 9.01505 1.27717 9.00298 1.40811C8.99091 1.53904 9.00474 1.67106 9.0437 1.79665C9.08265 1.92223 9.14595 2.03891 9.23 2.14003L12.86 6.50003H1C0.734784 6.50003 0.48043 6.60539 0.292893 6.79292C0.105357 6.98046 0 7.23481 0 7.50003C0 7.76524 0.105357 8.0196 0.292893 8.20714C0.48043 8.39467 0.734784 8.50003 1 8.50003Z"
                                            fill="#fff"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            {/* Slide 2 Q1 */}
                            <div className="mb-[30px] lg:mb-[40px] 2xl:mb-[60px]">
                                <div className="flex gap-[20px] justify-between">
                                    <QTitle num={1}>Do you have sub-websites that need to be migrated?</QTitle>
                                    <ToggleLeftLabel
                                        checked={hasSubsites}
                                        onChange={(v) => {
                                            setHasSubsites(v);
                                            setTouchedSubsites(true);
                                            markS2();
                                            if (!v) setSubsiteCount("");
                                        }}
                                        onTouch={() => {
                                            setTouchedSubsites(true);
                                            markS2();
                                        }}
                                    />
                                </div>

                                {hasSubsites && (
                                    <div className="md:flex gap-[20px] justify-between items-start  pl-[30px] md:pl-[40px] 2xl:pl-[60px] mt-[15px] md:mt-[20px] 2xl:mt-[40px]">
                                        <div className="flex items-start gap-[10px] 2xl:gap-[20px]">
                                            <span className="w-[10px] 2xl:w-[20px] h-[10px] 2xl:h-[20px] rounded-full bg-[#3C4CFF] mt-[5px] md:mt-[10px] pr-[10px] md:pr-[5px]" />
                                            <span className="text-[14px] md:text-[20px] xl:text-[22px] 2xl:text-[28px] text-[#23272A] font-[600]">
                                                How many sub-websites do you have?
                                            </span>
                                        </div>
                                        <div>
                                            <NumberInput
                                                value={subsiteCount}
                                                onChange={(v) => setSubsiteCount(v)}
                                                onTouch={() => {
                                                    setTouchedSubsites(true);
                                                    markS2();
                                                }}
                                                min={0}
                                                placeholder="Enter Number"
                                            />
                                            {hasSubsites && touchedSubsites && subsiteCount === "" && (
                                                <div className="text-red-500 text-[12px] md:text-sm mt-[5px]">
                                                    Sub-website count is mandatory
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Slide 2 Q2 */}
                            <div className="mb-[40px] 2xl:mb-[60px] md:flex gap-[20px]">
                                <QTitle num={2}>
                                    How many languages does your website currently support?{" "}
                                    <span className="text-red-500">*</span>
                                </QTitle>
                                <div>
                                    <NumberInput
                                        value={languageCount}
                                        onChange={(v) => setLanguageCount(v)}
                                        onTouch={() => {
                                            setTouchedLang(true);
                                            markS2();
                                        }}
                                        min={1}
                                        placeholder="Enter Number"
                                    />
                                    {touchedLang && languageCount === "" && (
                                        <div className="text-red-500 text-[12px] md:text-sm mt-[5px]">
                                            This field is required
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Slide 2 Q3 */}
                            <div className="mb-[30px] lg:mb-[40px] 2xl:mb-[60px]">
                                <div className="flex gap-[20px] items-baseline">
                                    <QTitle num={3}>Do you use any custom modules/pipelines or integrations?</QTitle>
                                    <ToggleLeftLabel
                                        checked={hasCustom}
                                        onChange={(v) => {
                                            setHasCustom(v);
                                            setTouchedCustom(true);
                                            markS2();
                                            if (!v) setCustomCount("");
                                        }}
                                        onTouch={() => {
                                            setTouchedCustom(true);
                                            markS2();
                                        }}
                                    />
                                </div>
                                {hasCustom && (
                                    <div className="md:flex gap-[20px] justify-between items-start  pl-[30px] md:pl-[40px] 2xl:pl-[60px] mt-[15px] md:mt-[20px] 2xl:mt-[40px]">
                                        <div className="flex items-start gap-[10px] 2xl:gap-[20px]">
                                            <span className="w-[10px] 2xl:w-[20px] h-[10px] 2xl:h-[20px] rounded-full bg-[#3C4CFF] pr-[10px] md:pr-[5px] 2xl:pr-[20px] mt-[5px] md:mt-[10px]" />
                                            <span className="text-[14px] md:text-[20px] xl:text-[22px] 2xl:text-[28px] text-[#23272A] font-[600]">
                                                How many custom modules/Pipeline/integrations does your website include?
                                            </span>
                                        </div>
                                        <div>
                                            <NumberInput
                                                value={customCount}
                                                onChange={(v) => setCustomCount(v)}
                                                onTouch={() => {
                                                    setTouchedCustom(true);
                                                    markS2();
                                                }}
                                                min={0}
                                                placeholder="Enter Number"
                                            />
                                            {hasCustom && touchedCustom && customCount === "" && (
                                                <div className="text-red-500 text-[12px] md:text-sm mt-[5px]">
                                                    Custom module count is mandatory
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Nav Buttons */}
                            <div className="flex justify-end gap-[20px]">
                                <button
                                    onClick={() => setStep(1)}
                                    className="bg-transparent border border-[#3C4CFF] text-[#3C4CFF] rounded-[80px] text-[13px] md:text-[14px] h-[35px] md:h-[42px] 2xl:h-[57px] px-[10px] md:px-[16px] 2xl:px-[24px] flex items-center gap-[10px] font-[600]"
                                >
                                    <svg
                                        width="16"
                                        height="15"
                                        viewBox="0 0 16 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="!w-[12px] md:!w-[16px]"
                                    >
                                        <path
                                            d="M15 8.50003H3.14L6.77 12.86C6.85405 12.9611 6.91735 13.0778 6.9563 13.2034C6.99526 13.329 7.00909 13.461 6.99702 13.592C6.97264 13.8564 6.84422 14.1003 6.64 14.27C6.43578 14.4398 6.1725 14.5214 5.90808 14.497C5.64365 14.4727 5.39974 14.3442 5.23 14.14L0.23 8.14003C0.196361 8.0923 0.166279 8.04217 0.139999 7.99003C0.139999 7.94003 0.0900002 7.91003 0.0699997 7.86003C-0.023304 7.6291 -0.023304 7.37096 0.0699997 7.14003C0.0699997 7.09003 0.119999 7.06003 0.139999 7.01003C0.166279 6.95789 0.196361 6.90775 0.23 6.86003L5.23 0.860029C5.31405 0.758911 5.41719 0.675337 5.53353 0.61408C5.64987 0.552822 5.77715 0.51508 5.90808 0.503008C6.03901 0.490936 6.17103 0.504772 6.29662 0.543724C6.4222 0.582676 6.53888 0.645983 6.64 0.730029C6.74112 0.814075 6.82469 0.917214 6.88595 1.03356C6.94721 1.1499 6.98495 1.27717 6.99702 1.40811C7.00909 1.53904 6.99526 1.67106 6.9563 1.79665C6.91735 1.92223 6.85405 2.03891 6.77 2.14003L3.14 6.50003H15C15.2652 6.50003 15.5196 6.60539 15.7071 6.79292C15.8946 6.98046 16 7.23481 16 7.50003C16 7.76524 15.8946 8.0196 15.7071 8.20714C15.5196 8.39467 15.2652 8.50003 15 8.50003Z"
                                            fill="#3C4CFF"
                                        />
                                    </svg>
                                    Back
                                </button>

                                <button
                                    onClick={tryGoToStep3}
                                    disabled={!slide2Valid}
                                    aria-disabled={!slide2Valid}
                                    className={slide2Valid ? primaryEnabledClass : primaryDisabledClass}
                                >
                                    Next
                                    <svg
                                        width="16"
                                        height="15"
                                        viewBox="0 0 16 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="!w-[12px] md:!w-[16px]"
                                    >
                                        <path
                                            d="M1 8.50003H12.86L9.23 12.86C9.14595 12.9611 9.08265 13.0778 9.0437 13.2034C9.00474 13.329 8.99091 13.461 9.00298 13.592C9.02736 13.8564 9.15578 14.1003 9.36 14.27C9.56422 14.4398 9.8275 14.5214 10.0919 14.497C10.3563 14.4727 10.6003 14.3442 10.77 14.14L15.77 8.14003C15.8036 8.0923 15.8337 8.04217 15.86 7.99003C15.86 7.94003 15.91 7.91003 15.93 7.86003C16.0233 7.6291 16.0233 7.37096 15.93 7.14003C15.93 7.09003 15.88 7.06003 15.86 7.01003C15.8337 6.95789 15.8036 6.90775 15.77 6.86003L10.77 0.860029C10.686 0.758911 10.5828 0.675337 10.4665 0.61408C10.3501 0.552822 10.2229 0.51508 10.0919 0.503008C9.96099 0.490936 9.82897 0.504772 9.70338 0.543724C9.5778 0.582676 9.46112 0.645983 9.36 0.730029C9.25888 0.814075 9.17531 0.917214 9.11405 1.03356C9.05279 1.1499 9.01505 1.27717 9.00298 1.40811C8.99091 1.53904 9.00474 1.67106 9.0437 1.79665C9.08265 1.92223 9.14595 2.03891 9.23 2.14003L12.86 6.50003H1C0.734784 6.50003 0.48043 6.60539 0.292893 6.79292C0.105357 6.98046 0 7.23481 0 7.50003C0 7.76524 0.105357 8.0196 0.292893 8.20714C0.48043 8.39467 0.734784 8.50003 1 8.50003Z"
                                            fill="#fff"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            {/* Slide 3 Q1 */}
                            <div className="mb-[40px] 2xl:mb-[60px] md:flex gap-[20px]">
                                <QTitle num={1}>
                                    Who is your hosting provider for the new frontend environment?{" "}
                                    <span className="text-red-500">*</span>
                                </QTitle>

                                {/* ▼▼ Fixed block: wrapper is relative, arrow rotates on open, stays inside ▼▼ */}
                                <div className="relative mt-[15px] md:mt-0">
                                    <select
                                        value={hostingProvider}
                                        aria-expanded={isHostingOpen}
                                        onFocus={() => setIsHostingOpen(true)}
                                        onBlur={() => setIsHostingOpen(false)}
                                        onChange={(e) => {
                                            setHostingProvider(e.target.value);
                                            setTouchedHosting(true);
                                            markS3();
                                            if (e.target.value !== "Other") setHostingOther("");
                                        }}
                                        className={`w-full md:w-[280px] 2xl:w-full 2xl:min-w-[345px] h-[40px] md:h-[50px] 2xl:h-[70px] px-4 pr-10 border rounded-md text-[14px] md:text-[20px] 2xl:text-[25px] outline-none appearance-none ${
                                            hostingProvider === "Other" && hostingOther.trim().length === 0
                                                ? "border-red-500"
                                                : "border-[#3C4CFF66] focus:border-[#3C4CFF]"
                                        } text-[#23272A] bg-white`}
                                    >
                                        <option value="" disabled>
                                            Select your hosting
                                        </option>
                                        {hostingProviders.map((p) => (
                                            <option key={p} value={p}>
                                                {p}
                                            </option>
                                        ))}
                                    </select>

                                    {/* custom caret (stays inside due to relative wrapper) */}
                                    <div
                                        className={`pointer-events-none absolute right-3 top-[20px] md:top-[25px] 2xl:top-[35px] -translate-y-1/2 transition-transform duration-200 ${
                                            isHostingOpen ? "rotate-180" : ""
                                        }`}
                                    >
                                        <svg
                                            width="14"
                                            height="8"
                                            viewBox="0 0 14 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="!w-[12px]"
                                        >
                                            <path
                                                d="M1 1L7 7L13 1"
                                                stroke="#3C4CFF"
                                                strokeWidth="1.66667"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>

                                    {touchedHosting && hostingProvider === "" && (
                                        <div className="text-red-500 text-[12px] md:text-sm mt-[5px]">
                                            Select a hosting provider
                                        </div>
                                    )}

                                    {hostingProvider === "Other" && (
                                        <>
                                            <input
                                                type="text"
                                                value={hostingOther}
                                                onChange={(e) => {
                                                    setHostingOther(e.target.value);
                                                    setTouchedHosting(true);
                                                    markS3();
                                                }}
                                                placeholder="Type Your Hosting Provider Name"
                                                className={`mt-[10px] md:mt-4 w-full h-[40px] md:h-[50px] 2xl:h-[70px] px-4 border rounded-md text-[14px] md:text-[18px] outline-none text-[#23272A] ${
                                                    hostingOther.trim().length === 0
                                                        ? "border-[#3C4CFF66]"
                                                        : "border-[#3C4CFF66] focus:border-[#3C4CFF]"
                                                }`}
                                            />
                                            {touchedHosting && hostingOther.trim().length === 0 && (
                                                <div className="text-red-500 text-[12px] md:text-sm mt-[5px]">
                                                    Hosting provider name is mandatory
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                                {/* ▲▲ Fixed block end ▲▲ */}
                            </div>

                            {/* Slide 3 Q2 */}
                            <div className="mb-[40px] 2xl:mb-[60px] flex gap-[20px] items-start">
                                <QTitle num={2}>
                                    Do you currently use or plan to set up personalization rules in Sitecore?
                                </QTitle>
                                <ToggleLeftLabel
                                    checked={usePersonalization}
                                    onChange={(v) => {
                                        setUsePersonalization(v);
                                        setTouchedPers(true);
                                        markS3();
                                    }}
                                    onTouch={() => {
                                        setTouchedPers(true);
                                        markS3();
                                    }}
                                />
                            </div>

                            {/* Slide 3 Q3 */}
                            <div className="mb-[60px] flex items-start gap-[10px] 2xl:gap-[20px]">
                                <QTitle num={3}>
                                    Does your website need to comply with accessibility standards (e.g., WCAG 2.1) or
                                    other regulations (e.g., GDPR)?
                                </QTitle>
                                <ToggleLeftLabel
                                    checked={needsAccessibility}
                                    onChange={(v) => {
                                        setNeedsAccessibility(v);
                                        setTouchedAccess(true);
                                        markS3();
                                    }}
                                    onTouch={() => {
                                        setTouchedAccess(true);
                                        markS3();
                                    }}
                                />
                            </div>

                            {/* Slide 3 Q4 - Timeline */}
                            <div className="mb-[30px] lg:mb-[40px] 2xl:mb-[60px]">
                                <QTitle num={4}>
                                    What is your desired migration timeline? <span className="text-red-500">*</span>
                                </QTitle>
                                <div className="flex items-center gap-[10px] md:gap-4 mt-[15px] md:mt-[20px] 2xl:mt-[40px] flex-wrap">
                                    <button
                                        className="h-[30px] md:h-[40px] 2xl:h-[50px] w-[30px] md:w-[40px] 2xl:w-[50px] rounded-full border-[1.5px] 2xl:border-3 border-[#3C4CFF] text-[#3C4CFF] flex items-center justify-center"
                                        onClick={() => handleArrowClick("timeline", "prev")}
                                    >
                                        <svg
                                            width="14"
                                            height="24"
                                            viewBox="0 0 14 24"
                                            fill="none"
                                            className="!w-[12px] 2xl:w-[14px] !h-[15px] md:!h-[20px] 2xl:h-[24px]"
                                        >
                                            <path
                                                d="M11.5703 22L1.57031 12L11.5703 2"
                                                stroke="#3C4CFF"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                    <input
                                        type="range"
                                        min={0}
                                        max={timelineOptions.length - 1}
                                        step={1}
                                        value={timelineIndex}
                                        onChange={(e) => handleSliderChange(Number(e.target.value), "timeline")}
                                        className={smoothRange}
                                    />

                                    <button
                                        className="h-[30px] md:h-[40px] 2xl:h-[50px] w-[30px] md:w-[40px] 2xl:w-[50px] rounded-full border-[1.5px] 2xl:border-3 border-[#3C4CFF] text-[#3C4CFF] flex items-center justify-center"
                                        onClick={() => handleArrowClick("timeline", "next")}
                                    >
                                        <svg
                                            width="14"
                                            height="24"
                                            viewBox="0 0 14 24"
                                            fill="none"
                                            className="!w-[12px] 2xl:w-[14px] !h-[15px] md:!h-[20px] 2xl:h-[24px]"
                                        >
                                            <path
                                                d="M2.42969 22L12.4297 12L2.42969 2"
                                                stroke="#3C4CFF"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                    {/* md+ me inline */}
                                    <span className="hidden md:flex border-[#3C4CFF66] border-1 rounded-[6px] text-[14px] md:text-[18px] 2xl:text-[22px] px-[10px] 2xl:px-[15px] text-[#23272A] md:w-[170px] xl:w-[200px] 2xl:w-[250px] text-center h-[40px] md:h-[50px] 2xl:h-[70px] justify-center items-center transition-all duration-200">
                                        {timelineOptions[timelineIndex]}
                                    </span>

                                    {/* <md me next row */}
                                    <span className="flex md:hidden w-full md:mt-3 border-[#3C4CFF66] border-1 rounded-[6px] text-[14px] px-[10px] text-[#23272A] h-[40px] md:h-[50px] justify-center items-center transition-all duration-200">
                                        {timelineOptions[timelineIndex]}
                                    </span>
                                </div>
                            </div>

                            {/* Slide 3 Q5 - Email */}
                            <div className="mb-[60px] flex items-start gap-[10px] 2xl:gap-[20px] justify-between">
                                <QTitle num={5}>
                                    Your Email Address <span className="text-red-500">*</span>
                                </QTitle>
                                <div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            markS3();
                                        }}
                                        placeholder="Type Your Email Address"
                                        className={`w-full md:w-[280px] 2xl:w-[345px] h-[40px] md:h-[50px] 2xl:h-[70px] px-4 border rounded-md text-[13px] md:text-[20px] 2xl:text-[25px] outline-none ${
                                            email.length === 0
                                                ? "border-[#3C4CFF66]"
                                                : isEmail(email)
                                                ? "border-green-500"
                                                : "border-red-500"
                                        } focus:border-[#3C4CFF] text-[#23272A]`}
                                    />
                                    {!isEmail(email) && email.length > 0 && (
                                        <div className="text-red-500 text-[12px] md:text-sm mt-[5px]">
                                            Email field is required
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Nav Buttons */}
                            <div className="flex justify-end gap-[10px] md:gap-[20px]">
                                <button
                                    onClick={() => setStep(2)}
                                    className="bg-transparent border border-[#3C4CFF] text-[#3C4CFF] rounded-[80px] text-[14px] h-[35px] md:h-[42px] 2xl:h-[57px] px-[10px] md:px-[16px] 2xl:px-[24px] flex items-center gap-[10px] font-[600]"
                                >
                                    <svg
                                        width="16"
                                        height="15"
                                        viewBox="0 0 16 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="md:!w-[16px] md:!h-[15px] !w-[12px] !h-[10px]"
                                    >
                                        <path
                                            d="M15 8.50003H3.14L6.77 12.86C6.85405 12.9611 6.91735 13.0778 6.9563 13.2034C6.99526 13.329 7.00909 13.461 6.99702 13.592C6.97264 13.8564 6.84422 14.1003 6.64 14.27C6.43578 14.4398 6.1725 14.5214 5.90808 14.497C5.64365 14.4727 5.39974 14.3442 5.23 14.14L0.23 8.14003C0.196361 8.0923 0.166279 8.04217 0.139999 7.99003C0.139999 7.94003 0.0900002 7.91003 0.0699997 7.86003C-0.023304 7.6291 -0.023304 7.37096 0.0699997 7.14003C0.0699997 7.09003 0.119999 7.06003 0.139999 7.01003C0.166279 6.95789 0.196361 6.90775 0.23 6.86003L5.23 0.860029C5.31405 0.758911 5.41719 0.675337 5.53353 0.61408C5.64987 0.552822 5.77715 0.51508 5.90808 0.503008C6.03901 0.490936 6.17103 0.504772 6.29662 0.543724C6.4222 0.582676 6.53888 0.645983 6.64 0.730029C6.74112 0.814075 6.82469 0.917214 6.88595 1.03356C6.94721 1.1499 6.98495 1.27717 6.99702 1.40811C7.00909 1.53904 6.99526 1.67106 6.9563 1.79665C6.91735 1.92223 6.85405 2.03891 6.77 2.14003L3.14 6.50003H15C15.2652 6.50003 15.5196 6.60539 15.7071 6.79292C15.8946 6.98046 16 7.23481 16 7.50003C16 7.76524 15.8946 8.0196 15.7071 8.20714C15.5196 8.39467 15.2652 8.50003 15 8.50003Z"
                                            fill="#3C4CFF"
                                        />
                                    </svg>
                                    Back
                                </button>

                                <button
                                    onClick={trySubmit}
                                    disabled={!allValid || isSubmitting}
                                    aria-disabled={!allValid || isSubmitting}
                                    className={`${allValid ? primaryEnabledClass : primaryDisabledClass} relative`}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-2">
                                            <svg
                                                className="animate-spin h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                ></path>
                                            </svg>
                                            Submitting...
                                        </div>
                                    ) : (
                                        "Get Your Estimation Cost"
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </div>

                <div className="hidden xl:block">
                    {/* Right Sidebar */}
                    {step === 1 && !s1Interacted ? (
                        <div className="w-auto xl:w-[350px] 2xl:w-[400px] bg-[#3C4CFF] text-white rounded-lg flex flex-col items-center justify-center py-[40px] px-[20px]">
                            <ProgressRing percent={0} label={`0% Done`} />
                            <p className="text-center text-[14px] mb-[30px]">
                                <span className="font-[600] block">Bored with Questions?</span> Want direct Estimation?
                            </p>
                            <button
                                onClick={() => setShowExpertModal(true)} // 🔹 open modal on click
                                className="bg-white rounded-full px-[15px] 2xl:px-[20px] py-[10px] 2xl:py-[18px] text-[17px] font-[400] text-[#000000] mb-[20px]"
                            >
                                Contact Our Experts
                            </button>
                            <p className="text-xs text-center">
                                <span className="font-bold">3,574</span> People Filled Form
                            </p>
                        </div>
                    ) : (
                        <div className="w-auto xl:w-[350px] 2xl:w-[400px] bg-[#3C4CFF] text-white rounded-lg px-[20px] py-[40px] flex flex-col">
                            <div className="flex flex-col items-center mb-[20px]">
                                <ProgressRing percent={percent} label={`${percent}% Done`} />
                            </div>

                            <div className="pt-[40px] border-t border-white text-center">
                                <div className="text-white text-[22px] 2xl:text-[25px] font-[400] mb-[16px]">
                                    Your Answers:
                                </div>
                                <div className="flex flex-col gap-[8px] items-center text-[#000000]">
                                    {answers.map((a, i) => (
                                        <div
                                            key={`${a.id}-${i}`}
                                            className="inline-flex items-center gap-[8px] bg-white rounded-full text-[14px] 2xl:text-[17px] font-[400] py-[10px] px-[20px]"
                                        >
                                            <div className="font-[600]">{a.id}</div>
                                            <div dangerouslySetInnerHTML={{ __html: a.text }} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-[15px] md:mt-[20px] 2xl:mt-[40px] text-center">
                                <p className="text-center text-[14px] mb-[30px]">
                                    <span className="font-[600] block">Bored with Questions?</span> Want direct
                                    Estimation?
                                </p>
                                <button
                                    onClick={() => setShowExpertModal(true)} // 🔹 open modal on click
                                    className="bg-white rounded-full px-[15px] 2xl:px-[20px] py-[10px] 2xl:py-[18px] text-[17px] font-[400] text-[#000000] mb-[20px]"
                                >
                                    Contact Our Experts
                                </button>

                                <div className="text-[14px] 2xl:text-[17px]">
                                    <span className="font-[700]">3,574</span> People Filled Form
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showExpertModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-[10px] flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-[10px] shadow-lg p-[30px] xl:p-[40px] 2xl:p-[60px] max-w-[500px] 2xl:max-w-[640px] w-full">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowExpertModal(false)}
                            className="absolute top-[30px] right-[30px] text-white text-[20px] xl:text-[30px]"
                        >
                            ✕
                        </button>

                        {/* Heading */}
                        <h3 className="text-[#23272A] !font-[900] mb-[15px] md:mb-[24px]">Contact Our Experts!</h3>
                        <p className="text-[#23272A]">
                            Just fill in the form, and we’ll reach out to start things rolling.
                        </p>

                        {/* Form */}
                        <form onSubmit={handleExpertSubmit} className="mt-[20px] xl:mt-[30px] 2xl:mt-[40px]">
                            <div>
                                <label className="text-[18px] 2xl:text-[25px] text-[#23272A] font-[600] mb-[6px] 2xl:mb-[20px] block">
                                    Your Name <span className="text-[#3C4CFF]">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={expertName}
                                    onChange={(e) => setExpertName(e.target.value)}
                                    placeholder="Enter Your Name"
                                    className="w-full h-[45px] 2xl:h-[70px] px-[12px] xl:px-[20px] border border-[#3C4CFF66] rounded-[6px] text-[16px] md:text-[18px] 2xl:text-[20px] outline-none focus:border-[#3C4CFF] text-[#23272A]"
                                />
                            </div>
                            <div className="mt-[20px] 2xl:mt-[30px]">
                                <label className="text-[18px] 2xl:text-[25px] text-[#23272A] font-[600] mb-[6px] 2xl:mb-[20px] block">
                                    Your Email <span className="text-[#3C4CFF]">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={expertEmail}
                                    onChange={(e) => setExpertEmail(e.target.value)}
                                    placeholder="Enter Your Email"
                                    className={`w-full h-[45px] 2xl:h-[70px] px-[12px] xl:px-[20px] border rounded-[6px] text-[16px] md:text-[18px] 2xl:text-[20px] outline-none text-[#23272A] ${
                                        expertEmail.length === 0
                                            ? "border-[#3C4CFF66]"
                                            : isEmail(expertEmail)
                                            ? "border-green-500"
                                            : "border-red-500"
                                    }`}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!expertName.trim() || !isEmail(expertEmail) || isExpertSubmitting}
                                className={`${
                                    expertName.trim() && isEmail(expertEmail) && !isExpertSubmitting
                                        ? "bg-[#3C4CFF] hover:bg-[#3440CB]"
                                        : "bg-[#BFC3FF] cursor-not-allowed"
                                } rounded-[80px] text-[13px] md:text-[14px] text-white h-[45px] md:h-[42px] 2xl:h-[57px] px-[10px] md:px-[20px] flex items-center justify-center gap-[10px] font-[500] 2xl:font-[600] relative mt-[30px] xl:mt-[40px] 2xl:mt-[60px] w-full`}
                            >
                                {isExpertSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="animate-spin h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                            ></path>
                                        </svg>
                                        Submitting...
                                    </div>
                                ) : (
                                    "Get Your Estimation Cost"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {showThankYou && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-[10px] flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-md w-full text-center">
                        {/* Animated Smiley SVG */}
                        <div className="flex justify-center mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-20 h-20 md:w-24 md:h-24 text-[#3C4CFF]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                {/* Circle (lighter border + animated stroke) */}
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="9"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="animate-draw"
                                />
                                {/* Eyes */}
                                <circle
                                    cx="9"
                                    cy="10"
                                    r="0.8"
                                    fill="currentColor"
                                    className="opacity-0 animate-fadein delay-300"
                                />
                                <circle
                                    cx="15"
                                    cy="10"
                                    r="0.8"
                                    fill="currentColor"
                                    className="opacity-0 animate-fadein delay-500"
                                />
                                {/* Smile (animated like drawing) */}
                                <path
                                    d="M8 15c1.5 1.5 6.5 1.5 8 0"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    className="animate-draw delay-700"
                                />
                            </svg>
                        </div>

                        {/* Heading */}
                        <h2 className="text-2xl md:text-3xl font-bold text-[#3C4CFF] mb-4">Thank You!</h2>

                        {/* Message */}
                        <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
                            Your estimation request has been submitted successfully. Our team will connect with you
                            shortly. For urgent queries, <br />
                            <b className="mt-3 block">
                                call us at{" "}
                                <a href="tel:+919427722717" className="text-[#3C4CFF] font-semibold hover:underline">
                                    +91 94277 22717
                                </a>
                            </b>
                        </p>

                        {/* Close Button */}
                        <button
                            onClick={() => setShowThankYou(false)}
                            className="bg-[#3C4CFF] hover:bg-[#2A37CC] text-white font-semibold px-6 py-3 rounded-full w-full md:w-auto"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CostEstimatorForm;
