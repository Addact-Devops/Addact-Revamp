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

