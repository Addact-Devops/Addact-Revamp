import { gql } from "graphql-request";

export const HOME_BANNER_FRAGMENT = gql`
  fragment HomeBannerFields on Home {
    banner {
      Banner {
        ... on ComponentBannerBanner {
          BannerDescription
          BannerImage {
          ...ImageFields
        }
          BannerLink {
          ...LinkFields
        }
          BannerTitle
        }
      }
    }
  }
`;
