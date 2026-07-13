import { getHOmePageData } from "@/graphql/queries/getHomePage";
import { fetchSinglePage } from "@/utils/fetchSinglePage";
import { generatePageMetadata } from "@/utils/generatePageMetadata";
import Script from "next/script";

import HomePageFlow from "@/components/templates/HomePageFlow";

export async function generateMetadata() {
  return generatePageMetadata("home");
}

export default async function HomePage() {
  const [homeResponse, seoData] = await Promise.all([
    getHOmePageData(),
    fetchSinglePage("home"), // ✅ fetch SEO.structuredData
  ]);

  const homeData = homeResponse?.home;
  const structuredData = seoData?.SEO?.structuredData;

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

      {/*  End Markup schema */}
      <HomePageFlow homeData={homeData} />
    </>
  );
}
