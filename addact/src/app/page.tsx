import CtaBanner from "@/components/molecules/CtaBanner";
import OurCmsExperts from "@/components/organisms/OurCmsExperts";
import OurInsights from "@/components/organisms/OurInsights";
import OurPartners from "@/components/organisms/OurPartners";
import OurServices from "@/components/organisms/OurServices";
import WhoWeAre from "@/components/organisms/WhoWeAre";
import WhyAddact from "@/components/organisms/WhyAddact";

export default function HomePage() {
  return (
    <main className="bg-dark">
      <OurPartners />
      <WhoWeAre />
      <OurServices />
      <OurCmsExperts />
      <WhyAddact />
      <CtaBanner />
      <OurInsights />
    </main>
  );
}
