import { TITLE_DESCRIPTION_FIELDS, type TitleDescriptionType } from "./titleDescriptionFragment";

export const PROJECT_COST_CONTENT_FIELDS = `
  Content {
    ${TITLE_DESCRIPTION_FIELDS}
  }
`;

export type ProjectCostEstimatorContentType = Required<TitleDescriptionType>;

