import ContactUs from "@/components/organisms/ContactUsPage";
import HeroBanner from "@/components/organisms/HeroBanner";
import { getContactUsData } from "@/graphql/queries/getContactUs";
// import ContactUsTeam from "@/components/organisms/ContactUsTeam";
// import ContactUsAddress from "@/components/organisms/ContactUsAddress";

import { generatePageMetadata } from "@/utils/generatePageMetadata";
import Script from "next/script";

export async function generateMetadata() {
  return generatePageMetadata("contactus");
}

export default async function ContactUsPage() {
  const data = await getContactUsData();
  const contactus = data.contactus;
  const bannerData = contactus?.banner?.Banner?.[0];
  const contactUsForm = data.contactus.contactus;
  return (
    <>
      <main>
        {contactus?.SEO?.structuredData?.map((item, index) => (
          <Script
            key={index}
            id={`structured-data-${index}`}
            type="application/ld+json"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(item),
            }}
          />
        ))}
        {bannerData?.BannerTitle &&
        bannerData?.BannerDescription &&
        bannerData?.BannerImage?.url ? (
          <HeroBanner
            title={bannerData.BannerTitle}
            description={bannerData.BannerDescription}
            backgroundImageUrl={bannerData.BannerImage.url}
            button={
              bannerData?.BannerLink?.href && bannerData?.BannerLink?.label
                ? {
                    url: bannerData.BannerLink.href,
                    label: bannerData.BannerLink.label,
                  }
                : undefined
            }
            showAnchorLinks={false}
          />
        ) : null}

        <ContactUs data={contactUsForm} />
        {/* <ContactUsTeam
          AddactTeamImage={contactus.AddactTeamImage}
          TitleLine1={contactus.TitleLine1}
          TitleLine2={contactus.TitleLine2}
          Descriptions={contactus.Descriptions}
          ContactUsAvailability={contactus.ContactUsAvailability}
        />
        {contactus.AddressContent ? (
          <ContactUsAddress addressContent={contactus.AddressContent} />
        ) : (
          ""
        )} */}
      </main>
    </>
  );
}
