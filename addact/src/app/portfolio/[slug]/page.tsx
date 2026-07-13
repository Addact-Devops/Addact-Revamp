import type { Metadata } from "next";
import { getCaseStudyBySlug } from "@/graphql/queries/getCaseStudyBySlug";
import PortfolioDetailClient from "./PortfolioDetailClient";
import Script from "next/script";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCaseStudyBySlug(slug);
  const seo = data?.SEO;

  return {
    title: seo?.metaTitle || seo?.ogTitle || "Case Study",
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

export default async function PortfolioDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const seoData = await getCaseStudyBySlug(slug);
  const structuredData = seoData?.SEO?.structuredData || null;

  return (
    <>
      {structuredData?.map((item, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item),
          }}
        />
      ))}

      <PortfolioDetailClient slug={slug} />
    </>
  );
}
