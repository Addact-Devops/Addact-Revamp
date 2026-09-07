export const ABOUT_US_ITEM_INNER_FIELDS = `
  Title
  SubTitle
  Description
  Image {
    ...ImageFields
  }
`;

export const ABOUT_US_BRAND_VALUE_FIELDS = `
  BrandValue {
    ${ABOUT_US_ITEM_INNER_FIELDS}
  }
`;
