import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { TITLE_FRAGMENT } from "../fragments/titleFragment";
import { FOOTER_FIELDS } from "../fragments/footerFragment";
import client from "../client";

const GET_FOOTER = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${SHARED_IMAGE_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  ${TITLE_FRAGMENT}
  query Footers {
    footers {
      ${FOOTER_FIELDS}
    }
  }
`;

export type FooterResponse = {
  footers: Footer[];
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

type FooterImage = {
  alternativeText?: string;
  height?: number;
  name?: string;
  url?: string;
  width?: number;
};

type FooterImageBlock = {
  Image?: FooterImage | null;
};

type FooterAddressInformation = {
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

type FooterLinksGroup = {
  NavLink?: FooterNavLink[];
};

type FooterNavLink =
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

type FooterMilestonesTitle = {
  CommonTitle?: {
    Title?: string;
    Description?: string;
  }[];
};

type FooterSocialLink = {
  id?: string;
  href?: string;
  label?: string;
  target?: string;
  isExternal?: boolean;
  SubDisc?: string;
  Icon?: FooterImage | null;
};

// ✅ Fetch footer data safely
export async function getFooterData() {
  const data = await client.request<FooterResponse>(GET_FOOTER);

  const footer = data.footers?.[0];

  // ✅ Clean up invalid AddressInformation entries (e.g., nulls or bad shapes)
  if (footer?.AddressInformation) {
    footer.AddressInformation = footer.AddressInformation.filter(
      (item) => item && typeof item.Title === "string",
    );
  }

  return footer || null;
}
