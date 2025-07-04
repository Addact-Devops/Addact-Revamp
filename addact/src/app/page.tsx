import CtaBanner from "@/components/molecules/CtaBanner";
import ContactUs from "@/components/organisms/ContactUs";
import OurCmsExperts from "@/components/organisms/OurCmsExperts";
import OurInsights from "@/components/organisms/OurInsights";
import OurPartners from "@/components/organisms/OurPartners";
import OurProcess from "@/components/organisms/OurProcess";
import OurServices from "@/components/organisms/OurServices";
import WhoWeAre from "@/components/organisms/WhoWeAre";
import WhyAddact from "@/components/organisms/WhyAddact";

export default function HomePage() {
    return (
        <main className='bg-dark'>
            <OurPartners />
            <WhoWeAre />
            <OurServices />
            <OurCmsExperts />
            <WhyAddact />
            <CtaBanner />
            <OurProcess />
            <OurInsights />
            <ContactUs />
        </main>
    );
}
