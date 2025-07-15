import HeroBanner from "@/components/organisms/HeroBanner";
import Quote from "@/components/organisms/Quote";
import AboutUsContent from "@/components/organisms/AboutUsContent";
import OurVisionMission from "@/components/organisms/OurVisionMission";
import GenericCTA from "@/components/organisms/GenericCTA";
import BrandValue from "@/components/organisms/BrandValue";
import WeAreAddact from "@/components/organisms/WeAreAddact";

import {
    getAboutUsHeroBanner,
    getAboutUsQuote,
    getAboutUsContent,
    getOurVisionMission,
    getAboutUsCTA,
    getBrandValue,
    getWeAreAddact,
} from "@/graphql/queries/getAboutUs";

export default async function AboutUsPage() {
    const [heroBannerData, quoteData, aboutData, visionData, ctaData, brandValueData, weAreAddactData] =
        await Promise.all([
            getAboutUsHeroBanner(),
            getAboutUsQuote(),
            getAboutUsContent(),
            getOurVisionMission(),
            getAboutUsCTA(),
            getBrandValue(),
            getWeAreAddact(),
        ]);

    const banner = heroBannerData;
    const quote = quoteData.aboutUs.Quote;
    const about = aboutData.aboutUs.AboutUsContent;
    const visionMission = visionData.aboutUs.OurVisionMission;
    const brandValue = brandValueData;
    const cta = ctaData;

    return (
        <main className="bg-[#f4f4f4]">
            <HeroBanner
                title={banner?.BannerTitle || ""}
                description={banner?.BannerDescription || ""}
                backgroundImageUrl={banner?.BannerImage?.url || ""}
                showAnchorLinks={true} // Enables anchor links at bottom like Overview, Vision etc.
            />

            <Quote authorName={quote.AuthorName} authorMessage={quote.AuthorMessage} authorImage={quote.AuthorImage} />

            <AboutUsContent subtitle={about.SubTitle} title={about.Title} content={about.Content} image={about.Image} />

            <OurVisionMission data={visionMission} />

            <GenericCTA
                title={cta?.Title || []}
                description={cta?.CTADescription || []}
                image={cta?.CTAImage?.[0]?.Image || null}
                link={cta?.CTALink?.[0] || null}
            />

            <BrandValue
                title={brandValue.Title}
                subtitle={brandValue.SubTitle}
                content={brandValue.Content}
                image={brandValue.Image}
            />

            <WeAreAddact
                subtitle={weAreAddactData.SubTitle}
                title={weAreAddactData.Title}
                content={weAreAddactData.Content}
                image={weAreAddactData.Image}
                numberContent={weAreAddactData.NumberContent}
            />
        </main>
    );
}
