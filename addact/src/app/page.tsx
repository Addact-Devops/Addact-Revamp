import { getHOmePageData } from "@/graphql/queries/getHomePage";
import { fetchSinglePage } from "@/utils/fetchSinglePage";

import OurPartners from "@/components/organisms/OurPartners";
import WhoWeAre from "@/components/organisms/WhoWeAre";
import OurServices from "@/components/organisms/OurServices";
import OurCmsExperts from "@/components/organisms/OurCmsExperts";
import WhyAddact from "@/components/organisms/WhyAddact";
import CtaBanner from "@/components/molecules/CtaBanner";
import OurProcess from "@/components/organisms/OurProcess";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";
import OurInsights from "@/components/organisms/OurInsights";
import ContactUs from "@/components/organisms/ContactUs";
import HomeHeroBanner from "@/components/organisms/HomeHeroBanner";
import GlobeAnimation from "@/components/organisms/GlobeAnimation";

import { generatePageMetadata } from "@/utils/generatePageMetadata";

export async function generateMetadata() {
    return generatePageMetadata("home");
}

export default async function HomePage() {
    const [homeResponse, seoData] = await Promise.all([
        getHOmePageData(),
        fetchSinglePage("home"), // ✅ fetch SEO.structuredData
    ]);

    const homeData = homeResponse?.home;
    const structuredData = seoData?.SEO?.structuredData;

    return (
        <>
            {/* ✅ Inject structured data */}
            {structuredData && (
                <script
                    type='application/ld+json'
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData),
                    }}
                />
            )}

            <main className='bg-dark'>
                <HomeHeroBanner data={homeData?.banner} />
                <OurPartners />
                <WhoWeAre />
                <OurServices data={homeData?.ourservices} />
                <OurCmsExperts />
                <WhyAddact data={homeData?.whyaddact} />
                <CtaBanner data={homeData?.cta} />
                <OurProcess data={homeData?.ourprocess} />
                <ClientTestimonials />
                <OurInsights />
                <GlobeAnimation data={homeData?.GlobeAnimation} />
                <ContactUs data={homeData?.contactus} />
            </main>
        </>
    );
}
