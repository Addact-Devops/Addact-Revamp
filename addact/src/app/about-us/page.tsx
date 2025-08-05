import HeroBanner from "@/components/organisms/HeroBanner";
import AboutUsContent from "@/components/organisms/AboutUsContent";
import OurVisionMission from "@/components/organisms/OurVisionMission";
import GenericCTA from "@/components/organisms/GenericCTA";
import WeAreAddact from "@/components/organisms/WeAreAddact";

import {
    getAboutUsHeroBanner,
    getAboutUsContent,
    getOurVisionMission,
    getAboutUsCTA,
    getWeAreAddact,
} from "@/graphql/queries/getAboutUs";

import { generatePageMetadata } from "@/utils/generatePageMetadata";

export async function generateMetadata() {
    return generatePageMetadata("aboutUs");
}

export default async function AboutUsPage() {
    const [heroBannerData, aboutData, visionData, ctaData, weAreAddactData] = await Promise.all([
        getAboutUsHeroBanner(),
        getAboutUsContent(),
        getOurVisionMission(),
        getAboutUsCTA(),
        getWeAreAddact(),
    ]);

    const banner = heroBannerData;
    const about = aboutData.aboutUs.AboutUsContent;
    const visionMission = visionData.aboutUs.OurVisionMission;
    const cta = ctaData;

    return (
        <main className="bg-[#f4f4f4]">
            <HeroBanner
                title={banner?.BannerTitle || ""}
                description={banner?.BannerDescription || ""}
                backgroundImageUrl={banner?.BannerImage?.url || ""}
                showAnchorLinks={true}
            />
            <AboutUsContent
                subtitle={about.SubTitle}
                title={about.Title}
                content={about.Description}
                image={about.Image}
            />
            <OurVisionMission data={visionMission} />
            <GenericCTA
                title={cta?.Title || []}
                description={cta?.CTADescription || []}
                image={cta?.CTAImage?.[0]?.Image || null}
                link={cta?.CTALink?.[0] || null}
            />
            <WeAreAddact
                subtitle={weAreAddactData.SubTitle}
                title={weAreAddactData.Title}
                content={weAreAddactData.Content}
                image={weAreAddactData.Image}
                {...(weAreAddactData.NumberContent && {
                    numberContent: weAreAddactData.NumberContent,
                })}
            />
        </main>
    );
}
