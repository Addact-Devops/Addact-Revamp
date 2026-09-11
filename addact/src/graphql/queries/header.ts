import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { TITLE_FRAGMENT } from "../fragments/titleFragment";
import { HEADER_LOGO_FIELDS, type HeaderLogoType } from "../fragments/headerLogoFragment";
export type { HeaderLogoType };
import { HEADER_NAV_FIELDS, type HeaderNavItem, type HeaderNavType } from "../fragments/headerNavFragment";
export type { HeaderNavItem, HeaderNavType };
import { HEADER_CONTACT_US_FIELDS, type HeaderContactUsType } from "../fragments/headerContactUsFragment";
export type { HeaderContactUsType };
import type { ImageFragmentType } from "../fragments/imageFragment";
import type { LinkFragmentType } from "../fragments/linkFragment";
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
  HeaderLogo: ImageFragmentType;
  main_navigations: HeaderNavItem[];
  contact_us: LinkFragmentType[];
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
