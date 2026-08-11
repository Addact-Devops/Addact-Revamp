import { notFound } from "next/navigation";
import SiteDetailClient from "./SiteDetailClient";
import { getHireExpertsSlug, HireExpert } from "@/graphql/queries/getHireExpertSlug";

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

  const structuredData = data?.SEO?.structuredData;
  let schemaArray: unknown[] = [];
  if (structuredData) {
    try {
      const parsed = typeof structuredData === "string" ? JSON.parse(structuredData) : structuredData;
      schemaArray = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      schemaArray = [structuredData];
    }
  }

  return (
    <>
      {schemaArray.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: typeof schema === "string" ? schema : JSON.stringify(schema),
          }}
        />
      ))}
      <SiteDetailClient data={data} />
    </>
  );
};

export default SiteDetailPage;
