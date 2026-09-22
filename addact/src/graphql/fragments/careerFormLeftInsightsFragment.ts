import { TITLE_DESCRIPTION_IMAGE_FIELDS, type TitleDescriptionImageType } from "./aboutUsBrandValueFragment";
import type { ImageFragmentType } from "./imageFragment";
import type { TitleDescriptionType } from "./titleDescriptionFragment";

export type LeftInsightsType = {
  LeftInsights: TitleDescriptionImageType;
};

export const CAREER_FORM_LEFT_INSIGHTS_FIELDS = `
  LeftInsights {
    ${TITLE_DESCRIPTION_IMAGE_FIELDS}
  }
`;

export type { TitleDescriptionImageType, TitleDescriptionType, ImageFragmentType };


