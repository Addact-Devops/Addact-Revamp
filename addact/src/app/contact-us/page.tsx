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
                {bannerData?.BannerTitle && bannerData?.BannerDescription && bannerData?.BannerImage?.url ? (
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
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(contactus.SEO.structuredData),
                    }}
                />
            )}
        </>
    );
}
