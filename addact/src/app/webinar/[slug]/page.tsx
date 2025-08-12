// import { Metadata } from "next";
// import { getWebinarDetailBySlug } from "@/graphql/queries/getWebinarDetail";
// import WebinarDetailClient from "./WebinarDetailClient";

// interface Props {
//     params: { slug: string };
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//     const data = await getWebinarDetailBySlug(params.slug);
//     const seo = data?.addactWebinars?.[0]?.SEO;

//     return {
//         title: seo?.metaTitle || "Webinar",
//         description: seo?.metaDescription || "",
//         robots: seo?.metaRobots || "index,follow",
//         alternates: {
//             canonical: seo?.canonicalURL || undefined,
//         },
//         openGraph: {
//             title: seo?.ogTitle || seo?.metaTitle,
//             description: seo?.ogDescription || seo?.metaDescription,
//             images: seo?.ogImage?.url ? [{ url: seo.ogImage.url }] : [],
//         },
//         twitter: {
//             card: "summary_large_image",
//             title: seo?.twitterCardTitle || seo?.metaTitle,
//             description: seo?.metaDescription || "",
//             images: seo?.ogImage?.url ? [seo.ogImage.url] : [],
//         },
//     };
// }

// export default async function Page({ params }: Props) {
//     const data = await getWebinarDetailBySlug(params.slug);
//     return <WebinarDetailClient initialData={data} />;
// }

import { Metadata } from "next";
import { getWebinarDetailBySlug } from "@/graphql/queries/getWebinarDetail";
import WebinarDetailClient from "./WebinarDetailClient";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const data = await getWebinarDetailBySlug(slug);
    const seo = data?.addactWebinars?.[0]?.SEO;

    return {
        title: seo?.metaTitle || "Webinar",
        description: seo?.metaDescription || "",
        robots: seo?.metaRobots || "index,follow",
        alternates: {
            canonical: seo?.canonicalURL || undefined,
        },
        openGraph: {
            title: seo?.ogTitle || seo?.metaTitle,
            description: seo?.ogDescription || seo?.metaDescription,
            images: seo?.ogImage?.url ? [{ url: seo.ogImage.url }] : [],
        },
        twitter: {
            card: "summary_large_image",
            title: seo?.twitterCardTitle || seo?.metaTitle,
            description: seo?.metaDescription || "",
            images: seo?.ogImage?.url ? [seo.ogImage.url] : [],
        },
    };
}

export default async function Page({ params }: { params: Params }) {
    const { slug } = await params;
    const data = await getWebinarDetailBySlug(slug);
    return <WebinarDetailClient initialData={data} />;
}
