import HeroBanner from "@/components/organisms/HeroBanner";
import { getContactUsData } from "@/graphql/queries/getContactUs";
// import ContactUsTeam from "@/components/organisms/ContactUsTeam";
// import ContactUsAddress from "@/components/organisms/ContactUsAddress";

import { generatePageMetadata } from "@/utils/generatePageMetadata";
import ContactUs from "@/components/organisms/ContactUs";

export async function generateMetadata() {
  return generatePageMetadata("contactus");
}

export default async function ContactUsPage() {
  const data = await getContactUsData();
  const contactus = data.contactus;
  const contactUsForm = data.contactus.contactus;
  const bannerData = contactus?.banner?.Banner?.[0];

  return (
    <>
      <main>
        {/* ✅ SearchAction Schema */}

        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "WebSite",
              name: "Addact Technologies",
              url: "https://www.addact.net/contact-us",
              potentialAction: {
                "@type": "SearchAction",
                target: "{search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* ✅ Organization Schema */}

        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Addact Technologies",
              alternateName: "Addact",
              url: "https://www.addact.net/",
              logo: "https://d3l7d9gtq0bnch.cloudfront.net/Logo_1_ffdf03e2d1.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "94272 37737",
                contactType: "emergency",
                contactOption: "TollFree",
                areaServed: ["US", "IN"],
                availableLanguage: "en",
              },
              sameAs: [
                "https://www.facebook.com/addacttech/",
                "https://x.com/AddactTech",
                "https://www.instagram.com/addacttechnologies/",
                "https://www.youtube.com/@addact3283",
                "https://www.linkedin.com/company/addact-technologies/posts/?feedView=all",
                "https://www.addact.net/",
              ],
            }),
          }}
        />
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
                {contactus.AddressContent ? <ContactUsAddress addressContent={contactus.AddressContent} /> : ""} */}
      </main>

      {/* ✅ Inline Structured Data */}
      {contactus?.SEO?.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(contactus.SEO.structuredData),
          }}
        />
      )}
    </>
  );
}
