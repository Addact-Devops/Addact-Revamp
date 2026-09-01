export const CASE_STUDY_BANNER_FIELDS = `
  CaseStudyBanner {
    Banner {
      ... on ComponentBannerBanner {
        ...HeroBannerFields
        show_searchbox
      }
    }
  }
`;
