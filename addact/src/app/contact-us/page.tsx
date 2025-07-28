import HeroBanner from "@/components/organisms/HeroBanner";
import { getContactUsData } from "@/graphql/queries/getContactUs";
import ContactUsForm from "@/components/organisms/ContactUsForm";
import ContactUsTeam from "@/components/organisms/ContactUsTeam";
import ContactUsAddress from "@/components/organisms/ContactUsAddress"; // ✅ Import added

export default async function ContactUsPage() {
    const data = await getContactUsData();
    const contactus = data.contactus;
    const bannerData = contactus?.banner?.Banner?.[0];

    return (
        <main className="bg-[#ffffff]">
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
                    showAnchorLinks={true}
                />
            ) : null}

            <ContactUsTeam
                AddactTeamImage={contactus.AddactTeamImage}
                TitleLine1={contactus.TitleLine1}
                TitleLine2={contactus.TitleLine2}
                Descriptions={contactus.Descriptions}
                ContactUsAvailability={contactus.ContactUsAvailability}
            />

            <ContactUsAddress addressContent={contactus.AddressContent} />

            <ContactUsForm
                ContactUsFormBlock={{
                    LeftTitle: contactus.ContactUsFormBlock.LeftTitle,
                    LeftDescription: Array.isArray(contactus.ContactUsFormBlock.LeftDescription)
                        ? contactus.ContactUsFormBlock.LeftDescription
                        : [contactus.ContactUsFormBlock.LeftDescription],
                    LeftBackgroundImage: contactus.ContactUsFormBlock.LeftBackgroundImage,
                    RightTitle: contactus.ContactUsFormBlock.RightTitle,
                    RightDescription: Array.isArray(contactus.ContactUsFormBlock.RightDescription)
                        ? contactus.ContactUsFormBlock.RightDescription
                        : [contactus.ContactUsFormBlock.RightDescription],
                }}
            />
        </main>
    );
}
