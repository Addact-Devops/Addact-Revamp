import client from "../client";
import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { WHO_ARE_WE_FIELDS } from "../fragments/whoAreWeFragment";

export type WhoAreWeResponse = {
  whoAreWes: {
    Counter: {
      CounterTitle: string;
      NumberCount: number;
      id: string;
    }[];
    Title: {
      Description: string;
      Title: string;
    }[];
    pageReference: string;
  }[];
};

export const getWhoAreWe = async (): Promise<WhoAreWeResponse> => {
  const query = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
    query whoAreWe {
      ${WHO_ARE_WE_FIELDS}
    }
  `;

  const data = await client.request(query);
  return data as WhoAreWeResponse;
};
