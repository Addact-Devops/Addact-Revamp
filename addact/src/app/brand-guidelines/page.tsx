"use client";

import { useEffect, useState } from "react";
import HeroBanner from "@/components/organisms/HeroBanner";
import { BrandGuidelinesResponse, getBrandGuidelines } from "@/graphql/queries/getBrandGuidelines";
import BlogContentRenderer from "@/components/organisms/BlogContentRenderer";
import "../../styles/components/caseStudy-detail.scss";
import DownloadForm from "@/components/templates/downloadForm";

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
        return (
            <div className='flex justify-center items-center min-h-[50vh]'>
                <div className='w-12 h-12 border-4 border-t-transparent border-red-500 rounded-full animate-spin'></div>
            </div>
        );
    }

    if (!brandGuideline) return <p className='p-6 text-red-600'>Brand Guidelines not found.</p>;

    const banner = brandGuideline.brandGuideline.HeroBanner.Banner[0];
    const formTitle = brandGuideline.brandGuideline.FromTitle;
    const pdf = brandGuideline.brandGuideline.GuidelinePDF;

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
                                <DownloadForm title={formTitle} pdfUrl={pdf.url} submitUrl='/api/submit-form' />
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
