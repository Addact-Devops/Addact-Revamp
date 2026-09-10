import { ABOUT_US_ITEM_INNER_FIELDS } from "./aboutUsBrandValueFragment";
import type { ImageFragmentType } from "./imageFragment";

export const ABOUT_US_CONTENT_FIELDS = `
  AboutUsContent {
    ${ABOUT_US_ITEM_INNER_FIELDS}
  }
`;

export type AboutUsContentType = {
  SubTitle: string;
  Title: string;
  Description: string;
  Image: ImageFragmentType & {
    url: string;
    alternativeText?: string | null;
  };
};

export type AboutUsContentData = {
  aboutUs: {
    AboutUsContent: AboutUsContentType;
  };
};
