import { BLOG_CATEGORY_FIELDS } from "./blogCategoryFragment";
import { BLOG_HERO_BANNER_READ_NOW_FIELDS } from "./blogHeroBannerReadNowFragment";
import { CASE_STUDY_HERO_BANNER_AUTHOR_FIELDS } from "./caseStudyHeroBannerAuthorFragment";

export const CASE_STUDY_HERO_BANNER_FIELDS = `
  HeroBanner {
    ... on ComponentBlogHeroBannerBlogHeroBanner {
      id
      BannerTitle
      BannerDescription
      PublishDate
      BannerImage {
          ...ImageFields
        }
      ${BLOG_CATEGORY_FIELDS}
      ${CASE_STUDY_HERO_BANNER_AUTHOR_FIELDS}
      ${BLOG_HERO_BANNER_READ_NOW_FIELDS}
    }
  }
`;
