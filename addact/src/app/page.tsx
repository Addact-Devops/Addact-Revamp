import { getClientTestimonialsData } from "@/graphql/queries/getClientTestimonialsData";
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

export default async function HomePage() {
    const data = await getClientTestimonialsData();
    const homeResponse = await getHOmePageData();
    const homeData = homeResponse?.home;

    return (
        <main className='bg-dark'>
            <OurPartners />
            <WhoWeAre />
            <OurServices data={homeData?.ourservices} />
            <OurCmsExperts />
            <WhyAddact />
            <CtaBanner data={homeData?.cta} />
            <OurProcess />
            <ClientTestimonials data={data} />
            <OurInsights />
            <ContactUs data={homeData?.contactus} />
        </main>
    );
}
