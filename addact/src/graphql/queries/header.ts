import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { TITLE_FRAGMENT } from "../fragments/titleFragment";
import { HEADER_LOGO_FIELDS } from "../fragments/headerLogoFragment";
import { HEADER_NAV_FIELDS } from "../fragments/headerNavFragment";
import { HEADER_CONTACT_US_FIELDS } from "../fragments/headerContactUsFragment";
import client from "../client";

const GET_HEADER = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${TITLE_FRAGMENT}
  query Headers {
    headers {
      ${HEADER_LOGO_FIELDS}
      ${HEADER_NAV_FIELDS}
      ${HEADER_CONTACT_US_FIELDS}
    }
  }
`;

export interface HeaderItem {
  HeaderLogo: {
    width: number;
    url: string;
    height: number;
    name: string;
    alternativeText: string;
  };
  main_navigations: {
    Parent: {
      HeaderNavLink: {
        Title: string;
      }[];
      ReferenceTitle: string;
    };
    SubNavLink: {
      href: string;
      isExternal?: boolean;
      id?: string;
      label?: string;
      target?: string;
      SubDisc?: string;
      Icon?: {
        url: string;
        alternativeText: string;
        height: number;
        width: number;
      };
    }[];
    ReferenceTitle: string;
    SubNavImage: {
      alternativeText: string;
      height: number;
      name: string;
      url: string;
      width: number;
    };
  }[];
  contact_us: {
    id: string;
    href: string;
    label: string;
    target: string;
    isExternal: boolean;
  }[];
}

export interface HeaderResponse {
  headers: HeaderItem[];
}

export interface HeaderProps {
  data: HeaderResponse;
}

export async function getHeaderData(): Promise<HeaderResponse> {
  const data = await client.request<HeaderResponse>(GET_HEADER);
  return data;
}
