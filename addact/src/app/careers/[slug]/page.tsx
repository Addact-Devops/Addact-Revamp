"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { CareerDetailResponse, getCareerDetailsData } from "@/graphql/queries/getCareerDetails";
import BlogContentRenderer from "@/components/organisms/BlogContentRenderer";
import "../../../styles/components/caseStudy-detail.scss";
import HeroBanner from "@/components/organisms/HeroBanner";
import Loader from "@/components/atom/loader";

const CareerDetail = () => {
    const { slug } = useParams();
    const pathname = usePathname();
    const [careerDetailData, setCareerDetailData] = useState<CareerDetailResponse["careerDetails"][number]>();
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        hyperlink: "",
    });
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const redirectUrl = `${pathname}/thank-you-career`;

    useEffect(() => {
        if (typeof slug === "string") {
            const fetchData = async () => {
                const result = await getCareerDetailsData(slug);
                setCareerDetailData(result.careerDetails[0]);
                setLoading(false);
            };
            fetchData();
        }
    }, [slug]);

    const bannerData = careerDetailData?.Banner?.[0];

    if (loading) {
        return <Loader />;
    }

    if (!careerDetailData) return <p className='p-6 text-red-600 mt-32'>Career Details not found.</p>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // if (resumeFile) {
        //     formData.append("resume", resumeFile);
        //     console.log("in");
        // }

        try {
            const res = await fetch("/api/submit-career-form", {
                method: "POST",
                body: JSON.stringify({
                    ...form,
                    name: form.fullName,
                    sheetName: "Sheet1",
                    RecipientEmails: careerDetailData.careers_form.FormFields.RecipientEmails,
                    pageTitle: "Careers",
                }),
            });

            const result = await res.json();

            if (res.ok) {
                setForm({ fullName: "", email: "", phone: "", hyperlink: "" });
                setResumeFile(null);
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                }
            } else {
                alert(result.error || "Submission failed.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }
    };

    return (
        <div>
            {careerDetailData && (
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

            <section className='bg-[#f4f4f4] py-[40px]'>
                <div className='container'>
                    <div className='caseStudy-wrapper mt-16 text-black'>
                        <BlogContentRenderer blocks={careerDetailData.JobDescription} />
                    </div>
                    <section id='form' className='bg-[#f4f4f4] py-10 scroll-mt-20 md:scroll-mt-32'>
                        <div className='max-w-[1200px] mx-auto bg-white rounded-[20px] overflow-hidden flex flex-col md:flex-row shadow-lg'>
                            {/* Left Image Block */}
                            <div
                                className='w-full md:w-1/3 bg-cover bg-center p-5 pb-12 text-white flex flex-col justify-end'
                                style={{
                                    backgroundImage: `url(${careerDetailData.careers_form.LeftInsights.Image.url})`,
                                }}
                            >
                                <h2 className='!text-[40px] !text-white !font-semibold leading-tight mb-6'>
                                    {careerDetailData.careers_form.LeftInsights.Title}
                                </h2>
                                <div
                                    className='text-white text-base'
                                    dangerouslySetInnerHTML={{
                                        __html: careerDetailData.careers_form.LeftInsights.Description,
                                    }}
                                />
                            </div>

                            {/* Right Form Block */}
                            <div className='w-full md:w-2/3 pt-8 pr-14 pb-14 pl-28 bg-[#f9f9f9]'>
                                {/* Heading */}
                                <h2 className='!text-[45px] font-semibold text-black leading-snug mb-3'>
                                    {careerDetailData.careers_form.FormFields.Form[0]?.Title}
                                </h2>
                                <div
                                    className='text-base text-[#333] mb-6'
                                    dangerouslySetInnerHTML={{
                                        __html: careerDetailData.careers_form.FormFields.Form[0]?.Description,
                                    }}
                                />

                                {/* Upload Resume Horizontal Card with background image */}
                                <div
                                    className='rounded-[16px] overflow-hidden relative bg-cover bg-center p-6 mb-8 flex flex-col md:flex-row justify-between items-center'
                                    style={{
                                        backgroundImage: `url(${careerDetailData.careers_form.FormFields.Form[1]?.Image?.url})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    {/* Left: Text content */}
                                    <div className='text-white md:max-w-[70%]'>
                                        <h3 className='!text-2xl !text-white !font-semibold mb-1'>
                                            {careerDetailData.careers_form.FormFields.Form[1]?.Title}
                                        </h3>
                                        <div
                                            className='prose prose-sm prose-invert text-white max-w-none !text-lg'
                                            dangerouslySetInnerHTML={{
                                                __html: careerDetailData.careers_form.FormFields.Form[1]?.Description,
                                            }}
                                        />
                                    </div>

                                    {/* Right: Button */}
                                    <div className='mt-4 md:mt-0 md:mr-5 md:max-w-[30%]'>
                                        <button
                                            type='button'
                                            onClick={() => fileInputRef.current?.click()}
                                            className='bg-blue-600 text-white text-sm px-5 py-2 rounded-md hover:bg-blue-700 transition-all duration-200'
                                        >
                                            {careerDetailData.careers_form.FormFields.Form[1]?.Link?.label ||
                                                "Upload Resume"}
                                        </button>
                                        <input
                                            ref={fileInputRef}
                                            type='file'
                                            accept='.pdf,.doc,.docx'
                                            className='hidden'
                                            onChange={(e) => {
                                                if (e.target.files?.[0]) {
                                                    setResumeFile(e.target.files[0]);
                                                }
                                            }}
                                        />
                                        {resumeFile && (
                                            <p className='mt-2 text-sm text-green-600 truncate max-w-full'>
                                                {resumeFile.name}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Actual Form */}
                                <form className='space-y-4' onSubmit={handleSubmit}>
                                    <input
                                        type='text'
                                        placeholder={careerDetailData.careers_form.FormFields.NameLable}
                                        className='w-full border border-gray-300 rounded-md px-4 py-2 text-black placeholder-gray-500'
                                        value={form.fullName}
                                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                        required
                                    />
                                    <div className='flex flex-col md:flex-row gap-4'>
                                        <input
                                            type='email'
                                            placeholder={careerDetailData.careers_form.FormFields.EmailLabel}
                                            className='w-full border border-gray-300 rounded-md px-4 py-2 text-black placeholder-gray-500'
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            required
                                        />
                                        <input
                                            type='tel'
                                            placeholder={careerDetailData.careers_form.FormFields.PhoneLabel}
                                            className='w-full border border-gray-300 rounded-md px-4 py-2 text-black placeholder-gray-500'
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <input
                                        type='url'
                                        placeholder={careerDetailData.careers_form.FormFields.GeneralText}
                                        className='w-full border border-gray-300 rounded-md px-4 py-2 text-black placeholder-gray-500'
                                        value={form.hyperlink}
                                        onChange={(e) => setForm({ ...form, hyperlink: e.target.value })}
                                    />

                                    <button
                                        type='submit'
                                        className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 shadow-sm mt-4'
                                    >
                                        {careerDetailData.careers_form.FormFields.ButtonLabel}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default CareerDetail;
