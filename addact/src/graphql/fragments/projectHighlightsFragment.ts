import { BLOG_HERO_BANNER_INNER_FIELDS } from "./blogHeroBannerFragment";

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


