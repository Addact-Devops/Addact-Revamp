import { FOOTER_LINKS_FIELDS, type FooterNavLinkItem } from "./footerLinksFragment";
import { FOOTER_SOCIAL_MEDIA_FIELDS } from "./footerSocialMediaFragment";
import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";
import type { TitleWithDescriptionFragmentType } from "./titleWithDescriptionFragment";

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

export type FooterImage = ImageFragmentType;

export type FooterImageBlock = {
  Image?: FooterImage | null;
};

export type FooterAddressInformation = TitleWithDescriptionFragmentType;

export type FooterLinksGroup = {
  NavLink?: FooterNavLink[];
};

export type FooterNavLink = FooterNavLinkItem;

export type FooterMilestonesTitle = {
  CommonTitle?: TitleWithDescriptionFragmentType[];
};

export type FooterSocialLink = LinkFragmentType;

export type Footer = {
  Logo?: FooterImageBlock | null;
  BackGroundImage?: FooterImageBlock | null;
  BackGroundImageMobile?: FooterImageBlock | null;
  AddressInformationMobileBgImg?: FooterImageBlock | null;
  AddressInformation?: FooterAddressInformation[];
  footerlinks?: FooterLinksGroup[];
  milestonestitle?: FooterMilestonesTitle | null;
  milestonesimage?: FooterImageBlock[];
  socialMedia?: FooterSocialLink[];
  CopyrightText?: string;
  SiteSlog?: string;
};


