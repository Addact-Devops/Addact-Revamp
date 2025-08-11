// src/app/[slug]/page.tsx

import { getServiceDetailBySlug } from "@/graphql/queries/getServieceDetail";
import { SubServicePage } from "@/graphql/queries/getServieceDetail";
import { notFound } from "next/navigation";
import SiteDetailClient from "./SiteDetailClient";
type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
    const { slug } = await params;
    const data: SubServicePage | null = await getServiceDetailBySlug(slug);

    if (!data || !data.SEO) return {};

    const {
        metaTitle,
        metaDescription,
        ogTitle,
        ogDescription,
        ogImage,
        metaRobots,
        twitterCardTitle,
        canonicalURL,
        structuredData,
    } = data.SEO;

    return {
        title: metaTitle,
        description: metaDescription,
        alternates: {
            canonical: canonicalURL || undefined,
        },
        openGraph: {
            title: ogTitle || metaTitle,
            description: ogDescription || metaDescription,
            images: ogImage?.url ? [{ url: ogImage.url }] : [],
        },
        twitter: {
            title: twitterCardTitle || metaTitle,
        },
        robots: metaRobots || undefined,
        metadataBase: new URL("https://www.addact.net"),
        ...(structuredData && {
            other: {
                structuredData: JSON.stringify(structuredData),
            },
        }),
    };
}

const SiteDetailPage = async ({ params }: { params: Params }) => {
    const { slug } = await params;
    const data: SubServicePage | null = await getServiceDetailBySlug(slug);

    if (!data) return notFound();

    return <SiteDetailClient data={data} />;
};

export default SiteDetailPage;
