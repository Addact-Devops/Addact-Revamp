import { getHOmePageData } from "@/graphql/queries/getHomePage";

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
// import FAQ from "@/components/organisms/FAQ";
// import HeroBanner from "@/components/organisms/HeroBanner";

export default async function HomePage() {
    const homeResponse = await getHOmePageData();
    const homeData = homeResponse?.home;

    return (
        <main className='bg-dark'>
            <HomeHeroBanner data={homeData?.banner} />
            {/* <HeroBanner
                title='Sitecore XM Cloud Services'
                description='Unlock new potential and upgrade existing business capabilities with AI services that streamline operations.'
                button={{ label: "Connect with Our Experts", url: "/contact" }}
                backgroundImageUrl='/path-to-banner-image.jpg'
            /> */}
            {/* <FAQ /> */}
            <OurPartners />
            <WhoWeAre />
            <OurServices data={homeData?.ourservices} />
            <OurCmsExperts />
            <WhyAddact data={homeData?.whyaddact} />
            <CtaBanner data={homeData?.cta} />
            <OurProcess />
            <ClientTestimonials />
            <OurInsights />
            <ContactUs data={homeData?.contactus} />
        </main>
    );
}
