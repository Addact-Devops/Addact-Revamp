import { getThankYouPageBySlug } from "@/graphql/queries/getThankYouPageBySlug";
import ConnectNowThankYouClient from "./ConnectNowThankYouClient";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const slug = "connect-now-thank-you";
    const data = await getThankYouPageBySlug(slug);
    const page = data?.thankyouPages?.[0];

    if (!page || !page.SEO) return { title: "Connect Now Thank You" };

    const seo = page.SEO;

    return {
        title: seo.metaTitle || "",
        description: seo.metaDescription || "",
        openGraph: {
            title: seo.ogTitle || seo.metaTitle || "",
            description: seo.ogDescription || seo.metaDescription || "",
            images: seo.ogImage?.url ? [{ url: seo.ogImage.url }] : [],
        },
        robots: seo.metaRobots || undefined,
        twitter: {
            title: seo.twitterCardTitle || seo.metaTitle || "",
        },
        alternates: {
            canonical: seo.canonicalURL || undefined,
        },
        other: {
            "language-tag": seo.languageTag || "",
        },
    };
}

export default async function ConnectNowThankYouPage() {
    const data = await getThankYouPageBySlug("connect-now-thank-you");
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
            <ConnectNowThankYouClient thankYouData={page} />
        </>
    );
}
