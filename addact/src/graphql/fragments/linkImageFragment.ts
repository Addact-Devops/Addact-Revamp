import { gql } from "graphql-request";
import { Image, Link } from "@/types/common";

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

export type LinkImageItem = {
  id?: string;
  Title: string;
  ClassName?: string;
  Links: Link;
  Icons: Image;
  HoverIcon?: Image | null;
};
