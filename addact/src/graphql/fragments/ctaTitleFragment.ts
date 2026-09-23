import { HEADING_SELECTION_FIELDS, type HeadingFragmentType } from "./headingFragment";

export type CtaTitleType = {
  Title?: HeadingFragmentType[];
};

export const CTA_TITLE_FIELDS = `
  Title {
    ${HEADING_SELECTION_FIELDS}
  }
`;

