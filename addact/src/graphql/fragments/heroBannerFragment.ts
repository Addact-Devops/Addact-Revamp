import { gql } from "graphql-request";
import {
  COMPONENT_BANNER_INNER_FIELDS as COMPONENT_BANNER_RAW_FIELDS,
  type HeroBannerFragmentType,
} from "./componentBannerFieldsFragment";

export const HERO_BANNER_FRAGMENT = gql`
  fragment HeroBannerFields on ComponentBannerBanner {
    ${COMPONENT_BANNER_RAW_FIELDS}
  }
`;

export const COMPONENT_HERO_BANNER_FIELDS = `
  ... on ComponentBannerBanner {
    ...HeroBannerFields
  }
`;

export const COMPONENT_HERO_BANNER_SEARCHBOX_FIELDS = `
  ... on ComponentBannerBanner {
    id
    ...HeroBannerFields
    show_searchbox
  }
`;

export const COMPONENT_BANNER_INNER_FIELDS = `
  ... on ComponentBannerBanner {
    ...HeroBannerFields
  }
`;

export type { HeroBannerFragmentType };




