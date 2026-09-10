import { ABOUT_US_ITEM_INNER_FIELDS } from "./aboutUsBrandValueFragment";
import type { ImageFragmentType } from "./imageFragment";

export const ABOUT_US_VISION_MISSION_FIELDS = `
  OurVisionMission {
    ${ABOUT_US_ITEM_INNER_FIELDS}
  }
`;

export type ParagraphBlockType = {
  type: "paragraph";
  children: {
    type: string;
    text: string;
  }[];
};

export type VisionMissionItem = {
  SubTitle: string;
  Title: string;
  Description: ParagraphBlockType[];
  Image: ImageFragmentType & {
    url: string;
    alternativeText?: string | null;
  };
};

export type OurVisionMissionData = {
  aboutUs: {
    OurVisionMission: VisionMissionItem[];
  };
};
