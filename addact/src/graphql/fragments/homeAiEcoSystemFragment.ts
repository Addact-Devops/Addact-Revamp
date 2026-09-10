import { gql } from "graphql-request";
import { TITLE_DESCRIPTION_LOWER_FIELDS } from "./titleDescriptionFragment";
import { Image } from "@/types/common";

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

export type LogoLayer = {
  tooltip?: string | null;
  Image: Image;
};

export type AIEcoSystemData = {
  title: string;
  description: string;
  tagLine: string;
  firstImage: Image;
  secondImage: Image;
  firstLayerlogos: LogoLayer[];
  secondLayerlogos: LogoLayer[];
};

export type AIEcoSystem = {
  AIEcoSystem: AIEcoSystemData;
};

export type HomeAiEcoSystemType = {
  aiEcoSystem: AIEcoSystem;
};

