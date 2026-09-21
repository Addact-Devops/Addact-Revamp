import { ABOUT_US_ITEM_INNER_FIELDS, type AboutUsItemType } from "./aboutUsBrandValueFragment";

export const ABOUT_US_CONTENT_FIELDS = `
  AboutUsContent {
    ${ABOUT_US_ITEM_INNER_FIELDS}
  }
`;

export type AboutUsContentType = AboutUsItemType;

export type AboutUsContentData = {
  aboutUs: {
    AboutUsContent: AboutUsContentType;
  };
};
