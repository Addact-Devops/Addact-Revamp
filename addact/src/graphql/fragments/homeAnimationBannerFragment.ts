import { gql } from "graphql-request";
import { HOME_ANIMATION_BANNER_SUB_TITLE_FIELDS } from "./homeAnimationBannerSubTitleFragment";
import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";

export const ANIMATION_BANNER_TITLE_DESC_FIELDS = `
  bannerTitle
  bannerDescription
`;

export const HOME_ANIMATION_BANNER_FIELDS = `
  animationBanner {
    animationTitle
    firstAnimationImage {
      ...ImageFields
    }
    secondAnimationImage {
      ...ImageFields
    }
    ${ANIMATION_BANNER_TITLE_DESC_FIELDS}
    ${HOME_ANIMATION_BANNER_SUB_TITLE_FIELDS}
    bannerImage {
      ...ImageFields
    }
    bannerLink {
      ...LinkFields
    }
  }
`;

export const HOME_ANIMATION_BANNER_FRAGMENT = gql`
  fragment HomeAnimationBannerFields on Home {
    ${HOME_ANIMATION_BANNER_FIELDS}
  }
`;

export type AnimationBannerLink = LinkFragmentType;

import type { TitleFragmentType } from "./titleFragment";

export type AnimationBannerSubTitle = Required<TitleFragmentType>;

export type AnimationBannerTitleDescription = {
  bannerTitle: string;
  bannerDescription: string;
};

export type AnimationBanner = AnimationBannerTitleDescription & {
  animationTitle: string;
  firstAnimationImage: ImageFragmentType;
  secondAnimationImage: ImageFragmentType;
  bannerSubTitle: AnimationBannerSubTitle[];
  bannerImage: ImageFragmentType;
  bannerLink: AnimationBannerLink;
};

export type HomeAnimationBannerType = {
  animationBanner: AnimationBanner;
};
