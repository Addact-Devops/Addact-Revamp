import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { LINK_IMAGE_FRAGMENT, type LinkImageItem } from "../fragments/linkImageFragment";
import client from "../client";

const GET_CMS_EXPERTISE = gql`
  ${LINK_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  ${LINK_IMAGE_FRAGMENT}
  query ourExpertises {
    ourExpertises {
      CMS {
        ... on ComponentBaseTemplateLinkImage { ...LinkImageFields }
      }
      ExpertiseTitle {
        ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
      }
    }
  }
`;

export interface OurExpertise {
  CMS: LinkImageItem[];
  ExpertiseTitle: {
    Description: string;
    Title: string;
  }[];
}

export interface CMSResponse {
  ourExpertises: OurExpertise[];
}

export interface HomeProps {
  data: CMSResponse;
}

export async function getCMSExpertiseData(): Promise<CMSResponse> {
  const data = await client.request<CMSResponse>(GET_CMS_EXPERTISE);
  return data;
}
