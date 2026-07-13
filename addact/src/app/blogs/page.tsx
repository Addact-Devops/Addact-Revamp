import { generatePageMetadata } from "@/utils/generatePageMetadata";
import type { Metadata } from "next";
import { fetchSinglePage } from "@/utils/fetchSinglePage";
import BlogListContent from "./BlogListContent";
import { Suspense } from "react";
import Script from "next/script";

// ✅ SEO metadata from utility
export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("blogs");
}

export default async function BlogListPage() {
  const seoData = await fetchSinglePage("blogs");
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

      {/* ✅ Actual blog listing UI */}
      <Suspense fallback={<div>Loading blogs...</div>}>
        <BlogListContent data={seoData} />
      </Suspense>
    </>
  );
}
