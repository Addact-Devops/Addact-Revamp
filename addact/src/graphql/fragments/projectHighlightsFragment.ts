import { BLOG_HERO_BANNER_INNER_FIELDS } from "./blogHeroBannerFragment";
import { Image } from "@/types/common";

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

export interface ProjectHighlightCaseStudyType {
  Slug?: string | null;
  HeroBanner?: Array<{
    BannerTitle?: string | null;
    PublishDate?: string | null;
    BannerImage?: Image | null;
  }> | null;
}

export interface ProjectHighlightsType {
  ProjectHighlights?: {
    Title?: string | null;
    addact_case_studies?: ProjectHighlightCaseStudyType[] | null;
  } | null;
}

