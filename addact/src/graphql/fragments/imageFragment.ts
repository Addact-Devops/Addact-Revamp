export const IMAGE_INNER_FIELDS = `
  alternativeText
  caption
  width
  height
  url
  name
`;

export const IMAGE_FRAGMENT = `
  fragment ImageFields on UploadFile {
    ${IMAGE_INNER_FIELDS}
  }
`;

export type ImageFragmentType = {
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  url: string;
  name?: string;
};

// Alias used specifically for header image references
export type HeaderImage = ImageFragmentType;

