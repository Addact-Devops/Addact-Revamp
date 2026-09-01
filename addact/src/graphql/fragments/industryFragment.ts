export const INDUSTRY_FIELDS = `
  industryListTitle
  industry_list {
    Slug
    listingContext {
      title
      description
      image {
        ...ImageFields
      }
      link {
        ...LinkFields
      }
    }
  }
`;
