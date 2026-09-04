import { gql } from "graphql-request";



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
