import BlogListClient from "./BlogListClient";
import { generatePageMetadata } from "@/utils/generatePageMetadata";
import type { Metadata } from "next";
import { fetchSinglePage } from "@/utils/fetchSinglePage";

export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata("blogs");
}

export default async function BlogListPage() {
    const seoData = await fetchSinglePage("blogs");
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

            <main className="bg-[#0E0D0D]">
                <BlogListClient />
            </main>
        </>
    );
}
