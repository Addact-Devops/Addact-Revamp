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
      <WhyAddact/>
    </main>
  );
}
