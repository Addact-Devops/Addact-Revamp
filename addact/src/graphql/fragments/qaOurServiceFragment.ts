import type { OurServiceList } from "./qaTestingListingFragment";

export const QA_OUR_SERVICE_FIELDS = `
  ourService {
    ... on ComponentHomeQaTestingListing { ...QaTestingListingFields }
  }
`;

export type QaOurServiceType = {
  ourService: OurServiceList[];
};

