import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HEADER_CARD_FRAGMENT } from "../fragments/headerCardFragment";
import { HEADER_LAYER_3_FRAGMENT } from "../fragments/headerLayer3Fragment";
import { HEADER_LAYER_2_FRAGMENT } from "../fragments/headerLayer2Fragment";
import { HEADER_LAYER_1_FRAGMENT } from "../fragments/headerLayer1Fragment";
import type { HeaderImage } from "../fragments/imageFragment";
import type { HeaderLink } from "../fragments/linkFragment";
import type { HeaderCard } from "../fragments/headerCardFragment";
import type { HeaderSubLayer2 } from "../fragments/headerLayer3Fragment";
import type { HeaderSubLayer } from "../fragments/headerLayer2Fragment";
import type { HeaderMenuItem } from "../fragments/headerLayer1Fragment";
import client from "../client";

// Types imported from their respective fragment files
export type {
  HeaderImage,
  HeaderLink,
  HeaderCard,
  HeaderSubLayer2,
  HeaderSubLayer,
  HeaderMenuItem,
};

export type AddactHeaderData = {
  logo?: HeaderImage;
  contactButton?: HeaderCard;
  menu?: HeaderMenuItem[];
  additionalText?: string;
  contactDetails?: HeaderLink[];
};

const GET_ADDACT_HEADER = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${HEADER_CARD_FRAGMENT}
  ${HEADER_LAYER_3_FRAGMENT}
  ${HEADER_LAYER_2_FRAGMENT}
  ${HEADER_LAYER_1_FRAGMENT}
  query AddactHeader {
    addactHeader {
      logo {
        ...ImageFields
      }
      contactButton {
        ...HeaderCardFields
      }
      menu(pagination: { limit: -1 }) {
        ...HeaderLayer1Fields
      }
      additionalText
      contactDetails {
        ...LinkFields
      }
    }
  }
`;

export interface AddactHeaderResponse {
  addactHeader: AddactHeaderData;
}

// ─── Fetcher ──────────────────────────────────────────────────────────────────

export async function getAddactHeaderData(): Promise<AddactHeaderResponse> {
  const data = await client.request<AddactHeaderResponse>(GET_ADDACT_HEADER);
  return data;
}
