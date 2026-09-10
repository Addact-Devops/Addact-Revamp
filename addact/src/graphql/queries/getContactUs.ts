import { gql } from "graphql-request";
import client from "../client"; // Adjust path if needed
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { CONTACT_US_PAGE_HEADING_FIELDS, type ContactUsPageHeadingData } from "../fragments/contactUsPageHeadingFragment";
import { CONTACT_US_BANNER_FIELDS, type ContactUsBanner } from "../fragments/contactUsBannerFragment";
import { CONTACT_US_TEAM_IMAGE_FIELDS, type ContactUsTeamImageData } from "../fragments/contactUsTeamImageFragment";
import { CONTACT_US_ADDRESS_FIELDS, type AddressContentData } from "../fragments/contactUsAddressFragment";
export type { AddressContentData, RichTextBlock } from "../fragments/contactUsAddressFragment";
import { CONTACT_US_FORM_BLOCK_FIELDS, type ContactUsFormBlockData } from "../fragments/contactUsFormBlockFragment";
import { CONTACT_US_FORM_FIELDS, type CONTACTUS } from "../fragments/contactUsFormFragment";
export type { CONTACTUS } from "../fragments/contactUsFormFragment";
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

export interface ContactUsResponse {
  contactus: {
    PageHeading: ContactUsPageHeadingData;
    banner: ContactUsBanner;
    AddactTeamImage: ContactUsTeamImageData["AddactTeamImage"];
    TitleLine1: ContactUsTeamImageData["TitleLine1"];
    TitleLine2: ContactUsTeamImageData["TitleLine2"];
    Descriptions: ContactUsTeamImageData["Descriptions"];
    ContactUsAvailability: ContactUsTeamImageData["ContactUsAvailability"];
    AddressContent: AddressContentData;
    ContactUsFormBlock: ContactUsFormBlockData;
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


export async function getContactUsData(): Promise<ContactUsResponse> {
  const data = await client.request<ContactUsResponse>(GET_CONTACT_US);
  return data;
}
