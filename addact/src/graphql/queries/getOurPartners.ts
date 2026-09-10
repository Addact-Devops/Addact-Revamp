// graphql/queries/getOurPartners.ts
import client from "../client";
import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { OUR_PARTNER_HOME_FIELDS, type OurPartnerResponse } from "../fragments/ourPartnerHomeFragment";

export type { PartnerImage, PartnerTitle, OurPartnerResponse } from "../fragments/ourPartnerHomeFragment";

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
