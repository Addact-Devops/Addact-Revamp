export const DEVELOPMENT_OUR_SERVICE_FIELDS = `
  ourService {
    ... on ComponentHomeServiceList { ...OurServiceFields }
    ... on ComponentHomeDevelopmentAndDesignListing { ...DevelopmentDesignListingFields }
  }
`;
