import { TITLE_DESCRIPTION_FIELDS } from "./titleDescriptionFragment";

export const POSITIONS_TITLE_FIELDS = `
  PositionsTitle {
    ${TITLE_DESCRIPTION_FIELDS}
  }
`;

export type PositionsTitleData = {
  Title?: string;
  Description?: string;
};

export type PositionsTitleType = {
  PositionsTitle: PositionsTitleData;
};

