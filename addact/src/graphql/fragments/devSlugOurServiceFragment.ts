export const DEV_SLUG_OUR_SERVICE_FIELDS = `
  ourService {
    ... on ComponentHomeCmsListing { ...CmsListingFields }
    ... on ComponentHomeServiceList { ...OurServiceFields }
  }
`;
