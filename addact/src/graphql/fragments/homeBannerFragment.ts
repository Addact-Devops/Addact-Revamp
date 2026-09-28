import { gql } from "graphql-request";
import {
  COMPONENT_BANNER_FIELDS,
  type ComponentBannerItem,
} from "./componentBannerFieldsFragment";

export const HOME_BANNER_FRAGMENT = gql`
  fragment HomeBannerFields on Home {
    banner {
      Banner {
        ${COMPONENT_BANNER_FIELDS}
      }
    }
  }
`;

export type BannerItem = ComponentBannerItem;

export type BANNER = {
  Banner: BannerItem[];
};

export type HomeBannerType = {
  banner: BANNER;
};

