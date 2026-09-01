export const PROJECT_HIGHLIGHTS_FIELDS = `
  ProjectHighlights {
    Title
    addact_case_studies {
      Slug
      HeroBanner {
        ... on ComponentBlogHeroBannerBlogHeroBanner {
          BannerTitle
          PublishDate
          BannerImage {
            url
            alternativeText
            width
            height
          }
        }
      }
    }
  }
`;
