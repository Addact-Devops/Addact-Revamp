"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { CaseStudyBySlugResponse, getCaseStudyBySlug } from "@/graphql/queries/getCaseStudyBySlug";
import BlogContentRenderer from "@/components/organisms/BlogContentRenderer";
import DownloadForm from "@/components/templates/downloadForm";
import "../../../styles/components/caseStudy-detail.scss";
import Loader from "@/components/atom/loader";

const CaseStudyDetail = () => {
    const { slug } = useParams();
    const [caseStudy, setCaseStudy] = useState<CaseStudyBySlugResponse["addactCaseStudies"][number]>();
    const [loading, setLoading] = useState(true);

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
        return <Loader />;
    }

    if (!caseStudy) return <p className='p-6 text-red-600 mt-32'>Case Study not found.</p>;

    const hero = caseStudy.HeroBanner[0];
    const formTitle = caseStudy.FormTitle.CommonTitle[0];
    const pdf = caseStudy.CaseStudyPDF;
    const formFields = caseStudy.FormFields;

    return (
        <div className='flex flex-col pt-[120px]'>
            <section className='container relative w-full text-white overflow-hidden'>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-6 mx-auto py-24'>
                    <div>
                        <p className='text-sm text-blue-400 !font-medium'>{hero.PublishDate}</p>
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

            <section className='bg-[#f4f4f4] caseStudy-wrapper pb-20'>
                <div className='container'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto mt-16 text-black'>
                        <div>
                            <BlogContentRenderer blocks={caseStudy.CaseStudyContent} />
                        </div>

                        <div className='lg:ml-36'>
                            <div className='sticky top-[140px] w-full'>
                                <DownloadForm
                                    title='Get your free copy now!'
                                    description={formTitle?.Description}
                                    pdfUrl={pdf.url}
                                    pdfName={pdf.name}
                                    submitUrl='/api/submit-form'
                                    sheetName='Sheet1'
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
};

export default CaseStudyDetail;
