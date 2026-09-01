import { gql } from "graphql-request";

export const HOME_BANNER_FRAGMENT = gql`
  fragment HomeBannerFields on Home {
    banner {
      Banner {
        ... on ComponentBannerBanner {
          BannerDescription
          BannerImage {
            alternativeText
            height
            name
            url
            width
          }
          BannerLink {
            href
            id
            isExternal
            label
            target
          }
          BannerTitle
        }
      }
    }
  }
`;
