import { gql } from "graphql-request";
import client from "../client";
import { INDUSTRIES_WE_SERVE_TITLE_FIELDS } from "../fragments/industriesTitleFragment";
import { INDUSTRIES_WE_SERVE_LIST_FIELDS, type Industry } from "../fragments/industriesListFragment";
export type { Industry } from "../fragments/industriesListFragment";

const industries_Query = gql`
  query industriesWeServes {
    industriesWeServes {
      ${INDUSTRIES_WE_SERVE_TITLE_FIELDS}
      ${INDUSTRIES_WE_SERVE_LIST_FIELDS}
    }
  }
`;
export async function getIndustriesWeServe(): Promise<IndustriesResponse> {
  const data = await client.request<IndustriesResponse>(industries_Query);
  return data;
}
// IndustryIcon, IndustryLink, Industry types moved to industriesListFragment.ts


export type IndustriesWeServeEntry = {
  TitleDescription: {
    Title: string;
    Description: string;
  };
  Industries: Industry[];
};

export type IndustriesResponse = {
  industriesWeServes: IndustriesWeServeEntry[];
};
