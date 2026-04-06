"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe2, ChevronDown } from "lucide-react";
import { formatSitemapTitle } from "@/utils/sitemap";

type SitemapAccordionProps = {
  path: string;
  subPages: string[];
};

export default function SitemapAccordion({ path, subPages }: SitemapAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-gray-700 overflow-hidden">
      {/* Header row: parent link (navigable) + chevron toggle */}
      <div className="flex items-center justify-between p-5">
        <Link
          href={path}
          className="group flex items-center gap-3 flex-1 min-w-0 hover:text-[#155dfc] transition"
        >
          <Globe2 className="w-5 h-5 shrink-0 text-gray-400 group-hover:text-[#155dfc] transition" />
          <span className="text-lg font-semibold capitalize truncate group-hover:text-[#155dfc] transition">
            {formatSitemapTitle(path)}
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Collapse sub-pages" : "Expand sub-pages"}
          aria-expanded={open}
          className="ml-3 shrink-0 rounded p-1 text-gray-400 hover:text-white transition"
        >
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Sub-page links */}
      {open && (
        <ul className="border-t border-gray-700 px-5 py-3 space-y-1 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {subPages.map((childPath) => (
            <li key={childPath}>
              <Link
                href={childPath}
                className="flex items-center gap-2 py-1.5 text-sm text-gray-400 hover:text-[#155dfc] transition capitalize"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600 shrink-0" />
                {formatSitemapTitle(childPath)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
