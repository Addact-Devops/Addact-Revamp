import { gql } from "graphql-request";
import { HOME_ANIMATION_BANNER_SUB_TITLE_FIELDS } from "./homeAnimationBannerSubTitleFragment";

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
