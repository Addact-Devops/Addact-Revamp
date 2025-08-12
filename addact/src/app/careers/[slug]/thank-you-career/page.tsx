import { getThankYouPageBySlug } from "@/graphql/queries/getThankYouPageBySlug";
import CareerThankYouClient from "./CareerThankYouClient";

export async function generateMetadata() {
    // Hardcoded slug for SEO metadata
    const slug = "thank-you-career";

    const data = await getThankYouPageBySlug(slug);
    const page = data?.thankyouPages?.[0];
    const seo = page?.SEO;

    if (!seo) {
        return {
            title: "Thank You",
            description: "Thank you for contacting us.",
        };
    }

    return {
        title: seo.metaTitle || "Thank You",
        description: seo.metaDescription || "",
        openGraph: {
            title: seo.ogTitle || seo.metaTitle || "",
            description: seo.ogDescription || seo.metaDescription || "",
            images: seo.ogImage?.url ? [{ url: seo.ogImage.url }] : [],
        },
        robots: seo.metaRobots
            ? {
                  index: seo.metaRobots.includes("index"),
                  follow: seo.metaRobots.includes("follow"),
              }
            : undefined,
        alternates: seo.canonicalURL ? { canonical: seo.canonicalURL } : undefined,
        other: {
            twitterCardTitle: seo.twitterCardTitle || "",
            structuredData: seo.structuredData ? JSON.stringify(seo.structuredData) : "",
            languageTag: seo.languageTag || "",
        },
    };
}

export default async function CareerThankYouPage() {
    // Hardcoded slug here too
    const slug = "thank-you-career";

    const data = await getThankYouPageBySlug(slug);
    const page = data?.thankyouPages?.[0];

    if (!page) {
        return <p className="p-6 text-red-600 mt-32">Thank You Page not found.</p>;
    }

    return (
        <>
            {page.SEO?.structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(page.SEO.structuredData),
                    }}
                />
            )}
            <CareerThankYouClient thankYouData={page} />
        </>
    );
}
