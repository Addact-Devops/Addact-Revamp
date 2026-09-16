import { type OurService } from "./aiOurServicesFragment";

export const AI_OUR_SERVICE_FIELDS = `
  ourService {
    ... on ComponentHomeAiOurServices { ...AiOurServicesFields }
  }
`;

// OurService type defined in aiOurServicesFragment.ts (where AiOurServicesFields is declared)
export type { OurService };

export type AiOurServiceType = {
  ourService: OurService | null;
};

