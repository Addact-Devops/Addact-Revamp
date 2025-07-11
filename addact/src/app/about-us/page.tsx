import Quote from "@/components/organisms/Quote";
import AboutUsContent from "@/components/organisms/AboutUsContent";
import OurVisionMission from "@/components/organisms/OurVisionMission";
import GenericCTA from "@/components/organisms/GenericCTA";
import BrandValue from "@/components/organisms/BrandValue";
import WeAreAddact from "@/components/organisms/WeAreAddact";
import DynamicHeroBanner from "@/components/organisms/DynamicHeroBanner";

import { getAboutUsQuote } from "@/graphql/queries/getAboutUsQuote";
import { getAboutUsContent } from "@/graphql/queries/getAboutUsContent";
import { getOurVisionMission } from "@/graphql/queries/getOurVisionMission";
import { getAboutUsCTA } from "@/graphql/queries/getAboutUsCTA";
import { getBrandValue } from "@/graphql/queries/getBrandValue";
import { getWeAreAddact } from "@/graphql/queries/getWeAreAddact";
import { getBannerById } from "@/graphql/queries/getBannerById";

export default async function AboutUsPage() {
    const [quoteData, aboutData, visionData, ctaData, brandValueData, weAreAddactData] = await Promise.all([
        getAboutUsQuote(),
        getAboutUsContent(),
        getOurVisionMission(),
        getAboutUsCTA(),
        getBrandValue(),
        getWeAreAddact(),
    ]);

    const quote = quoteData.aboutUs.Quote;
    const about = aboutData.aboutUs.AboutUsContent;
    const visionMission = visionData.aboutUs.OurVisionMission;
    const brandValue = brandValueData;
    const cta = ctaData;
    const banner = await getBannerById("18");

    return (
        <main className="bg-white">
            {banner && (
                <DynamicHeroBanner
                    title={banner.BannerTitle}
                    description={banner.BannerDescription}
                    imageUrl={banner.BannerImage?.url || null}
                    imageAlt={banner.BannerImage?.alternativeText || "Banner"}
                    linkUrl={banner.BannerLink?.href || null}
                    showSearchbox={banner.show_searchbox || false}
                />
            )}

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
