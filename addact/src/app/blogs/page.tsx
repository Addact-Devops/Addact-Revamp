import { generatePageMetadata } from "@/utils/generatePageMetadata";
import type { Metadata } from "next";
import { fetchSinglePage } from "@/utils/fetchSinglePage";
import BlogListContent from "./BlogListContent";

// ✅ SEO metadata from utility
export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata("blogs");
}

export default async function BlogListPage() {
    const seoData = await fetchSinglePage("blogs");
    const structuredData = seoData?.SEO?.structuredData || null;

    return (
        <>
            {/* ✅ Structured data from Strapi */}
            {structuredData && (
                <script
                    type="application/ld+json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData),
                    }}
                />
            )}

            {/* ✅ Actual blog listing UI */}
            <BlogListContent data={seoData} />
        </>
    );
}
