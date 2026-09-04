import { FOOTER_LINKS_FIELDS } from "./footerLinksFragment";
import { FOOTER_SOCIAL_MEDIA_FIELDS } from "./footerSocialMediaFragment";

export const FOOTER_FIELDS = `
  Logo {
    Image {
          ...ImageFields
        }
  }
  BackGroundImage {
    Image {
          ...ImageFields
        }
  }
  BackGroundImageMobile {
    Image {
          ...ImageFields
        }
  }
  AddressInformationMobileBgImg {
    Image {
          ...ImageFields
        }
  }
  AddressInformation {
    ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
  }
  ${FOOTER_LINKS_FIELDS}
  milestonestitle {
    CommonTitle {
      ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
    }
  }
  milestonesimage {
    ... on ComponentSharedImage { ...SharedImageFields }
  }
  CopyrightText
  SiteSlog
  ${FOOTER_SOCIAL_MEDIA_FIELDS}
`;
