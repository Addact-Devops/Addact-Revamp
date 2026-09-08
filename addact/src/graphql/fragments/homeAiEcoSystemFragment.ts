import { gql } from "graphql-request";
import { TITLE_DESCRIPTION_LOWER_FIELDS } from "./titleDescriptionFragment";

export const HOME_AI_ECO_SYSTEM_FRAGMENT = gql`
  fragment HomeAiEcoSystemFields on Home {
    aiEcoSystem {
      AIEcoSystem {
        ${TITLE_DESCRIPTION_LOWER_FIELDS}
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

