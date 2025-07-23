"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CareerDetailResponse, getCareerDetailsData } from "@/graphql/queries/getCareerDetails";
import BlogContentRenderer from "@/components/organisms/BlogContentRenderer";
import "../../../styles/components/caseStudy-detail.scss";
import HeroBanner from "@/components/organisms/HeroBanner";

const CareerDetail = () => {
    const { slug } = useParams();
    const [careerDetailData, setCareerDetailData] = useState<CareerDetailResponse["careerDetails"][number]>();
    const [loading, setLoading] = useState(true);

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
        return (
            <div className='flex justify-center items-center min-h-[50vh]'>
                <div className='w-12 h-12 border-4 border-t-transparent border-red-500 rounded-full animate-spin'></div>
            </div>
        );
    }

    if (!careerDetailData) return <p className='p-6 text-red-600'>Career Details not found.</p>;

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

            <section className='bg-[#f4f4f4] caseStudy-wrapper py-[40px]'>
                <div className='container'>
                    <div className='mt-16 text-black'>
                        <BlogContentRenderer blocks={careerDetailData.JobDescription} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CareerDetail;
