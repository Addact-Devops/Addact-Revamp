export const AI_BENEFIT_FIELDS = `
  title
  serviceList {
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
