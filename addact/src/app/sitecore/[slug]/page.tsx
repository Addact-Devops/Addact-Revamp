import { notFound } from "next/navigation";
import { getServiceDetailBySlug } from "@/graphql/queries/getServieceDetail";
import HeroBanner from "@/components/organisms/HeroBanner";
import WhyAddact from "@/components/organisms/WhyAddact";
import OurPartners from "@/components/organisms/OurPartners";
import OurProcess from "@/components/organisms/OurProcess";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";
import OurInsights from "@/components/organisms/OurInsights";
import FAQ from "@/components/organisms/FAQ";
// import CtaBanner2 from "@/components/molecules/CtaBanner2";
import OurServicesWithTabs from "@/components/organisms/OurServicesWithTabs";
import IndustriesWeServe from "@/components/organisms/IndustriesWeServe";
// import CtaBanner from "@/components/molecules/CtaBanner";

export default async function SiteDetailPage() {
    const service = "sitecore";
    const data = await getServiceDetailBySlug(service);
    if (!data) return notFound();

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
            {await IndustriesWeServe()}
            <WhyAddact data={data.why_addact} />
            {/* <CtaBanner2 data={data.cta2} /> */}
            <OurProcess />
            <ClientTestimonials />
            <OurInsights />
            <FAQ data={data.faq} />
            {/* <CtaBanner data={data.cta} /> */}
        </main>
    );
}
