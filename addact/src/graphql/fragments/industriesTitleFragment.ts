import { TITLE_DESCRIPTION_FIELDS, type TitleDescriptionType } from "./titleDescriptionFragment";

export type IndustriesWeServeTitleType = {
  TitleDescription?: TitleDescriptionType;
};

export const INDUSTRIES_WE_SERVE_TITLE_FIELDS = `
  TitleDescription {
    ${TITLE_DESCRIPTION_FIELDS}
  }
`;


