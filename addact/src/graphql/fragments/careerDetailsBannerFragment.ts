import { gql } from "graphql-request";
import { Image, Link } from "@/types/common";
import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";

export const CAREER_DETAILS_BANNER_FRAGMENT = gql`
  fragment CareerDetailsBannerFields on CareerDetail {
    Banner {
      ... on ComponentBannerBanner {
        ${COMPONENT_BANNER_FIELDS}
      }
    }
  }
`;

export type CareerDetailsBannerItem = {
  BannerDescription: string;
  BannerImage: Image;
  BannerTitle: string;
  show_searchbox: boolean;
  BannerLink: Link;
};

export type CareerDetailsBannerType = {
  Banner: CareerDetailsBannerItem[];
};
