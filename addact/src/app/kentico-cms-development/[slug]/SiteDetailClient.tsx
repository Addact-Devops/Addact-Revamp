// src/app/[slug]/SiteDetailClient.tsx

"use client";

import dynamic from "next/dynamic";
import { SubServicePage } from "@/graphql/queries/getServieceDetail";

import HeroBanner from "@/components/organisms/HeroBanner";
import WhyAddact from "@/components/organisms/WhyAddact";
import OurPartners from "@/components/organisms/OurPartners";
import OurProcess from "@/components/organisms/OurProcess";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";
import OurInsights from "@/components/organisms/OurInsights";
import FAQ from "@/components/organisms/FAQ";
import OurServicesWithTabs from "@/components/organisms/OurServicesWithTabs";
import ServiceCtaBanner2 from "@/components/molecules/ServiceCtaBanner2";

const IndustriesWeServe = dynamic(() => import("@/components/organisms/IndustriesWeServe"), { ssr: false });

const SiteDetailClient = ({ data }: { data: SubServicePage }) => {
    const bannerData = data.HeroBanner;

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
            <OurServicesWithTabs data={data.our_service} />
            <IndustriesWeServe />
            <WhyAddact data={data.why_addact} />
            <ServiceCtaBanner2 data={data.cta2} />
            <OurProcess data={data.our_process} />
            <ClientTestimonials />
            <OurInsights />
            <FAQ data={data.faq} />
        </main>
    );
};

export default SiteDetailClient;
