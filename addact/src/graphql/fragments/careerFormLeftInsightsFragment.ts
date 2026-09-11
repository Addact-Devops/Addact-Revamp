import { TITLE_DESCRIPTION_IMAGE_FIELDS } from "./aboutUsBrandValueFragment";
import type { ImageFragmentType } from "./imageFragment";

export type LeftInsightsType = {
  Title?: string;
  Description?: string;
  Image?: ImageFragmentType;
};

export const CAREER_FORM_LEFT_INSIGHTS_FIELDS = `
  LeftInsights {
    ${TITLE_DESCRIPTION_IMAGE_FIELDS}
  }
`;


