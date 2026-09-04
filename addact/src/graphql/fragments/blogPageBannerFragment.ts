export const BLOG_PAGE_BANNER_FIELDS = `
  blogBanner {
    Banner {
      ... on ComponentBannerBanner {
        id
        ...HeroBannerFields
        show_searchbox
      }
      ... on Error {
        code
        message
      }
    }
  }
`;
