// src/app/sitemap/page.tsx
import Link from "next/link";
import { getAllStaticRoutes } from "@/utils/getStaticRoutes";
import { getSitemapPagePaths, groupSitemapPaths, formatSitemapTitle } from "@/utils/sitemap";
import HeroBanner from "@/components/organisms/HeroBanner";
import { getSitemapBanner } from "@/graphql/queries/getSitemap";
import { Globe2 } from "lucide-react";
import { generatePageMetadata } from "@/utils/generatePageMetadata";
import SitemapAccordion from "./SitemapAccordion";

export async function generateMetadata() {
  return generatePageMetadata("sitemap");
}

export default async function SitemapPage() {
  let pages: string[] = [];

  try {
    pages = await getSitemapPagePaths();
  } catch (error) {
    console.warn("Dynamic sitemap fetch failed, falling back to file-system routes", error);

    try {
      pages = getAllStaticRoutes();
    } catch {
      console.warn("getAllStaticRoutes fallback failed");
    }
  }

  const allPaths = Array.from(new Set(["/", ...pages]));
  const { leaves, groups } = groupSitemapPaths(allPaths);

  // Ensure "/" (Home) is always the very first leaf
  const sortedLeaves = [...(leaves.includes("/") ? ["/"] : []), ...leaves.filter((p) => p !== "/")];

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

      <div className="container-main my-20 lg:my-25 2xl:my-50 space-y-10">
        {/* ── Section 1: leaf pages (no sub-pages) ── */}
        {sortedLeaves.length > 0 && (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedLeaves.map((path) => (
                <SitemapCard key={path} title={formatSitemapTitle(path)} href={path} />
              ))}
            </div>
          </section>
        )}
        <hr />
        {/* ── Section 2: parent pages with sub-pages (sorted by child count desc) ── */}
        {groups.length > 0 && (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {groups.map(({ path, children }) => (
                <SitemapAccordion key={path} path={path} subPages={children} />
              ))}
            </div>
          </section>
        )}
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
      <span className="text-lg font-semibold capitalize group-hover:text-white transition">
        {title}
      </span>
      <Globe2 className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
    </Link>
  );
}
