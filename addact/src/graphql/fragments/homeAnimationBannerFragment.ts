import { gql } from "graphql-request";
import { HOME_ANIMATION_BANNER_SUB_TITLE_FIELDS } from "./homeAnimationBannerSubTitleFragment";
import { Image } from "@/types/common";

export const HOME_ANIMATION_BANNER_FRAGMENT = gql`
  fragment HomeAnimationBannerFields on Home {
    animationBanner {
      animationTitle
      firstAnimationImage {
        ...ImageFields
      }
      secondAnimationImage {
        ...ImageFields
      }
      bannerTitle
      bannerDescription
      ${HOME_ANIMATION_BANNER_SUB_TITLE_FIELDS}
      bannerImage {
        ...ImageFields
      }
      bannerLink {
        ...LinkFields
      }
    }
  }
`;

export type AnimationBannerLink = {
  Icon: Image | null;
  SubDisc: string | null;
  href: string;
  id: string;
  isExternal: boolean;
  label: string;
  target: string;
};

export type AnimationBannerSubTitle = {
  Title: string;
};

export type AnimationBanner = {
  animationTitle: string;
  firstAnimationImage: Image;
  secondAnimationImage: Image;
  bannerTitle: string;
  bannerDescription: string;
  bannerSubTitle: AnimationBannerSubTitle[];
  bannerImage: Image;
  bannerLink: AnimationBannerLink;
};

export type HomeAnimationBannerType = {
  animationBanner: AnimationBanner;
};
