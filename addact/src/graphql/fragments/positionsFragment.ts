import { REUSE_CARD_FIELDS, type ReuseCardFragmentType } from "./reuseCardFragment";

export const POSITIONS_FIELDS = `
  positions {
    EventTitle
    CardInfo {
      ${REUSE_CARD_FIELDS}
    }
  }
`;

export type CardInfoType = ReuseCardFragmentType;

export type PositionItem = {
  EventTitle: string;
  CardInfo: CardInfoType[];
};

export type PositionType = PositionItem & {
  id?: string;
};

export type PositionsType = {
  positions: PositionItem[];
};


