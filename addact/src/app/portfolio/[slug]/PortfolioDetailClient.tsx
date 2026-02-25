"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CaseStudyBySlugResponse, getCaseStudyBySlug } from "@/graphql/queries/getCaseStudyBySlug";
import BlogContentRenderer from "@/components/organisms/BlogContentRenderer";
import DownloadForm from "@/components/templates/downloadForm";
import "../../../styles/components/caseStudy-detail.scss";
import Loader from "@/components/atom/loader";

export default function PortfolioDetailClient({ slug }: { slug: string }) {
    const [caseStudy, setCaseStudy] = useState<CaseStudyBySlugResponse["addactCaseStudies"][number]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            const fetchData = async () => {
                const result = await getCaseStudyBySlug(slug);
                setCaseStudy(result);
                setLoading(false);
            };
            fetchData();
        }
    }, [slug]);

    if (loading) {
        return <Loader />;
    }

    if (!caseStudy) return <p className='p-6 text-red-600 mt-32'>Case Study not found.</p>;

    const hero = caseStudy.HeroBanner[0];
    const formTitle = caseStudy.FormTitle.CommonTitle[0];
    const pdf = caseStudy.CaseStudyPDF;
    const formFields = caseStudy.FormFields;

    return (
        <div className='flex flex-col pt-[80px] md:pt-[100px]'>
            {/* ── Premium Portfolio Banner ── */}
            <section className='relative w-full bg-white overflow-hidden border-b border-zinc-100'>
                {/* Background ambient light */}
                <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-[#3C4CFF]/5 blur-[120px] -z-1' />
                <div className='absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3C4CFF]/5 blur-[100px] -z-1' />

                <div className='container relative z-10'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20 py-16 md:py-24'>
                        
                        {/* Left: Content */}
                        <div className='order-2 lg:order-1'>
                            <div className='inline-flex items-center gap-2 bg-[#3C4CFF]/5 border border-[#3C4CFF]/15 rounded-full px-4 py-1.5 text-[#3C4CFF] text-[11px] font-bold uppercase tracking-wider mb-6'>
                                <span className='w-1.5 h-1.5 rounded-full bg-[#3C4CFF] animate-pulse' />
                                Portfolio
                            </div>

                            <h1 className='text-zinc-900 !font-bold !text-3xl md:!text-5xl leading-[1.15] mb-6'>
                                {hero.BannerTitle}
                            </h1>
                            
                            <div className='flex items-center gap-3 mb-8'>
                                <p className='text-[12px] text-zinc-400 font-medium uppercase tracking-wide px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-md'>
                                    {hero.PublishDate}
                                </p>
                            </div>
                        </div>

                        {/* Right: Image */}
                        <div className='order-1 lg:order-2 relative'>
                            {/* Decorative frame behind image */}
                            <div className='absolute -bottom-6 -right-6 w-full h-full rounded-3xl border-2 border-[#3C4CFF]/10 -z-1 hidden md:block' />
                            
                            <div className='relative aspect-16/10 rounded-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] ring-1 ring-zinc-200'>
                                <Image
                                    src={hero.BannerImage.url}
                                    alt={hero.BannerImage.name}
                                    width={hero.BannerImage.width}
                                    height={hero.BannerImage.height}
                                    className='w-full h-full object-cover transform transition-transform duration-1000 hover:scale-105'
                                    priority
                                />
                                {/* Soft gradient overlay for depth */}
                                <div className='absolute inset-0 bg-linear-to-tr from-black/5 via-transparent to-transparent pointer-events-none' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-[#f4f4f4] caseStudy-wrapper pb-20'>
                <div className='container'>
                    <div className='grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8 mx-auto mt-16 text-black'>
                        <div>
                            <BlogContentRenderer blocks={caseStudy.CaseStudyContent} />
                        </div>

                        <div className='lg:ml-[30px]'>
                            <div className='sticky top-[140px] w-full'>
                                <DownloadForm
                                    title='Get your free copy now!'
                                    description={formTitle?.Description}
                                    pdfUrl={pdf.url}
                                    pdfName={pdf.name}
                                    submitUrl='/api/submit-form'
                                    sheetName='Case_Study'
                                    NameLabel={formFields?.NameLable}
                                    EmailLabel={formFields?.EmailLabel}
                                    PhoneLabel={formFields?.PhoneLabel}
                                    ButtonLabel={formFields?.ButtonLabel}
                                    RecipientEmails={formFields?.RecipientEmails}
                                    pageTitle={`Case-Study-Details ${slug}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
