import type { HeaderLink } from "./linkFragment";
import type { HeaderCard } from "./headerCardFragment";

export const HEADER_LAYER_3_FRAGMENT = `
  fragment HeaderLayer3Fields on ComponentSharedLayer3 {
    id
    link { ...LinkFields }
    card { ...HeaderCardFields }
    isCardShow
    isNavHide
  }
`;

export type HeaderSubLayer2 = {
  id?: string;
  link?: HeaderLink;
  card?: HeaderCard;
  isCardShow?: boolean;
  isNavHide?: boolean;
};

