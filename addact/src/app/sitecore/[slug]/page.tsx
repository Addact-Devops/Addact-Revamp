import { notFound } from "next/navigation";
import { getServiceDetailBySlug } from "@/graphql/queries/getServieceDetail";
import HeroBanner from "@/components/organisms/HeroBanner";
import WhyAddact from "@/components/organisms/WhyAddact";
import OurPartners from "@/components/organisms/OurPartners";
import OurProcess from "@/components/organisms/OurProcess";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";
import OurInsights from "@/components/organisms/OurInsights";
import FAQ from "@/components/organisms/FAQ";
import OurServicesWithTabs from "@/components/organisms/OurServicesWithTabs";
import IndustriesWeServe from "@/components/organisms/IndustriesWeServe";
import ServiceCtaBanner2 from "@/components/molecules/ServiceCtaBanner2";

type Params = {
    params: {
        slug: string;
    };
};

export default async function SiteDetailPage({ params }: Params) {
    const { slug } = params;
    const data = await getServiceDetailBySlug(slug);
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
            <ServiceCtaBanner2 data={data.cta2} />
            <OurProcess />
            <ClientTestimonials />
            <OurInsights />
            <FAQ data={data.faq} />
            {/* <ServiceCtaBanner data={data.cta} /> */}
        </main>
    );
}
