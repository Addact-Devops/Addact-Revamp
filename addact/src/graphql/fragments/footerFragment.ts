import { FOOTER_LINKS_FIELDS, type FooterNavLinkItem } from "./footerLinksFragment";
import { FOOTER_SOCIAL_MEDIA_FIELDS } from "./footerSocialMediaFragment";
import { IMAGE_FIELD_SELECTION, type ImageFragmentType } from "./imageFragment";
import { SHARED_IMAGE_FIELDS, type SharedImageFragmentType } from "./sharedImageFragment";
import type { LinkFragmentType } from "./linkFragment";
import {
  COMPONENT_TITLE_WITH_DESCRIPTION_FIELDS,
  type TitleWithDescriptionFragmentType,
} from "./titleWithDescriptionFragment";

export const FOOTER_FIELDS = `
  Logo {
    ${IMAGE_FIELD_SELECTION}
  }
  BackGroundImage {
    ${IMAGE_FIELD_SELECTION}
  }
  BackGroundImageMobile {
    ${IMAGE_FIELD_SELECTION}
  }
  AddressInformationMobileBgImg {
    ${IMAGE_FIELD_SELECTION}
  }
  AddressInformation {
    ${COMPONENT_TITLE_WITH_DESCRIPTION_FIELDS}
  }
  ${FOOTER_LINKS_FIELDS}
  milestonestitle {
    CommonTitle {
      ${COMPONENT_TITLE_WITH_DESCRIPTION_FIELDS}
    }
  }
  milestonesimage {
    ${SHARED_IMAGE_FIELDS}
  }
  CopyrightText
  SiteSlog
  ${FOOTER_SOCIAL_MEDIA_FIELDS}
`;

export type FooterImage = ImageFragmentType;
export type FooterImageBlock = SharedImageFragmentType;
export type FooterAddressInformation = TitleWithDescriptionFragmentType;

export type FooterLinksGroup = {
  NavLink?: FooterNavLinkItem[];
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
