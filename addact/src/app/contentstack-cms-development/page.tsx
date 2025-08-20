import { getServiceListBySlug } from "@/graphql/queries/getServieceList";
import HeroBanner from "@/components/organisms/HeroBanner";
import WhyAddact from "@/components/organisms/WhyAddact";
import OurPartners from "@/components/organisms/OurPartners";
import OurProcess from "@/components/organisms/OurProcess";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";
import OurInsights from "@/components/organisms/OurInsights";
import { notFound } from "next/navigation";
import IndustriesWeServe from "@/components/organisms/IndustriesWeServe";
import FAQ from "@/components/organisms/FAQ";
import OurServicesWithTabs from "@/components/organisms/OurServicesWithTabs";
import CtaBanner2 from "@/components/molecules/CtaBanner2";
import CtaBanner from "@/components/molecules/CtaBanner";
import ContactUs from "@/components/organisms/ContactUs";

import { generatePageMetadata } from "@/utils/generatePageMetadata";

export async function generateMetadata() {
    return generatePageMetadata("serviceLists", "/contentstack");
}

export default async function strapiPage() {
    const service = "contentstack-cms-development";
    const data = await getServiceListBySlug(service);
    if (!data) return notFound();
    const bannerData = data.Banner?.Banner?.[0];

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
            <CtaBanner2 data={data.cta2} />
            <OurProcess data={data.our_process} />
            <ClientTestimonials />
            <OurInsights />
            <FAQ data={data.faq} />
            <CtaBanner data={data.cta} />
            <ContactUs data={data.contact_us} />
        </main>
    );
}
