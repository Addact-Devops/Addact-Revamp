// src/app/brand-guidelines/page.tsx

import { generatePageMetadata } from "@/utils/generatePageMetadata";
import BrandGuidelinesPageClient from "./BrandGuidelinesPageClient";
import { fetchSinglePage } from "@/utils/fetchSinglePage";
import StructuredDataScript from "@/components/atom/StructuredDataScript";

export async function generateMetadata() {
  return generatePageMetadata("brandGuideline");
}

export default async function Page() {
  const seoData = await fetchSinglePage("brandGuideline");
  const structuredData = seoData?.SEO?.structuredData || null;

  return (
    <>
      <StructuredDataScript data={structuredData} />

      <BrandGuidelinesPageClient />
    </>
  );
}
