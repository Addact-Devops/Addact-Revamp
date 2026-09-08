import { TITLE_DESCRIPTION_FIELDS } from "./titleDescriptionFragment";

export const OUR_SOLUTIONS_FIELDS = `
  OurSolutions {
    Title
    SolutionsCards {
      ${TITLE_DESCRIPTION_FIELDS}
    }
  }
`;

