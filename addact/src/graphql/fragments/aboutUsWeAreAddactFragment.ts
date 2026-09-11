import { ABOUT_US_WE_ARE_ADDACT_NUMBER_FIELDS, type NumberContent } from "./aboutUsWeAreAddactNumberFragment";
export type { NumberContent };
import type { ImageFragmentType } from "./imageFragment";

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

export type ContentChild = {
  text: string;
};

export type ContentBlock = {
  type: string;
  children: ContentChild[];
};

export type WeAreAddactType = {
  Image: ImageFragmentType & {
    url: string;
    alternativeText: string | null;
    height: number;
    width: number;
  };
  SubTitle: string;
  Title: string;
  Content: ContentBlock[];
  NumberContent: NumberContent[];
};

