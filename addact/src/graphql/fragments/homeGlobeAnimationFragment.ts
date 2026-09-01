import { gql } from "graphql-request";

export const HOME_GLOBE_ANIMATION_FRAGMENT = gql`
  fragment HomeGlobeAnimationFields on Home {
    GlobeAnimation {
      Title
      Locations
      Video {
        alternativeText
        url
        name
        width
        height
      }
    }
  }
`;
