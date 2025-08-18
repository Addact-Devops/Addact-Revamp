"use client";

import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { CareerDetailResponse } from "@/graphql/queries/getCareerDetails";
import BlogContentRenderer from "@/components/organisms/BlogContentRenderer";
import "../../../styles/components/caseStudy-detail.scss";
import HeroBanner from "@/components/organisms/HeroBanner";
import Loader from "@/components/atom/loader";

interface CareerDetailClientProps {
    data: CareerDetailResponse["careerDetails"][number] | undefined;
}

export default function CareerDetailClient({ data }: CareerDetailClientProps) {
    const pathname = usePathname();
    const [formloading, setFromLoading] = useState(false);
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        hyperlink: "",
    });
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const redirectUrl = `${pathname}/thank-you-career`;

    if (!data) return <p className="p-6 text-red-600 mt-32">Career Details not found.</p>;

    const bannerData = data?.Banner?.[0];
    const pageTitle = pathname.split("/").filter(Boolean).pop();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!captchaToken) {
            alert("Please complete the captcha.");
            return;
        }
        setFromLoading(true);
        const formData = new FormData();
        formData.append("name", form.fullName);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("hyperlink", form.hyperlink);
        formData.append("sheetName", "Sheet1");
        formData.append("RecipientEmails", data.careers_form.FormFields.RecipientEmails);
        formData.append("pageTitle", `"${pageTitle}"`);

        if (resumeFile) {
            formData.append("resume", resumeFile);
        }

        try {
            const res = await fetch("/api/submit-career-form", {
                method: "POST",
                body: formData,
            });
            const text = await res.text();
            const result = JSON.parse(text);
            if (res.ok) {
                setForm({ fullName: "", email: "", phone: "", hyperlink: "" });
                setResumeFile(null);
                window.location.href = redirectUrl;
            } else {
                alert(result.error || "Submission failed.");
            }
        } catch (err) {
            console.error("Failed to submit form:", err);
            alert("Something went wrong.");
        } finally {
            setFromLoading(false);
        }
    };

    return (
        <div>
            {data && (
                <HeroBanner
                    title={bannerData?.BannerTitle ?? ""}
                    description={bannerData?.BannerDescription?.replace(/^<p>|<\/p>$/g, "") ?? ""}
                    button={{
                        label: bannerData?.BannerLink?.label ?? "",
                        url: bannerData?.BannerLink?.href ?? "",
                    }}
                    backgroundImageUrl={bannerData?.BannerImage?.url ?? ""}
                />
            )}

            <section className="bg-[#f4f4f4] py-[40px]">
                <div className="container">
                    <div className="caseStudy-wrapper mt-16 text-black">
                        <BlogContentRenderer blocks={data.JobDescription} />
                    </div>

                    {formloading ? (
                        <Loader />
                    ) : (
                        <section id="form" className="bg-[#f4f4f4] py-10 scroll-mt-20 md:scroll-mt-32">
                            <div className="max-w-[1200px] mx-auto bg-white rounded-[20px] overflow-hidden flex flex-col md:flex-row shadow-lg">
                                {/* Left Image Block */}
                                <div
                                    className="w-full md:w-1/3 bg-cover bg-center p-5 pb-12 text-white flex flex-col justify-end"
                                    style={{
                                        backgroundImage: `url(${data.careers_form.LeftInsights.Image.url})`,
                                    }}
                                >
                                    <h2 className="!text-[28px] md:!text-[40px] 2xl:!text-[60px] !text-white !font-semibold leading-tight mb-6">
                                        {data.careers_form.LeftInsights.Title}
                                    </h2>
                                    <div
                                        className="text-white text-base"
                                        dangerouslySetInnerHTML={{
                                            __html: data.careers_form.LeftInsights.Description,
                                        }}
                                    />
                                </div>

                                {/* Right Form Block */}
                                <div className="w-full md:w-2/3 pt-8 pr-14 pb-14 pl-28 bg-[#f9f9f9]">
                                    <h2 className="!text-[28px] md:!text-[40px] 2xl:!text-[60px] font-semibold text-black leading-snug mb-3">
                                        {data.careers_form.FormFields.Form[0]?.Title}
                                    </h2>
                                    <div
                                        className="text-base text-[#333] mb-6"
                                        dangerouslySetInnerHTML={{
                                            __html: data.careers_form.FormFields.Form[0]?.Description,
                                        }}
                                    />

                                    {/* Upload Resume */}
                                    <div
                                        className="rounded-[16px] overflow-hidden relative bg-cover bg-center p-6 mb-8 flex flex-col md:flex-row justify-between items-center"
                                        style={{
                                            backgroundImage: `url(${data.careers_form.FormFields.Form[1]?.Image?.url})`,
                                        }}
                                    >
                                        <div className="text-white md:max-w-[70%]">
                                            <h3 className="!text-2xl !text-white !font-semibold mb-1">
                                                {data.careers_form.FormFields.Form[1]?.Title}
                                            </h3>
                                            <div
                                                className="prose prose-sm prose-invert text-white max-w-none !text-lg"
                                                dangerouslySetInnerHTML={{
                                                    __html: data.careers_form.FormFields.Form[1]?.Description,
                                                }}
                                            />
                                        </div>
                                        <div className="mt-4 md:mt-0 md:mr-5 md:max-w-[30%]">
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="bg-blue-600 text-white text-sm px-5 py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
                                            >
                                                {data.careers_form.FormFields.Form[1]?.Link?.label || "Upload Resume"}
                                            </button>
                                            <input
                                                required
                                                ref={fileInputRef}
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                className="hidden"
                                                onChange={(e) => {
                                                    if (e.target.files?.[0]) {
                                                        setResumeFile(e.target.files[0]);
                                                    }
                                                }}
                                            />
                                            {resumeFile && (
                                                <p className="mt-2 text-sm text-green-600 truncate max-w-full">
                                                    {resumeFile.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actual Form */}
                                    <form className="space-y-4" onSubmit={handleSubmit}>
                                        <input
                                            type="text"
                                            placeholder={data.careers_form.FormFields.NameLable}
                                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-black placeholder-gray-500"
                                            value={form.fullName}
                                            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                            required
                                        />
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <input
                                                type="email"
                                                placeholder={data.careers_form.FormFields.EmailLabel}
                                                className="w-full border border-gray-300 rounded-md px-4 py-2 text-black placeholder-gray-500"
                                                value={form.email}
                                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                required
                                            />
                                            <input
                                                type="tel"
                                                placeholder={data.careers_form.FormFields.PhoneLabel}
                                                className="w-full border border-gray-300 rounded-md px-4 py-2 text-black placeholder-gray-500"
                                                value={form.phone}
                                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder={data.careers_form.FormFields.GeneralText}
                                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-black placeholder-gray-500"
                                            value={form.hyperlink}
                                            onChange={(e) => setForm({ ...form, hyperlink: e.target.value })}
                                        />
                                        <ReCAPTCHA
                                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                                            onChange={(token: string | null) => setCaptchaToken(token)}
                                            className="mx-auto w-full"
                                        />
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 shadow-sm mt-4"
                                        >
                                            {data.careers_form.FormFields.ButtonLabel}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </section>
        </div>
    );
}
