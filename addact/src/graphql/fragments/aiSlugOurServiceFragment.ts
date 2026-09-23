import { OUR_SERVICE_FIELDS, type OurServiceType } from "./ourServiceFragment";

export const AI_SLUG_OUR_SERVICE_FIELDS = OUR_SERVICE_FIELDS;


export type { OurServiceType };

export type AiSlugOurServiceType = {
  ourService: OurServiceType | null;
};

