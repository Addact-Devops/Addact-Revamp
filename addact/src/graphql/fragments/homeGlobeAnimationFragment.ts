import { gql } from "graphql-request";
import { Image } from "@/types/common";

export const HOME_GLOBE_ANIMATION_FRAGMENT = gql`
  fragment HomeGlobeAnimationFields on Home {
    GlobeAnimation {
      Title
      Locations
      Video {
        ...ImageFields
      }
    }
  }
`;

export type GloabeAnimation = {
  Title: string;
  Locations: string;
  Video: Image;
};

export type HomeGlobeAnimationType = {
  GlobeAnimation: GloabeAnimation;
};
