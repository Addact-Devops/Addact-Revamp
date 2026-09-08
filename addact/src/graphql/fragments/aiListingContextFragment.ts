import { TITLE_DESCRIPTION_LOWER_FIELDS } from "./titleDescriptionFragment";

export const AI_LISTING_CONTEXT_FIELDS = `
  ${TITLE_DESCRIPTION_LOWER_FIELDS}
  image {
    ...ImageFields
  }
  link {
    ...LinkFields
  }
`;

