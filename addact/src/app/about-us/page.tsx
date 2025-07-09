import Quote from "@/components/organisms/Quote";
import AboutUsContent from "@/components/organisms/AboutUsContent";
import OurVisionMission from "@/components/organisms/OurVisionMission";

import { getAboutUsQuote } from "@/graphql/queries/getAboutUsQuote";
import { getAboutUsContent } from "@/graphql/queries/getAboutUsContent";
import { getOurVisionMission } from "@/graphql/queries/getOurVisionMission";

export default async function AboutUsPage() {
    const [quoteData, aboutData, visionData] = await Promise.all([
        getAboutUsQuote(),
        getAboutUsContent(),
        getOurVisionMission(),
    ]);

    const quote = quoteData.aboutUs.Quote;
    const about = aboutData.aboutUs.AboutUsContent;
    const visionMission = visionData.aboutUs.OurVisionMission;

    return (
        <main className="bg-white">
            {/* Quote Section */}
            <Quote authorName={quote.AuthorName} authorMessage={quote.AuthorMessage} authorImage={quote.AuthorImage} />

            {/* About Us Content Section */}
            <AboutUsContent subtitle={about.SubTitle} title={about.Title} content={about.Content} image={about.Image} />

            {/* Our Vision & Mission Section */}
            <OurVisionMission data={visionMission} />
        </main>
    );
}
