import { gql } from "graphql-request";
import {
  COMPONENT_BANNER_SECTION_FIELDS,
  type BannerSection,
  type ComponentBannerItem,
} from "./componentBannerFieldsFragment";

export const CAREER_DETAILS_BANNER_FIELDS = COMPONENT_BANNER_SECTION_FIELDS;

export const CAREER_DETAILS_BANNER_FRAGMENT = gql`
  fragment CareerDetailsBannerFields on CareerDetail {
    ${COMPONENT_BANNER_SECTION_FIELDS}
  }
`;

export type CareerDetailsBannerItem = ComponentBannerItem;

export type CareerDetailsBannerType = BannerSection;

export type { BannerSection, ComponentBannerItem };


