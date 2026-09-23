import { TITLE_DESCRIPTION_FIELDS, type TitleDescriptionType } from "./titleDescriptionFragment";

export const POSITIONS_TITLE_FIELDS = `
  PositionsTitle {
    ${TITLE_DESCRIPTION_FIELDS}
  }
`;

export type PositionsTitleData = TitleDescriptionType;

export type PositionsTitleType = {
  PositionsTitle: PositionsTitleData;
};

