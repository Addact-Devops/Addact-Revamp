import type { OurServiceType } from "./ourServiceFragment";

export const HIRE_SLUG_OUR_SERVICE_FIELDS = `
  ourService {
    ... on ComponentHomeServiceList { ...OurServiceFields }
  }
`;

export type HireSlugOurServiceType = {
  ourService: OurServiceType[];
};

