import type { ImageFragmentType } from "./imageFragment";
import type { TitleDescriptionType } from "./titleDescriptionFragment";

export const TITLE_DESCRIPTION_IMAGE_FIELDS = `
  Title
  Description
  Image {
    ...ImageFields
  }
`;

export const ABOUT_US_ITEM_INNER_FIELDS = `
  SubTitle
  ${TITLE_DESCRIPTION_IMAGE_FIELDS}
`;

export const ABOUT_US_BRAND_VALUE_FIELDS = `
  BrandValue {
    ${ABOUT_US_ITEM_INNER_FIELDS}
  }
`;

export type TitleDescriptionImageType = Required<TitleDescriptionType> & {
  Image: ImageFragmentType;
};

export type AboutUsItemType = TitleDescriptionImageType & {
  SubTitle: string;
};

export type BrandValueType = AboutUsItemType;

export type BrandValueQueryResponse = {
  aboutUs: {
    BrandValue: BrandValueType;
  };
};
