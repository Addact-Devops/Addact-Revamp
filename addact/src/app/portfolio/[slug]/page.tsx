"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
// import ReCAPTCHA from "react-google-recaptcha";
import { CaseStudyBySlugResponse, getCaseStudyBySlug } from "@/graphql/queries/getCaseStudyBySlug";
import BlogContentRenderer from "@/components/organisms/BlogContentRenderer";
import "../../../styles/components/blogdetail-wrapper.scss";

const CaseStudyDetail = () => {
    const { slug } = useParams();
    const [caseStudy, setCaseStudy] = useState<CaseStudyBySlugResponse["addactCaseStudies"][number]>();
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    // const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof slug === "string") {
            const fetchData = async () => {
                const result = await getCaseStudyBySlug(slug);
                setCaseStudy(result);
                setLoading(false);
            };
            fetchData();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-[50vh]'>
                <div className='w-12 h-12 border-4 border-t-transparent border-red-500 rounded-full animate-spin'></div>
            </div>
        );
    }

    if (!caseStudy) return <p className='p-6 text-red-600'>Case Study not found.</p>;

    const hero = caseStudy.HeroBanner[0];
    const formTitle = caseStudy.FormTitle.CommonTitle[0];
    const pdf = caseStudy.CaseStudyPDF;

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const link = document.createElement("a");
        link.href = pdf.url;
        link.setAttribute("download", pdf.name || "file.pdf");
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className='flex flex-col pt-[120px]'>
            <section className='container relative w-full text-white overflow-hidden'>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-6 md:p-12 mx-auto'>
                    <div>
                        <p className='text-sm text-red-400'>{hero.PublishDate}</p>
                        <h1 className='text-3xl md:text-5xl font-bold mt-2'>{hero.BannerTitle}</h1>
                    </div>
                    <div className='relative aspect-[16/9] md:aspect-auto w-full h-60 md:h-auto'>
                        <Image
                            src={hero.BannerImage.url}
                            alt={hero.BannerImage.name}
                            width={hero.BannerImage.width}
                            height={hero.BannerImage.height}
                            className='object-cover rounded-lg'
                        />
                    </div>
                </div>
            </section>

            <section className='bg-[#f4f4f4] blogdetail-wrapper'>
                <div className='container'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto p-6 md:p-12 mt-16  text-black'>
                        <div>
                            <BlogContentRenderer blocks={caseStudy.CaseStudyContent} />
                        </div>

                        <div className='lg:ml-36'>
                            <div className='sticky top-[140px] w-full'>
                                <form
                                    onSubmit={handleFormSubmit}
                                    className='space-y-4 bg-[#f9f9f9] p-6 rounded-2xl shadow-md lg:max-w-sm w-full'
                                >
                                    <h2 className='text-2xl font-semibold leading-tight mb-4'>
                                        Get your free copy now!
                                    </h2>
                                    <p className='text-gray-600 mb-6'>{formTitle?.Description}</p>

                                    <input
                                        type='text'
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder='Full Name*'
                                        className='w-full p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-red-400'
                                    />

                                    <input
                                        type='email'
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder='Business Email*'
                                        className='w-full p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-red-400'
                                    />

                                    <input
                                        type='tel'
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder='Phone Number*'
                                        className='w-full p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-red-400'
                                    />

                                    {/* <ReCAPTCHA
                                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                                        onChange={(token: string | null) => setCaptchaToken(token)}
                                        className='mx-auto'
                                    /> */}

                                    <button
                                        type='submit'
                                        className='w-full bg-[#f16565] text-white font-semibold py-2 rounded-lg hover:bg-[#e45555] transition'
                                    >
                                        Download
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CaseStudyDetail;
