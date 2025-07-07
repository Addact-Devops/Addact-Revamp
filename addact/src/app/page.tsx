import ClientTestimonials from "@/components/organisms/ClientTestimonials";
import ContactUs from "@/components/organisms/ContactUs";
import OurPartners from "@/components/organisms/OurPartners";
import WhoWeAre from "@/components/organisms/WhoWeAre";
import OurServices from "@/components/organisms/OurServices";
import OurCmsExperts from "@/components/organisms/OurCmsExperts";
import WhyAddact from "@/components/organisms/WhyAddact";
import CtaBanner from "@/components/molecules/CtaBanner";
import OurProcess from "@/components/organisms/OurProcess";
import OurInsights from "@/components/organisms/OurInsights";

export default function HomePage() {
    return (
        <main className="bg-dark">
            <OurPartners />
            <WhoWeAre />
            <OurServices />
            <OurCmsExperts />
            <WhyAddact />
            <CtaBanner />
            <OurProcess />
            <ClientTestimonials />
            <OurInsights />
            <ContactUs />
        </main>
    );
}
