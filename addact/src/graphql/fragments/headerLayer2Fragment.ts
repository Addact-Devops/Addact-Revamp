import type { HeaderLink } from "./linkFragment";
import type { HeaderCard } from "./headerCardFragment";
import type { HeaderSubLayer2 } from "./headerLayer3Fragment";

export const HEADER_LAYER_2_FRAGMENT = `
  fragment HeaderLayer2Fields on ComponentSharedLayer2 {
    id
    link { ...LinkFields }
    card { ...HeaderCardFields }
    subLayers(pagination: { limit: -1 }) {
      ...HeaderLayer3Fields
    }
    isCardShow
    isNavHide
  }
`;

export type HeaderSubLayer = {
  id?: string;
  link?: HeaderLink;
  card?: HeaderCard;
  subLayers?: HeaderSubLayer2[];
  isCardShow?: boolean;
  isNavHide?: boolean;
};

