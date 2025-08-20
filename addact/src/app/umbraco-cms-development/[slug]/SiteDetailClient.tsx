"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

import { getServiceDetailBySlug, SubServicePage } from "@/graphql/queries/getServieceDetail";

import HeroBanner from "@/components/organisms/HeroBanner";
import WhyAddact from "@/components/organisms/WhyAddact";
import OurPartners from "@/components/organisms/OurPartners";
import OurProcess from "@/components/organisms/OurProcess";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";
import OurInsights from "@/components/organisms/OurInsights";
import FAQ from "@/components/organisms/FAQ";
import OurServicesWithTabs from "@/components/organisms/OurServicesWithTabs";
import ServiceCtaBanner2 from "@/components/molecules/ServiceCtaBanner2";
import ContactUs from "@/components/organisms/ContactUs";

const IndustriesWeServe = dynamic(() => import("@/components/organisms/IndustriesWeServe"), { ssr: false });

const SiteDetailClient = ({ data }: { data: SubServicePage }) => {
    const [pageData, setPageData] = useState<SubServicePage | null>(data);
    const [loading, setLoading] = useState(false); // set false, we already have data

    const params = useParams();
    const slug = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";

    useEffect(() => {
        if (!pageData && slug) {
            setLoading(true);
            getServiceDetailBySlug(slug)
                .then((res) => {
                    setPageData(res);
                })
                .catch((err) => {
                    console.error("Error fetching service detail:", err);
                })
                .finally(() => setLoading(false));
        }
    }, [slug, pageData]);

    if (loading) {
        return <div className='text-white p-8'>Loading...</div>;
    }

    if (!pageData) {
        return <div className='text-white p-8'>Page Not Found</div>;
    }

    const bannerData = pageData.HeroBanner;

    return (
        <main className='bg-dark'>
            <HeroBanner
                title={bannerData?.BannerTitle ?? ""}
                description={bannerData?.BannerDescription?.replace(/^<p>|<\/p>$/g, "") ?? ""}
                button={{
                    label: bannerData?.BannerLink?.label ?? "",
                    url: bannerData?.BannerLink?.href ?? "",
                }}
                backgroundImageUrl={bannerData?.BannerImage?.url ?? ""}
            />
            <OurPartners />
            <OurServicesWithTabs data={pageData.our_service} />
            <IndustriesWeServe />
            <WhyAddact data={pageData.why_addact} />
            <ServiceCtaBanner2 data={pageData.cta2} />
            <OurProcess data={data.our_process} />
            <ClientTestimonials />
            <OurInsights />
            <FAQ data={pageData.faq} />
            <ContactUs data={data.contact_us} />
        </main>
    );
};

export default SiteDetailClient;
