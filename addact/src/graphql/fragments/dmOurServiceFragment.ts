export const DM_OUR_SERVICE_FIELDS = `
  ourService {
    ... on ComponentHomeDigitalMarketingListing { ...DigitalMarketingListingFields }
    ... on ComponentHomeServiceList { ...OurServiceFields }
  }
`;
