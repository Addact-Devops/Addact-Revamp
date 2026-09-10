// Re-using OurServiceList from digitalMarketingListingFragment to avoid duplicate type definitions
import { type OurServiceList } from "./digitalMarketingListingFragment";

export const DM_OUR_SERVICE_FIELDS = `
  ourService {
    ... on ComponentHomeDigitalMarketingListing { ...DigitalMarketingListingFields }
    ... on ComponentHomeServiceList { ...OurServiceFields }
  }
`;

export type { OurServiceList };

export type DmOurServiceType = {
  ourService: OurServiceList[];
};
