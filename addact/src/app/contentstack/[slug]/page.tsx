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

const SiteDetailPage = () => {
    const params = useParams();
    const slug = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";

    const [data, setData] = useState<SubServicePage | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            getServiceDetailBySlug(slug)
                .then((res) => {
                    setData(res);
                })
                .catch((err) => {
                    console.error("Error fetching service detail:", err);
                })
                .finally(() => setLoading(false));
        }
    }, [slug]);

    if (loading) {
        return <div className="text-white p-8">Loading...</div>;
    }

    if (!data) {
        return <div className="text-white p-8">Page Not Found</div>;
    }

    const bannerData = data.HeroBanner;

    return (
        <main className="bg-dark">
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
            <OurServicesWithTabs data={data.our_service} />
            <IndustriesWeServe />
            <WhyAddact data={data.why_addact} />
            <ServiceCtaBanner2 data={data.cta2} />
            <OurProcess />
            <ClientTestimonials />
            <OurInsights />
            <FAQ data={data.faq} />
            <ContactUs data={data.contact_us} />
        </main>
    );
};

export default SiteDetailPage;
