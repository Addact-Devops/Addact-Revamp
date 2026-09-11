import { type OurServiceType } from "./ourServiceFragment";

export const AI_SLUG_OUR_SERVICE_FIELDS = `
  ourService {
    ... on ComponentHomeServiceList { ...OurServiceFields }
  }
`;

export type { OurServiceType };

export type AiSlugOurServiceType = {
  ourService: OurServiceType | null;
};
