import { gql } from "graphql-request";
import { TITLE_DESCRIPTION_LOWER_FIELDS, type TitleDescriptionLowerType } from "./titleDescriptionFragment";
import { IMAGE_FIELD_SELECTION } from "./imageFragment";
import { Image } from "@/types/common";

export const LAYER_LOGOS_FIELDS = `
  tooltip
  ${IMAGE_FIELD_SELECTION}
`;

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
          ${LAYER_LOGOS_FIELDS}
        }
        secondLayerlogos {
          ${LAYER_LOGOS_FIELDS}
        }
      }
    }
  }
`;

export type LogoLayer = {
  tooltip?: string | null;
  Image: Image;
};

export type AIEcoSystemData = Required<TitleDescriptionLowerType> & {
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
