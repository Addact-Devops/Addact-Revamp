import { BLOG_HERO_BANNER_INNER_FIELDS, type BlogHeroBannerItem } from "./blogHeroBannerFragment";

export const PROJECT_HIGHLIGHTS_FIELDS = `
  ProjectHighlights {
    Title
    addact_case_studies {
      Slug
      HeroBanner {
        ... on ComponentBlogHeroBannerBlogHeroBanner {
          ${BLOG_HERO_BANNER_INNER_FIELDS}
        }
      }
    }
  }
`;

export type ProjectHighlightCaseStudyType = {
  Slug?: string | null;
  HeroBanner?: BlogHeroBannerItem[] | null;
};

export type ProjectHighlightsType = {
  ProjectHighlights?: {
    Title?: string | null;
    addact_case_studies?: ProjectHighlightCaseStudyType[] | null;
  } | null;
};


