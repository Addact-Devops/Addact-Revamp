import type { HeaderSubLayer } from "./headerLayer2Fragment";
import { HEADER_LAYER_COMMON_FIELDS, type HeaderSubLayer2 } from "./headerLayer3Fragment";

export const HEADER_LAYER_1_FRAGMENT = `
  fragment HeaderLayer1Fields on ComponentSharedLayer1 {
    ${HEADER_LAYER_COMMON_FIELDS}
    subLayers(pagination: { limit: -1 }) {
      ...HeaderLayer2Fields
    }
  }
`;

export type HeaderMenuItem = HeaderSubLayer2 & {
  subLayers?: HeaderSubLayer[];
};
