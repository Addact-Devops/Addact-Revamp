import { gql } from "graphql-request";

export const HOME_AI_ECO_SYSTEM_FRAGMENT = gql`
  fragment HomeAiEcoSystemFields on Home {
    aiEcoSystem {
      AIEcoSystem {
        title
        description
        tagLine
        firstImage {
          alternativeText
          height
          url
          width
        }
        secondImage {
          alternativeText
          height
          url
          width
        }
        firstLayerlogos {
          tooltip
          Image {
            alternativeText
            height
            url
            width
          }
        }
        secondLayerlogos {
          tooltip
          Image {
            alternativeText
            height
            url
            width
          }
        }
      }
    }
  }
`;
