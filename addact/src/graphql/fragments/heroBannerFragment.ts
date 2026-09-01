import { gql } from "graphql-request";
import { ImageFragmentType } from "./imageFragment";

export const HERO_BANNER_FRAGMENT = gql`
  fragment HeroBannerFields on ComponentBannerBanner {
    BannerTitle
    BannerDescription
    BannerImage {
      ...ImageFields
    }
  }
`;

export type HeroBannerFragmentType = {
  BannerTitle?: string;
  BannerDescription?: string;
  BannerImage?: ImageFragmentType | null;
};
