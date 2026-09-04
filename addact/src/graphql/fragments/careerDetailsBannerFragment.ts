import { gql } from "graphql-request";

export const CAREER_DETAILS_BANNER_FRAGMENT = gql`
  fragment CareerDetailsBannerFields on CareerDetail {
    Banner {
      ... on ComponentBannerBanner {
        BannerDescription
        BannerImage {
          ...ImageFields
        }
        BannerTitle
        show_searchbox
        BannerLink {
          ...LinkFields
        }
      }
    }
  }
`;
