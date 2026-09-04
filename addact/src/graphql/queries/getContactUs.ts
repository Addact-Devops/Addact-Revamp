import { gql } from "graphql-request";
import client from "../client"; // Adjust path if needed
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { Image, Link } from "@/types/common";
import { CONTACT_US_PAGE_HEADING_FIELDS } from "../fragments/contactUsPageHeadingFragment";
import { CONTACT_US_BANNER_FIELDS } from "../fragments/contactUsBannerFragment";
import { CONTACT_US_TEAM_IMAGE_FIELDS } from "../fragments/contactUsTeamImageFragment";
import { CONTACT_US_ADDRESS_FIELDS } from "../fragments/contactUsAddressFragment";
import { CONTACT_US_FORM_BLOCK_FIELDS } from "../fragments/contactUsFormBlockFragment";
import { CONTACT_US_FORM_FIELDS } from "../fragments/contactUsFormFragment";
import { SEO_FIELDS } from "../fragments/seoFragment";

export const GET_CONTACT_US = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  query Contactus {
    contactus {
      ${CONTACT_US_PAGE_HEADING_FIELDS}
      ${CONTACT_US_BANNER_FIELDS}
      ${CONTACT_US_TEAM_IMAGE_FIELDS}
      ${CONTACT_US_ADDRESS_FIELDS}
      ${CONTACT_US_FORM_BLOCK_FIELDS}
      ${CONTACT_US_FORM_FIELDS}
      SEO {
        ${SEO_FIELDS}
      }
    }
  }
`;

export interface ImageType {
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}

export interface RichTextBlock {
  type: string;
  children: {
    text: string;
    type?: string;
  }[];
}

export interface ContactUsResponse {
  contactus: {
    PageHeading: {
      PageTitle: string;
      Slug: string;
    };
    banner: {
      Banner: {
        BannerImage: ImageType;
        BannerTitle: string;
        BannerDescription: string;
        BannerLink: {
          href: string;
          label: string;
        };
      }[];
    };
    AddactTeamImage: ImageType;
    TitleLine1: string;
    TitleLine2: string;
    Descriptions: RichTextBlock[];
    ContactUsAvailability: {
      Days: string;
      Availability: string;
    }[];
    AddressContent: {
      OfficeCountry: string;
      OfficeCity: string;
      Address: string;
      ContactUsEmailPhone: {
        Label: string;
        Link: string;
      }[];
      MapIframe: RichTextBlock[];
    };
    ContactUsFormBlock: {
      LeftTitle: string;
      LeftDescription: string;
      LeftBackgroundImage: ImageType;
      RightTitle: string;
      RightDescription: string;
      RecipientEmails: string;
    };
    contactus: CONTACTUS;
    SEO?: {
      metaTitle?: string;
      metaDescription?: string;
      ogTitle?: string;
      ogDescription?: string;
      ogImage?: { url?: string };
      metaRobots?: string;
      twitterCardTitle?: string;
      canonicalURL?: string;
      structuredData?: Record<string, unknown>;
      languageTag?: string;
    } | null;
  };
}

export interface CONTACTUS {
  pageReference: string;
  RecipientEmails: string;
  Form: {
    id: string;
    Title: string;
    Description: string;
    Image: Image;
    Link: Link;
  }[];
}

export async function getContactUsData(): Promise<ContactUsResponse> {
  const data = await client.request<ContactUsResponse>(GET_CONTACT_US);
  return data;
}
