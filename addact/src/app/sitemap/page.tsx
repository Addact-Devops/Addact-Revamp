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
    const pages = getAllStaticRoutes();
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

            <div className="container my-[60px] md:my-[100px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Static Home Link */}
                    <SitemapCard title="Home" href="/" />

                    {/* Dynamic Links */}
                    {pages
                        .filter((path) => path !== "/")
                        .map((path) => (
                            <SitemapCard key={path} title={path.replace("/", "").replace(/-/g, " ")} href={path} />
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
