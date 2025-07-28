import { gql } from "graphql-request";
import client from "../client";
import { Heading, Image } from "@/types/common";

const GET_BRAND_GUIDELINES = gql`
    query BrandGuideline {
        brandGuideline {
            ReferenceTitle
            Slug
            HeroBanner {
                Banner {
                    ... on ComponentBannerBanner {
                        BannerTitle
                        BannerDescription
                        BannerImage {
                            alternativeText
                            height
                            name
                            url
                            width
                        }
                    }
                }
            }
            Content {
                ... on ComponentHeadingsH1 {
                    id
                    h1
                }
                ... on ComponentHeadingsH2 {
                    id
                    h2
                }
                ... on ComponentHeadingsH3 {
                    id
                    h3
                }
                ... on ComponentHeadingsH4 {
                    id
                    h5
                }
                ... on ComponentHeadingsH5 {
                    id
                    h5
                }
                ... on ComponentHeadingsH6 {
                    id
                    h6
                }
                ... on ComponentBaseTemplateRichtext {
                    id
                    Richtext
                }
                ... on ComponentSharedImage {
                    id
                    Image {
                        alternativeText
                        height
                        name
                        url
                        width
                    }
                }
                ... on ComponentSharedLink {
                    id
                    href
                    label
                    target
                    isExternal
                }
            }
            FromTitle
            FormFileds {
                NameLable
                EmailLabel
                PhoneLabel
                RecipientEmails
                ButtonLabel
            }
            GuidelinePDF {
                alternativeText
                url
            }
        }
    }
`;

export interface BrandGuidelinesResponse {
    brandGuideline: {
        ReferenceTitle: string;
        Slug: string;
        HeroBanner: {
            Banner: {
                BannerTitle: string;
                BannerDescription: string;
                BannerImage: Image;
            }[];
        };
        Content: Heading[];
        FromTitle: string;
        FormFileds: {
            NameLable: string;
            EmailLabel: string;
            PhoneLabel: string;
            RecipientEmails: string;
            ButtonLabel: string;
        };
        GuidelinePDF: {
            alternativeText: string;
            url: string;
        };
    };
}

export async function getBrandGuidelines(): Promise<BrandGuidelinesResponse> {
    const data = await client.request<BrandGuidelinesResponse>(GET_BRAND_GUIDELINES);
    return data;
}
