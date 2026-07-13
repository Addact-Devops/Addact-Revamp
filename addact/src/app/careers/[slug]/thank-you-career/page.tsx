import { getThankYouPageBySlug } from "@/graphql/queries/getThankYouPageBySlug";
import CareerThankYouClient from "./CareerThankYouClient";
import { notFound } from "next/navigation";
import Script from "next/script";

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
    return notFound();
  }

  return (
    <>
      {page.SEO?.structuredData?.map((item, index) => (
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
      <CareerThankYouClient thankYouData={page} />
    </>
  );
}
