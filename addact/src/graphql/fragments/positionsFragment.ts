import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";
import { REUSE_CARD_FIELDS } from "./reuseCardFragment";

export const POSITIONS_FIELDS = `
  positions {
    EventTitle
    CardInfo {
      ${REUSE_CARD_FIELDS}
    }
  }
`;

export type CardInfoImage = ImageFragmentType;

export type CardInfoType = {
  AerrowIcon?: CardInfoImage | null;
  HoverIcon?: CardInfoImage | null;
  Icon?: CardInfoImage | null;
  LogoLink?: LinkFragmentType | null;
  LogoTitle?: string | null;
  TitleIcon?: {
    Title?: string | null;
    Icon?: CardInfoImage | null;
  }[] | null;
};

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


