"use client";

import HeroBanner from "@/components/organisms/HeroBanner";
import WhyAddact from "@/components/organisms/WhyAddact";
import OurPartners from "@/components/organisms/OurPartners";
import OurProcess from "@/components/organisms/OurProcess";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";
import OurInsights from "@/components/organisms/OurInsights";
import IndustriesWeServe from "@/components/organisms/IndustriesWeServe";
import FAQ from "@/components/organisms/FAQ";
import OurServicesWithTabs from "@/components/organisms/OurServicesWithTabs";
import ContactUs from "@/components/organisms/ContactUs";

// ✅ Import correct types from GraphQL
import type { Faq, Whyaddact } from "@/graphql/queries/getHomePage";
import type { OurServiceData } from "@/graphql/queries/getServieceList";

type BannerData = {
    BannerTitle?: string;
    BannerDescription?: string;
    BannerImage?: {
        url?: string;
    };
    BannerLink?: {
        label?: string;
        href?: string;
    };
};

type ContentfulClientProps = {
    data: {
        Banner?: {
            Banner?: BannerData[];
        };
        our_service?: OurServiceData;
        why_addact?: Whyaddact;
        faq?: Faq;
        contact_us?: any;
    };
};

export default function ContentfulClient({ data }: ContentfulClientProps) {
    const bannerData = data.Banner?.Banner?.[0];

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
            <OurServicesWithTabs data={data.our_service!} />
            <IndustriesWeServe />
            <WhyAddact data={data.why_addact!} />
            <OurProcess />
            <ClientTestimonials />
            <OurInsights />
            <FAQ data={data.faq!} />
            <ContactUs data={data.contact_us} />
        </main>
    );
}
