import type { Metadata } from "next";
import { getPressReleaseDetailBySlug } from "@/graphql/queries/getPressReleaseDetail";
import PressReleaseDetails from "./PressReleaseDetails";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const data = await getPressReleaseDetailBySlug(slug);
    const seo = data?.addactPressReleases?.[0]?.SEO;

    return {
        title: seo?.metaTitle || seo?.ogTitle || "Press Release",
        description: seo?.metaDescription || seo?.ogDescription || "",
        openGraph: {
            title: seo?.ogTitle || seo?.metaTitle || "",
            description: seo?.ogDescription || seo?.metaDescription || "",
            images: seo?.ogImage?.url ? [{ url: seo.ogImage.url }] : [],
        },
        alternates: seo?.canonicalURL ? { canonical: seo.canonicalURL } : undefined,
        robots: seo?.metaRobots || undefined,
    };
}

export default async function PressReleasePage({ params }: { params: Params }) {
    const { slug } = await params;
    const seoData = await getPressReleaseDetailBySlug(slug);
    const structuredData = seoData?.addactPressReleases?.[0]?.SEO?.structuredData || null;

    return (
        <>
            {structuredData && (
                <script
                    type="application/ld+json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData),
                    }}
                />
            )}

            <PressReleaseDetails slug={slug} />
        </>
    );
}
