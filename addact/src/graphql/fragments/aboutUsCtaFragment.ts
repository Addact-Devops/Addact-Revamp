import { ABOUT_US_CTA_TITLE_FIELDS } from "./aboutUsCtaTitleFragment";

export const ABOUT_US_CTA_FIELDS = `
  aboutUsCTA {
    ${ABOUT_US_CTA_TITLE_FIELDS}
    CTADescription
    CTAImage {
      ... on ComponentSharedImage {
        Image {
          ...ImageFields
        }
      }
    }
    CTALink {
      ... on ComponentSharedLink {
        ...LinkFields
      }
    }
  }
`;
