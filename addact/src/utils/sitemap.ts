const SITEMAP_REVALIDATE_SECONDS = 3600;
const MAX_SITEMAP_DEPTH = 2;

function getExternalSitemapUrl(): string {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "");

  if (!strapiUrl) {
    throw new Error("NEXT_PUBLIC_STRAPI_URL is not configured");
  }

  return `${strapiUrl}/api/strapi-5-sitemap-plugin/sitemap.xml`;
}

function decodeXmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractLocEntries(xmlData: string): string[] {
  return Array.from(xmlData.matchAll(/<loc>([\s\S]*?)<\/loc>/gi), ([, value]) =>
    decodeXmlEntities(value.trim()),
  ).filter(Boolean);
}

function isNestedSitemapUrl(value: string): boolean {
  try {
    return new URL(value).pathname.endsWith(".xml");
  } catch {
    return value.endsWith(".xml");
  }
}

function normalizeSitemapPath(value: string): string | null {
  try {
    const pathname = new URL(value).pathname.replace(/\/+$/, "") || "/";

    if (pathname.endsWith(".xml") || pathname.startsWith("/sitemap")) {
      return null;
    }

    return pathname;
  } catch {
    if (!value.startsWith("/")) {
      return null;
    }

    const normalizedPath = value.replace(/\/+$/, "") || "/";

    if (normalizedPath.endsWith(".xml") || normalizedPath.startsWith("/sitemap")) {
      return null;
    }

    return normalizedPath;
  }
}

async function fetchSitemapXml(sitemapUrl: string): Promise<string> {
  const response = await fetch(sitemapUrl, {
    method: "GET",
    next: { revalidate: SITEMAP_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

async function collectSitemapPaths(
  sitemapUrl: string,
  visited = new Set<string>(),
  depth = 0,
): Promise<string[]> {
  if (visited.has(sitemapUrl) || depth > MAX_SITEMAP_DEPTH) {
    return [];
  }

  visited.add(sitemapUrl);

  const xmlData = await fetchSitemapXml(sitemapUrl);
  const locEntries = extractLocEntries(xmlData);

  const nestedSitemapUrls = locEntries.filter(isNestedSitemapUrl);
  const pagePaths = locEntries
    .filter((entry) => !isNestedSitemapUrl(entry))
    .map(normalizeSitemapPath)
    .filter((value): value is string => Boolean(value));

  if (!nestedSitemapUrls.length) {
    return Array.from(new Set(pagePaths));
  }

  const nestedPaths = await Promise.all(
    nestedSitemapUrls.map((nestedSitemapUrl) =>
      collectSitemapPaths(nestedSitemapUrl, visited, depth + 1),
    ),
  );

  return Array.from(new Set([...pagePaths, ...nestedPaths.flat()]));
}

export function getSitemapRevalidateSeconds(): number {
  return SITEMAP_REVALIDATE_SECONDS;
}

export function getPrimarySitemapUrl(): string {
  return getExternalSitemapUrl();
}

export async function getPrimarySitemapXml(): Promise<string> {
  return fetchSitemapXml(getExternalSitemapUrl());
}

export async function getSitemapPagePaths(): Promise<string[]> {
  return collectSitemapPaths(getExternalSitemapUrl());
}

// ─── Grouping helpers ────────────────────────────────────────────────────────

export type SitemapGroup = {
  /** Top-level path that acts as the parent, e.g. "/blogs" */
  path: string;
  /** All descendant paths that belong to this top-level segment */
  children: string[];
};

export type SitemapStructure = {
  /** Top-level pages that have no sub-pages */
  leaves: string[];
  /** Top-level pages that have sub-pages, sorted by child count descending */
  groups: SitemapGroup[];
};

/**
 * Splits a flat list of sitemap paths into leaf pages and parent groups.
 * Grouping is by top-level path segment so that e.g. "/blogs/foo" is always
 * nested under "/blogs" regardless of how many total segments it has.
 */
export function groupSitemapPaths(paths: string[]): SitemapStructure {
  // Map every top-level path → its descendant paths
  const childrenMap = new Map<string, string[]>();

  for (const path of paths) {
    if (path === "/") continue;

    const segments = path.split("/").filter(Boolean);
    const topLevel = "/" + segments[0];

    if (!childrenMap.has(topLevel)) {
      childrenMap.set(topLevel, []);
    }

    if (path !== topLevel) {
      childrenMap.get(topLevel)!.push(path);
    }
  }

  const leaves: string[] = [];
  const groups: SitemapGroup[] = [];

  for (const [topLevel, children] of childrenMap) {
    if (children.length === 0) {
      leaves.push(topLevel);
    } else {
      groups.push({ path: topLevel, children });
    }
  }

  // Highest child-count first
  groups.sort((a, b) => b.children.length - a.children.length);

  return { leaves, groups };
}

/** Human-readable label for any sitemap path */
export function formatSitemapTitle(path: string): string {
  if (path === "/") return "Home";

  // Take the last segment so "/blogs/my-post" → "My Post"
  const lastSegment = path.split("/").filter(Boolean).pop() ?? "";
  return lastSegment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
