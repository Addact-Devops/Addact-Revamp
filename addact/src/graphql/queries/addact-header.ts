import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HEADER_CARD_FRAGMENT } from "../fragments/headerCardFragment";
import { HEADER_LAYER_3_FRAGMENT } from "../fragments/headerLayer3Fragment";
import { HEADER_LAYER_2_FRAGMENT } from "../fragments/headerLayer2Fragment";
import { HEADER_LAYER_1_FRAGMENT } from "../fragments/headerLayer1Fragment";
import { ADDACT_HEADER_FIELDS } from "../fragments/addactHeaderFragment";
import client from "../client";

const GET_ADDACT_HEADER = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${HEADER_CARD_FRAGMENT}
  ${HEADER_LAYER_3_FRAGMENT}
  ${HEADER_LAYER_2_FRAGMENT}
  ${HEADER_LAYER_1_FRAGMENT}
  query AddactHeader {
    addactHeader {
      ${ADDACT_HEADER_FIELDS}
    }
  }
`;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HeaderImage {
  alternativeText?: string;
  url?: string;
  width?: number;
  height?: number;
}

export interface HeaderLink {
  id?: string;
  href?: string;
  label?: string;
  target?: string;
  isExternal?: boolean;
  SubDisc?: string;
  Icon?: HeaderImage;
}

// Card.link is a single Link (repeatable: false)
export interface HeaderCard {
  title?: string;
  image?: HeaderImage;
  link?: HeaderLink; // SINGLE, not array
}

// Layer 3 — deepest level
export interface HeaderSubLayer2 {
  id?: string;
  link?: HeaderLink; // SINGLE (repeatable: false)
  card?: HeaderCard; // SINGLE (repeatable: false)
  isCardShow?: boolean;
  isNavHide?: boolean;
}

// Layer 2
export interface HeaderSubLayer {
  id?: string;
  link?: HeaderLink; // SINGLE (repeatable: false)
  card?: HeaderCard; // SINGLE (repeatable: false)
  subLayers?: HeaderSubLayer2[]; // ARRAY (repeatable: true)
  isCardShow?: boolean;
  isNavHide?: boolean;
}

// Layer 1 — top-level menu item
export interface HeaderMenuItem {
  id?: string;
  link?: HeaderLink; // SINGLE (repeatable: false)
  card?: HeaderCard; // SINGLE (repeatable: false)
  subLayers?: HeaderSubLayer[]; // ARRAY (repeatable: true)
  isCardShow?: boolean;
  isNavHide?: boolean;
}

// contactButton is a single Card (repeatable: false)
export interface AddactHeaderData {
  logo?: HeaderImage;
  contactButton?: HeaderCard; // SINGLE (repeatable: false)
  menu?: HeaderMenuItem[]; // ARRAY (repeatable: true)
  additionalText?: string;
  contactDetails?: HeaderLink[]; // ARRAY (repeatable: true)
}

export interface AddactHeaderResponse {
  addactHeader: AddactHeaderData;
}

// ─── Fetcher ──────────────────────────────────────────────────────────────────

export async function getAddactHeaderData(): Promise<AddactHeaderResponse> {
  const data = await client.request<AddactHeaderResponse>(GET_ADDACT_HEADER);
  return data;
}
