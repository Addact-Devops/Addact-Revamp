// src/app/sitemap/page.tsx
import Link from "next/link";
import { getAllStaticRoutes } from "@/utils/getStaticRoutes";
import HeroBanner from "@/components/organisms/HeroBanner";
import { getSitemapBanner } from "@/graphql/queries/getSitemap";
import { Globe2 } from "lucide-react";
import { generatePageMetadata } from "@/utils/generatePageMetadata";

export async function generateMetadata() {
    return generatePageMetadata("sitemap");
}

export default async function SitemapPage() {
    let pages: string[] = [];

    try {
        pages = getAllStaticRoutes();
    } catch {
        console.warn("getAllStaticRoutes failed, using fallback list");
    }

    // Full fallback list taken from your HTML inspect output
    const fallbackRoutes: string[] = [
        "/", // Home (kept for completeness; your UI already renders Home statically)
        "/about-us",
        "/blogs",
        "/brand-guidelines",
        "/careers",
        "/contact-us",
        "/contentful-cms-development",
        "/contentstack-cms-development",
        "/events",
        "/kentico-cms-development",
        "/portfolio",
        "/press-releases",
        "/privacy-policy",
        "/sitecore-cms-development",
        "/strapi-cms-development",
        "/terms-of-use",
        "/umbraco-cms-development",
        "/videos",
        "/webinar",
    ];

    // Merge FS routes + fallback, de-duplicate and keep order
    const allRoutes = Array.from(new Set([...pages, ...fallbackRoutes]));

    const banner = await getSitemapBanner();

    return (
        <main>
            {banner && (
                <HeroBanner
                    title={banner.BannerTitle || ""}
                    description={banner.BannerDescription || ""}
                    backgroundImageUrl={banner.BannerImage?.url || ""}
                />
            )}

            <div className="container my-[60px] xl:my-[100px] 2xl:my-[200px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Static Home Link */}
                    <SitemapCard title="Home" href="/" />

                    {/* Dynamic + Fallback Links */}
                    {allRoutes
                        .filter((path) => path !== "/" && path.split("/").length === 2) // Keep only top-level paths
                        .map((path) => (
                            <SitemapCard key={path} title={formatTitle(path)} href={path} />
                        ))}
                </div>
            </div>
        </main>
    );
}

type SitemapCardProps = {
    title: string;
    href: string;
};

function SitemapCard({ title, href }: SitemapCardProps) {
    return (
        <Link
            href={href}
            className="group flex items-center justify-between p-5 rounded-lg border border-gray-700 hover:bg-[#155dfc] transition duration-200"
        >
            <span className="text-lg font-semibold capitalize group-hover:text-[#fff] transition">{title}</span>
            <Globe2 className="w-5 h-5 text-gray-400 group-hover:text-[#fff] transition" />
        </Link>
    );
}

// Helper to format the title from the path
function formatTitle(path: string) {
    const cleanPath = path.replace("/", ""); // Remove leading slash
    return cleanPath
        .replace(/-/g, " ") // Replace dashes with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
}
