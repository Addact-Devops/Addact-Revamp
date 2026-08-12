import { notFound } from "next/navigation";
import SiteDetailClient from "./SiteDetailClient";
import { getHireExpertsSlug, HireExpert } from "@/graphql/queries/getHireExpertSlug";
import Script from "next/script";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const data: HireExpert | null = await getHireExpertsSlug(slug);

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
    robots: metaRobots
      ? {
          index: metaRobots.includes("index"),
          follow: metaRobots.includes("follow"),
        }
      : {
          index: true,
          follow: true,
        },
    metadataBase: new URL("https://www.addact.net"),
  };
}

const SiteDetailPage = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const data: HireExpert | null = await getHireExpertsSlug(slug);

  if (!data) return notFound();

  return (
    <>
      {data.SEO?.structuredData?.map((item, index) => (
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

      <SiteDetailClient data={data} />
    </>
  );
};

export default SiteDetailPage;
