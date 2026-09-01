import client from "../client";
import { gql } from "graphql-request";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { CTA_FIELDS } from "../fragments/ctaFragment";

export type CTAImage = {
    Image: {
        alternativeText: string | null;
        caption: string | null;
        width: number | null;
        height: number | null;
        url: string;
    };
};

export type CtaTitle = { h1: string } | { h2: string } | { h3: string } | { h5: string } | { h6: string };

export type CtaLink = {
    id: string;
    href: string;
    label: string;
    target: string | null;
    isExternal: boolean;
};

export type CtaBannerResponse = {
    home: {
        cta: {
            Title: CtaTitle[];
            CTAImage: CTAImage;
            CTALink: CtaLink;
        };
    };
};

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
