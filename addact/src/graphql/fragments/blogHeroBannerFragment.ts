import { gql } from "graphql-request";
import { ImageFragmentType } from "./imageFragment";
import { LinkFragmentType } from "./linkFragment";

export const BLOG_HERO_BANNER_FRAGMENT = gql`
  fragment BlogHeroBannerFields on ComponentBlogHeroBannerBlogHeroBanner {
    BannerTitle
    BannerDescription
    BannerImage {
      ...ImageFields
    }
    PublishDate
    ReadNow {
      ...LinkFields
    }
  }
`;

export type BlogHeroBannerFragmentType = {
  BannerTitle?: string;
  BannerDescription?: string;
  BannerImage?: ImageFragmentType | null;
  PublishDate?: string;
  ReadNow?: LinkFragmentType | null;
};
