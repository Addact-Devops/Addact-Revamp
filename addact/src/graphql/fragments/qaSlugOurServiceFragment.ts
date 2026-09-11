import type { OurServiceType } from "./ourServiceFragment";

export const QA_SLUG_OUR_SERVICE_FIELDS = `
  ourService {
    ... on ComponentHomeServiceList { ...OurServiceFields }
  }
`;

export type QaSlugOurServiceType = {
  ourService: OurServiceType[];
};

