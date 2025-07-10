import { getServiceListBySlug } from "@/graphql/queries/getServieceList";
import HeroBanner from "@/components/organisms/HeroBanner";
import WhyAddact from "@/components/organisms/WhyAddact";
import OurPartners from "@/components/organisms/OurPartners";
import OurProcess from "@/components/organisms/OurProcess";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";
import OurInsights from "@/components/organisms/OurInsights";
import { notFound } from "next/navigation";

export default async function strapiPage() {
    const service = "strapi";
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
            <div className='bg-lime-400'>
                <h1>Industries we serve</h1>
            </div>
            <WhyAddact data={data.why_addact} />
            <OurProcess />
            <ClientTestimonials />
            <OurInsights />
            <div className='bg-lime-400'>
                <h1>FAQ</h1>
            </div>
        </main>
    );
}
