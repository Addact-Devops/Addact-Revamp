import client from "../client";
import { gql } from "graphql-request";

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
        query Home {
            home {
                cta {
                    Title {
                        ... on ComponentHeadingsH6 {
                            id
                            h6
                        }
                        ... on ComponentHeadingsH5 {
                            id
                            h5
                        }
                        ... on ComponentHeadingsH4 {
                            id
                            h5
                        }
                        ... on ComponentHeadingsH3 {
                            id
                            h3
                        }
                        ... on ComponentHeadingsH2 {
                            id
                            h2
                        }
                        ... on ComponentHeadingsH1 {
                            id
                            h1
                        }
                    }
                    CTAImage {
                        ... on ComponentSharedImage {
                            Image {
                                alternativeText
                                caption
                                width
                                height
                                url
                            }
                        }
                    }
                    CTALink {
                        ... on ComponentSharedLink {
                            href
                            label
                            target
                            isExternal
                        }
                    }
                }
            }
        }
    `;

    const data = await client.request(query);
    return data as CtaBannerResponse;
};
