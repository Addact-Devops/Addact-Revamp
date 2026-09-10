import client from "../client";
import { gql } from "graphql-request";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { CTA_FIELDS, type CtaBannerResponse } from "../fragments/ctaFragment";

export type { CTAImage, CtaTitle, CtaLink, CtaBannerResponse } from "../fragments/ctaFragment";

export const getOurPartners = async (): Promise<CtaBannerResponse> => {
    const query = gql`
  ${LINK_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${HEADING_FRAGMENT}
        query Home {
            home {
                cta { ${CTA_FIELDS} }
            }
        }
    `;

    const data = await client.request(query);
    return data as CtaBannerResponse;
};
