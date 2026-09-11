import { gql } from "graphql-request";
import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";
import { Image, Link } from "@/types/common";

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

export type BannerItem = {
  BannerTitle: string;
  BannerDescription: string;
  BannerImage: Image;
  BannerLink: Link;
};

export type BANNER = {
  Banner: BannerItem[];
};

export type HomeBannerType = {
  banner: BANNER;
};
