import type { OurServiceList } from "./developmentDesignListingFragment";

export const DEVELOPMENT_OUR_SERVICE_FIELDS = `
  ourService {
    ... on ComponentHomeServiceList { ...OurServiceFields }
    ... on ComponentHomeDevelopmentAndDesignListing { ...DevelopmentDesignListingFields }
  }
`;

export type DevelopmentOurServiceType = {
  ourService: OurServiceList[];
};

