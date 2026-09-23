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
  }
`;

export const HERO_BANNER_SECTION_FIELDS = `
  Banner {
    ${COMPONENT_HERO_BANNER_FIELDS}
  }
`;

export const HERO_BANNER_SEARCHBOX_SECTION_FIELDS = `
  Banner {
    ${COMPONENT_HERO_BANNER_SEARCHBOX_FIELDS}
  }
`;

export const BANNER_HERO_SECTION_FIELDS = `
  banner {
    ${HERO_BANNER_SECTION_FIELDS}
  }
`;

export const HERO_BANNER_FIELDS = `
  HeroBanner {
    ${HERO_BANNER_SECTION_FIELDS}
  }
`;

export const CASE_STUDY_BANNER_SECTION_FIELDS = `
  CaseStudyBanner {
    ${HERO_BANNER_SEARCHBOX_SECTION_FIELDS}
  }
`;

export type { HeroBannerFragmentType };




