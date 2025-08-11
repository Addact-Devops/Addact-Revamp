// src/app/brand-guidelines/page.tsx

import { generatePageMetadata } from "@/utils/generatePageMetadata";
import BrandGuidelinesPageClient from "./BrandGuidelinesPageClient";
import { fetchSinglePage } from "@/utils/fetchSinglePage";

export async function generateMetadata() {
    return generatePageMetadata("brandGuideline");
}

export default async function Page() {
    const seoData = await fetchSinglePage("brandGuideline");
    const structuredData = seoData?.SEO?.structuredData || null;

    return (
        <>
            {structuredData && (
                <script
                    type="application/ld+json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData),
                    }}
                />
            )}

            <BrandGuidelinesPageClient />
        </>
    );
}
