"use client";

import { useEffect, useState } from "react";
import HeroBanner from "@/components/organisms/HeroBanner";
import { BrandGuidelinesResponse, getBrandGuidelines } from "@/graphql/queries/getBrandGuidelines";
import BlogContentRenderer from "@/components/organisms/BlogContentRenderer";
import "../../styles/components/caseStudy-detail.scss";
import DownloadForm from "@/components/templates/downloadForm";
import Loader from "@/components/atom/loader";

const BrandGuidelinesPage = () => {
    const [brandGuideline, setBrandGuideline] = useState<BrandGuidelinesResponse>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getBrandGuidelines();
            setBrandGuideline(result);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (!brandGuideline) return <p className='p-6 text-red-600 mt-32'>Brand Guidelines not found.</p>;

    const banner = brandGuideline.brandGuideline.HeroBanner.Banner[0];
    const formTitle = brandGuideline.brandGuideline.FromTitle;
    const pdf = brandGuideline.brandGuideline.GuidelinePDF;
    const formFields = brandGuideline.brandGuideline.FormFileds;

    return (
        <div>
            <HeroBanner
                title={banner.BannerTitle || ""}
                description={banner.BannerDescription || ""}
                backgroundImageUrl={banner.BannerImage?.url || ""}
            />
            <section className='bg-[#f4f4f4] caseStudy-wrapper pb-20'>
                <div className='container'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto pt-24 text-black'>
                        <div className='lg:mr-36'>
                            <div className='sticky top-[140px] w-full'>
                                <DownloadForm
                                    title={formTitle}
                                    pdfUrl={pdf.url}
                                    submitUrl='/api/submit-form'
                                    sheetName='Brand-Guidelines'
                                    NameLabel={formFields?.NameLable}
                                    EmailLabel={formFields?.EmailLabel}
                                    PhoneLabel={formFields?.PhoneLabel}
                                    ButtonLabel={formFields?.ButtonLabel}
                                    RecipientEmails={formFields?.RecipientEmails}
                                />
                            </div>
                        </div>

                        <div>
                            <BlogContentRenderer blocks={brandGuideline.brandGuideline.Content} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BrandGuidelinesPage;
