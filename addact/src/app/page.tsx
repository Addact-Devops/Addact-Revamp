import { getHOmePageData } from "@/graphql/queries/getHomePage";
import { fetchSinglePage } from "@/utils/fetchSinglePage";
import { generatePageMetadata } from "@/utils/generatePageMetadata";

import HomePageFlow from "@/components/templates/HomePageFlow";
import StructuredDataScript from "@/components/atom/StructuredDataScript";

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
      <StructuredDataScript data={structuredData} />
      <HomePageFlow homeData={homeData} />
    </>
  );
}
