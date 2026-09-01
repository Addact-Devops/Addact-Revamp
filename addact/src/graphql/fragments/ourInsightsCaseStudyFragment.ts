export const OUR_INSIGHTS_CASE_STUDY_FIELDS = `
  addactCaseStudies(pagination: { page: 1, pageSize: 2 }, sort: ["publishedAt:desc"]) {
    ReferenceTitle
    Slug
    HeroBanner {
      ... on ComponentBlogHeroBannerBlogHeroBanner {
        BannerImage {
          alternativeText
          height
          name
          url
          width
        }
        BannerTitle
        ReadNow {
          href
          id
          isExternal
          label
          target
        }
        PublishDate
        BannerDescription
      }
    }
  }
`;
