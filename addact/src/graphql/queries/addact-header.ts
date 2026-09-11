import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HEADER_CARD_FRAGMENT } from "../fragments/headerCardFragment";
import { HEADER_LAYER_3_FRAGMENT } from "../fragments/headerLayer3Fragment";
import { HEADER_LAYER_2_FRAGMENT } from "../fragments/headerLayer2Fragment";
import { HEADER_LAYER_1_FRAGMENT } from "../fragments/headerLayer1Fragment";
import { ADDACT_HEADER_FIELDS } from "../fragments/addactHeaderFragment";
import client from "../client";

// Types imported from their respective fragment files
export type { HeaderImage } from "../fragments/imageFragment";
export type { HeaderLink } from "../fragments/linkFragment";
export type { HeaderCard } from "../fragments/headerCardFragment";
export type { HeaderSubLayer2 } from "../fragments/headerLayer3Fragment";
export type { HeaderSubLayer } from "../fragments/headerLayer2Fragment";
export type { HeaderMenuItem } from "../fragments/headerLayer1Fragment";
export type { AddactHeaderData } from "../fragments/addactHeaderFragment";

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

export interface AddactHeaderResponse {
  addactHeader: import("../fragments/addactHeaderFragment").AddactHeaderData;
}

// ─── Fetcher ──────────────────────────────────────────────────────────────────

export async function getAddactHeaderData(): Promise<AddactHeaderResponse> {
  const data = await client.request<AddactHeaderResponse>(GET_ADDACT_HEADER);
  return data;
}

