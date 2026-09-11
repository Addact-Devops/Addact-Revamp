import { Link } from "@/types/common";

export const POSITIONS_FIELDS = `
  positions {
    EventTitle
    CardInfo {
      ... on ComponentReuseCard { ...ReuseCardFields }
    }
  }
`;

export type CardInfoImage = {
  url: string;
  name?: string;
  width?: number;
  height?: number;
  alternativeText?: string;
};

export type CardInfoType = {
  AerrowIcon?: CardInfoImage;
  HoverIcon?: CardInfoImage;
  Icon?: CardInfoImage;
  LogoLink?: Link;
  LogoTitle?: string;
  TitleIcon?: {
    Title?: string;
    Icon: CardInfoImage;
  }[];
};

export type PositionItem = {
  EventTitle: string;
  CardInfo: CardInfoType[];
};

export type PositionType = PositionItem & {
  id: string;
};

export type PositionsType = {
  positions: PositionItem[];
};
