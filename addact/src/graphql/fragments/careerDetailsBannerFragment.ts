import { gql } from "graphql-request";
import { COMPONENT_BANNER_FIELDS, type ComponentBannerItem } from "./componentBannerFieldsFragment";

export const CAREER_DETAILS_BANNER_FRAGMENT = gql`
  fragment CareerDetailsBannerFields on CareerDetail {
    Banner {
      ${COMPONENT_BANNER_FIELDS}
    }
  }
`;

export type CareerDetailsBannerItem = ComponentBannerItem;

export type CareerDetailsBannerType = {
  Banner: CareerDetailsBannerItem[];
};


