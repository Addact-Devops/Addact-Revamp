import { gql } from "graphql-request";

export const HOME_AI_ECO_SYSTEM_FRAGMENT = gql`
  fragment HomeAiEcoSystemFields on Home {
    aiEcoSystem {
      AIEcoSystem {
        title
        description
        tagLine
        firstImage {
          ...ImageFields
        }
        secondImage {
          ...ImageFields
        }
        firstLayerlogos {
          tooltip
          Image {
            ...ImageFields
          }
        }
        secondLayerlogos {
          tooltip
          Image {
            ...ImageFields
          }
        }
      }
    }
  }
`;
