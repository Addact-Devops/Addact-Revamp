import { ABOUT_US_ITEM_INNER_FIELDS, type AboutUsItemType } from "./aboutUsBrandValueFragment";

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

export type VisionMissionItem = Omit<AboutUsItemType, "Description"> & {
  Description: ParagraphBlockType[];
};

export type OurVisionMissionData = {
  aboutUs: {
    OurVisionMission: VisionMissionItem[];
  };
};
