import { ABOUT_US_WE_ARE_ADDACT_NUMBER_FIELDS, type NumberContent } from "./aboutUsWeAreAddactNumberFragment";
import type { AboutUsItemType } from "./aboutUsBrandValueFragment";
import type { RichTextBlock } from "@/types/common";

export type { NumberContent };

export const ABOUT_US_WE_ARE_ADDACT_FIELDS = `
  WeAreAddact {
    Image {
      ...ImageFields
    }
    SubTitle
    Title
    Content
    ${ABOUT_US_WE_ARE_ADDACT_NUMBER_FIELDS}
  }
`;

export type ContentBlock = RichTextBlock;

export type WeAreAddactType = Omit<AboutUsItemType, "Description"> & {
  Content: ContentBlock[];
  NumberContent: NumberContent[];
};
