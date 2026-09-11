import type { HeaderLink } from "./linkFragment";
import type { HeaderCard } from "./headerCardFragment";
import type { HeaderSubLayer } from "./headerLayer2Fragment";

export const HEADER_LAYER_1_FRAGMENT = `
  fragment HeaderLayer1Fields on ComponentSharedLayer1 {
    id
    link { ...LinkFields }
    card { ...HeaderCardFields }
    subLayers(pagination: { limit: -1 }) {
      ...HeaderLayer2Fields
    }
    isCardShow
    isNavHide
  }
`;

export type HeaderMenuItem = {
  id?: string;
  link?: HeaderLink;
  card?: HeaderCard;
  subLayers?: HeaderSubLayer[];
  isCardShow?: boolean;
  isNavHide?: boolean;
};

