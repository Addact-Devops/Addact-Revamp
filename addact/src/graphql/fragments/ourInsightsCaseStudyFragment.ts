import { BLOG_HERO_BANNER_READ_NOW_FIELDS } from "./blogHeroBannerReadNowFragment";

export const OUR_INSIGHTS_CASE_STUDY_FIELDS = `
  addactCaseStudies(pagination: { page: 1, pageSize: 2 }, sort: ["publishedAt:desc"]) {
    ReferenceTitle
    Slug
    HeroBanner {
      ... on ComponentBlogHeroBannerBlogHeroBanner {
        BannerImage {
          ...ImageFields
        }
        BannerTitle
        ${BLOG_HERO_BANNER_READ_NOW_FIELDS}
        PublishDate
        BannerDescription
      }
    }
  }
`;

