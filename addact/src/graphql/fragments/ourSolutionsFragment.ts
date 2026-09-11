import { TITLE_DESCRIPTION_FIELDS, type TitleDescriptionType } from "./titleDescriptionFragment";

export type OurSolutionsItem = {
  Title?: string;
  SolutionsCards?: TitleDescriptionType[];
};

export type OurSolutionsType = {
  OurSolutions?: OurSolutionsItem;
};

export const OUR_SOLUTIONS_FIELDS = `
  OurSolutions {
    Title
    SolutionsCards {
      ${TITLE_DESCRIPTION_FIELDS}
    }
  }
`;


