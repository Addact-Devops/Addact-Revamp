import { gql } from "graphql-request";
import client from "../client";
import { INDUSTRIES_WE_SERVE_TITLE_FIELDS } from "../fragments/industriesTitleFragment";
import { INDUSTRIES_WE_SERVE_LIST_FIELDS } from "../fragments/industriesListFragment";

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
export type IndustryIcon = {
  alternativeText?: string | null;
  height: number;
  name: string;
  url: string;
  width: number;
};

export type IndustryLink = {
  id: string;
  href: string;
  label: string;
  target: string;
  isExternal: boolean;
};

export type Industry = {
  Icons: IndustryIcon | null;
  LinkIcons: IndustryLink[];
  Title: string;
};

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
