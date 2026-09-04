export const SEO_FIELDS = `
  metaTitle
  metaDescription
  ogTitle
  ogDescription
  ogImage {
    url
  }
  metaRobots
  twitterCardTitle
  canonicalURL
  structuredData
  languageTag
`;

export type SeoType = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: { url: string } | null;
  metaRobots?: string | null;
  twitterCardTitle?: string | null;
  canonicalURL?: string | null;
  structuredData?: string | Record<string, unknown> | null;
  languageTag?: string | null;
};
