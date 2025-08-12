import { Metadata } from "next";
import { getCareerDetailsData } from "@/graphql/queries/getCareerDetails";
import CareerDetailClient from "./CareerDetailClient";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    // const slug = resolvedParams.slug;
    const { slug } = await params;

    const data = await getCareerDetailsData(slug);
    const career = data?.careerDetails?.[0];
    const seo = career?.SEO;

    if (!seo) {
        return {
            title: "Career Details",
            description: "Explore career opportunities with us.",
        };
    }

    return {
        title: seo.metaTitle || career?.PageHeading?.[0]?.PageTitle || "Career Details",
        description: seo.metaDescription || "",
        openGraph: {
            title: seo.ogTitle || seo.metaTitle || "",
            description: seo.ogDescription || seo.metaDescription || "",
            images: seo.ogImage?.url ? [{ url: seo.ogImage.url }] : [],
        },
        robots: seo.metaRobots
            ? { index: seo.metaRobots.includes("index"), follow: seo.metaRobots.includes("follow") }
            : undefined,
        alternates: seo.canonicalURL ? { canonical: seo.canonicalURL } : undefined,
        other: {
            twitterCardTitle: seo.twitterCardTitle || "",
            structuredData: seo.structuredData || "",
            languageTag: seo.languageTag || "",
        },
    };
}

export default async function CareerDetailPage({ params }: { params: Params }) {
    // const slug = resolvedParams.slug;
    const { slug } = await params;

    const data = await getCareerDetailsData(slug);
    const career = data?.careerDetails?.[0];
    const seo = career?.SEO;

    return (
        <>
            {seo?.structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.structuredData) }}
                />
            )}
            <CareerDetailClient data={career} />
        </>
    );
}
