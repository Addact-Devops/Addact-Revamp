import { gql } from "graphql-request";
import {
  COMPONENT_BANNER_FIELDS,
  type BannerTitleDescriptionType,
} from "./componentBannerFieldsFragment";
import type { Image, Link } from "@/types/common";

export const HOME_BANNER_FRAGMENT = gql`
  fragment HomeBannerFields on Home {
    banner {
      Banner {
        ... on ComponentBannerBanner {
          ${COMPONENT_BANNER_FIELDS}
        }
      }
    }
  }
`;

export type BannerItem = Required<BannerTitleDescriptionType> & {
  BannerImage: Image;
  BannerLink: Link;
};

export type BANNER = {
  Banner: BannerItem[];
};

export type HomeBannerType = {
  banner: BANNER;
};
