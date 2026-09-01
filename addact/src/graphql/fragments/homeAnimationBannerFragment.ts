import { gql } from "graphql-request";

export const HOME_ANIMATION_BANNER_FRAGMENT = gql`
  fragment HomeAnimationBannerFields on Home {
    animationBanner {
      animationTitle
      firstAnimationImage {
        alternativeText
        height
        url
        width
      }
      secondAnimationImage {
        alternativeText
        height
        url
        width
      }
      bannerTitle
      bannerDescription
      bannerSubTitle {
        Title
      }
      bannerImage {
        alternativeText
        height
        url
        width
      }
      bannerLink {
        Icon {
          alternativeText
          height
          url
          width
        }
        SubDisc
        href
        id
        isExternal
        label
        target
      }
    }
  }
`;
