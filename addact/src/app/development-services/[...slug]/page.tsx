import { notFound } from "next/navigation";
import SiteDetailClient from "./SiteDetailClient";
import {
  DevelopmentDesignDetail,
  getDevelopmentDesignSlug,
} from "@/graphql/queries/getDevelopmentDesignSlug";
import {
  CmsDetail,
  getDevelopmentDesignDetailsCmsSlug,
} from "@/graphql/queries/getDevelopmentDesignCmsSlug";
import {
  SitecoreDetail,
  getDevelopmentDesignDetailsSitecoreSlug,
} from "@/graphql/queries/getDevelopmentDesignSitecoreSlug";

type Params = Promise<{ slug: string[] }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  let data: DevelopmentDesignDetail | CmsDetail | SitecoreDetail | null = null;

  if (slug.length === 1) {
    data = await getDevelopmentDesignSlug(slug[0]);
  } else if (slug.length === 2) {
    const fullPath = `${slug.join("/")}`;
    data = await getDevelopmentDesignDetailsCmsSlug(fullPath);
  } else if (slug.length === 3) {
    const fullPath = `${slug[2]}`;
    data = await getDevelopmentDesignDetailsSitecoreSlug(fullPath);
  }

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

  let data: DevelopmentDesignDetail | CmsDetail | SitecoreDetail | null = null;

  const apiMap = [
    getDevelopmentDesignSlug,
    getDevelopmentDesignDetailsCmsSlug,
    getDevelopmentDesignDetailsSitecoreSlug,
  ];

  const handler = apiMap[slug.length - 1];
  const lastSlug = slug.at(-1);

  if (handler && lastSlug) {
    data = await handler(lastSlug);
  }

  if (!data) return notFound();

  return <SiteDetailClient data={data} />;
};

export default SiteDetailPage;
