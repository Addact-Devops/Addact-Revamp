import type { HeaderLink } from "./linkFragment";
import type { HeaderCard } from "./headerCardFragment";

export const HEADER_LAYER_COMMON_FIELDS = `
    id
    link { ...LinkFields }
    card { ...HeaderCardFields }
    isCardShow
    isNavHide
`;

export const HEADER_LAYER_3_FRAGMENT = `
  fragment HeaderLayer3Fields on ComponentSharedLayer3 {
    ${HEADER_LAYER_COMMON_FIELDS}
  }
`;

export type HeaderBaseLayer = {
  id?: string;
  link?: HeaderLink;
  card?: HeaderCard;
  isCardShow?: boolean;
  isNavHide?: boolean;
};

export type HeaderSubLayer2 = HeaderBaseLayer;

