import { gql } from "graphql-request";
import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";

export const LINK_IMAGE_FRAGMENT = gql`
  fragment LinkImageFields on ComponentBaseTemplateLinkImage {
    Title
    ClassName
    Links {
      ...LinkFields
    }
    Icons {
      ...ImageFields
    }
    HoverIcon {
      ...ImageFields
    }
  }
`;

export const COMPONENT_LINK_IMAGE_FIELDS = `
  ... on ComponentBaseTemplateLinkImage { ...LinkImageFields }
`;

export type LinkImageItem = {
  id?: string;
  Title: string;
  ClassName?: string;
  Links: LinkFragmentType;
  Icons: ImageFragmentType;
  HoverIcon?: ImageFragmentType | null;
};
