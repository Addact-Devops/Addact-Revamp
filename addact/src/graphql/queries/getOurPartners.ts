// graphql/queries/getOurPartners.ts
import client from "../client";
import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { OUR_PARTNER_HOME_FIELDS } from "../fragments/ourPartnerHomeFragment";

export type PartnerImage = {
  Image: {
    url: string;
    alternativeText: string | null;
  };
};

export type PartnerTitle =
  | { h1: string }
  | { h2: string }
  | { h3: string }
  | { h5: string }
  | { h6: string };

export type OurPartnerResponse = {
  home: {
    ourpartner: {
      Title: PartnerTitle[];
      Image: PartnerImage[];
    };
  };
};

export const getOurPartners = async (): Promise<OurPartnerResponse> => {
  const query = gql`
  ${IMAGE_FRAGMENT}
  ${SHARED_IMAGE_FRAGMENT}
    query Home {
      home {
        ${OUR_PARTNER_HOME_FIELDS}
      }
    }
  `;

  const data = await client.request(query);
  return data as OurPartnerResponse;
};
