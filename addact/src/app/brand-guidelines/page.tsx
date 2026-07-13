// src/app/brand-guidelines/page.tsx

import { generatePageMetadata } from "@/utils/generatePageMetadata";
import BrandGuidelinesPageClient from "./BrandGuidelinesPageClient";
import { fetchSinglePage } from "@/utils/fetchSinglePage";
import Script from "next/script";

export async function generateMetadata() {
  return generatePageMetadata("brandGuideline");
}

export default async function Page() {
  const seoData = await fetchSinglePage("brandGuideline");
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

      <BrandGuidelinesPageClient />
    </>
  );
}
