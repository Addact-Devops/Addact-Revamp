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
  ogImage?: {
    url?: string | null;
  } | null;
  metaRobots?: string | null;
  twitterCardTitle?: string | null;
  canonicalURL?: string | null;
  structuredData?: string | Record<string, unknown> | null;
  languageTag?: string | null;
};

export type SEO = SeoType;

export type PageSEO = {
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: { url?: string };
  metaRobots?: string;
  twitterCardTitle?: string;
  canonicalURL?: string;
  structuredData?: Record<string, unknown>;
  languageTag?: string;
};

export type BlogBySlugSEO = PageSEO;
export type ThankYouPageSEO = PageSEO;
export type WebinarSEO = PageSEO;
