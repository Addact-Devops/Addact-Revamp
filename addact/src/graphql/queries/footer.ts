import { gql } from "graphql-request";
import client from "../client";

const GET_FOOTER = gql`
  query Footers {
    footers {
      Logo {
        Image {
          alternativeText
          height
          name
          url
          width
        }
      }
      BackGroundImage {
        Image {
          alternativeText
          height
          name
          url
          width
        }
      }
      BackGroundImageMobile {
        Image {
          alternativeText
          height
          name
          url
          width
        }
      }
      AddressInformationMobileBgImg {
        Image {
          alternativeText
          height
          name
          url
          width
        }
      }
      AddressInformation {
        ... on ComponentBaseTemplateTitleWithDescription {
          Title
          Description
          Link {
            href
            isExternal
            label
            SubDisc
            target
            Icon {
              alternativeText
              width
              height
              url
            }
          }
        }
      }

      footerlinks {
        NavLink {
          ... on ComponentBaseTemplateTitle {
            Title
          }
          ... on ComponentSharedLink {
            id
            href
            label
            target
            isExternal
          }
        }
      }
      milestonestitle {
        CommonTitle {
          ... on ComponentBaseTemplateTitleWithDescription {
            Title
            Description
          }
        }
      }
      milestonesimage {
        ... on ComponentSharedImage {
          Image {
            alternativeText
            height
            name
            url
            width
          }
        }
      }
      CopyrightText
      SiteSlog
      socialMedia {
        id
        href
        label
        target
        isExternal
        SubDisc
        Icon {
          alternativeText
          height
          url
          width
        }
      }
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
