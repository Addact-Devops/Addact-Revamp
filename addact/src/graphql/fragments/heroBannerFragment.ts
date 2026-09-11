import { gql } from "graphql-request";
import { ImageFragmentType } from "./imageFragment";
import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";

export const HERO_BANNER_FRAGMENT = gql`
  fragment HeroBannerFields on ComponentBannerBanner {
    ${COMPONENT_BANNER_FIELDS}
  }
`;

export type HeroBannerFragmentType = {
  BannerTitle?: string;
  BannerDescription?: string;
  BannerImage?: ImageFragmentType | null;
};
