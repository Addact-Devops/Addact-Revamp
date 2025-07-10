// graphql/queries/getAboutUsCTA.ts

import client from "../client";
import { gql } from "graphql-request";

export type CTAImageType = {
    url: string;
    alternativeText: string | null;
    width: number | null;
    height: number | null;
};

export type CTALinkType = {
    label: string;
    href: string;
    target: string | null;
    isExternal: boolean;
};

export type CtaTitle = { h1?: string } | { h2?: string } | { h3?: string };

export type DescriptionNode = {
    type: string;
    children: { text: string }[];
};

export type CTAType = {
    Title: CtaTitle[];
    CTADescription: DescriptionNode[]; // ✅ no more `any`
    CTAImage: { Image: CTAImageType }[];
    CTALink: CTALinkType[];
};

type AboutUsCTAResponse = {
    aboutUs: {
        aboutUsCTA: CTAType;
    };
};

const query = gql`
    query GetAboutUsCTA {
        aboutUs {
            aboutUsCTA {
                Title {
                    ... on ComponentHeadingsH1 {
                        h1
                    }
                    ... on ComponentHeadingsH2 {
                        h2
                    }
                    ... on ComponentHeadingsH3 {
                        h3
                    }
                }
                CTADescription
                CTAImage {
                    ... on ComponentSharedImage {
                        Image {
                            url
                            alternativeText
                            width
                            height
                        }
                    }
                }
                CTALink {
                    ... on ComponentSharedLink {
                        label
                        href
                        target
                        isExternal
                    }
                }
            }
        }
    }
`;

export const getAboutUsCTA = async (): Promise<CTAType | null> => {
    const res = await client.request<AboutUsCTAResponse>(query);
    return res?.aboutUs?.aboutUsCTA || null;
};
