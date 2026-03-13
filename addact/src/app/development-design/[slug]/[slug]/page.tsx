import { notFound } from "next/navigation";
import {
  DevelopmentDesignDetail,
  getDevelopmentDesignSlug,
} from "@/graphql/queries/getDevelopmentDesignSlug";
import DetailSlug from "./DetailSlug";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const data: DevelopmentDesignDetail | null =
    await getDevelopmentDesignSlug(slug);

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

const DetailSlugPage = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const data: DevelopmentDesignDetail | null =
    await getDevelopmentDesignSlug(slug);

  if (!data) return notFound();

  return <DetailSlug data={data} />;
};

export default DetailSlugPage;
