import type { HeaderImage } from "./imageFragment";
import type { HeaderLink } from "./linkFragment";

export const HEADER_CARD_FRAGMENT = `
  fragment HeaderCardFields on ComponentSharedCard {
    title
    image { ...ImageFields }
    link { ...LinkFields }
  }
`;

export type HeaderCard = {
  title?: string;
  image?: HeaderImage;
  link?: HeaderLink;
};

