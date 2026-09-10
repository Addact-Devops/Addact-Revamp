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

export type FooterImage = {
  alternativeText?: string;
  height?: number;
  name?: string;
  url?: string;
  width?: number;
};

export type FooterImageBlock = {
  Image?: FooterImage | null;
};

export type FooterAddressInformation = {
  Title?: string;
  Description?: string;
  urlKeyword?: string;
  Link?: {
    href?: string;
    isExternal?: boolean;
    label?: string;
    SubDisc?: string;
    target?: string;
    Icon?: FooterImage | null;
  } | null;
};

export type FooterLinksGroup = {
  NavLink?: FooterNavLink[];
};

export type FooterNavLink =
  | {
      Title?: string;
    }
  | {
      id?: string;
      href?: string;
      label?: string;
      target?: string;
      isExternal?: boolean;
    };

export type FooterMilestonesTitle = {
  CommonTitle?: {
    Title?: string;
    Description?: string;
  }[];
};

export type FooterSocialLink = {
  id?: string;
  href?: string;
  label?: string;
  target?: string;
  isExternal?: boolean;
  SubDisc?: string;
  Icon?: FooterImage | null;
};

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

