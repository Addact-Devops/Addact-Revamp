import { gql } from "graphql-request";
import client from "../client";
import { Image, Link } from "@/types/common";

const GET_CAREER_DETAIL = gql`
    query careerDetailBySlug($filters: CareerDetailFiltersInput) {
        careerDetails(filters: $filters) {
            Banner {
                ... on ComponentBannerBanner {
                    BannerDescription
                    BannerImage {
                        alternativeText
                        height
                        name
                        url
                        width
                    }
                    BannerTitle
                    show_searchbox
                    BannerLink {
                        id
                        href
                        label
                        target
                        isExternal
                    }
                }
            }
            JobDescription {
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
                ... on ComponentBaseTemplateRichtext {
                    id
                    Richtext
                }
                ... on ComponentSharedLink {
                    id
                    href
                    label
                    target
                    isExternal
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
            }
            PageHeading {
                PageTitle
                Slug
            }

            Slug
            ReferenceTitle
            careers_form {
                LeftInsights {
                    Title
                    Description
                    Image {
                        alternativeText
                        height
                        name
                        url
                        width
                    }
                }
                FormFields {
                    Form {
                        ... on ComponentBaseTemplatePromo {
                            Title
                            Description
                            Image {
                                alternativeText
                                height
                                name
                                url
                                width
                            }
                            Link {
                                label
                            }
                        }
                    }
                    NameLable
                    EmailLabel
                    PhoneLabel
                    GeneralText
                    RecipientEmails
                    ButtonLabel
                }
            }
        }
    }
`;

export interface CareerDetailResponse {
    careerDetails: {
        Banner: {
            BannerDescription: string;
            BannerImage: Image;
            BannerTitle: string;
            show_searchbox: boolean;
            BannerLink: Link;
        }[];
        JobDescription: {
            id: string;
            Richtext?: string;
            h2?: string;
        }[];
        PageHeading: {
            PageTitle: string;
            Slug: string;
        }[];
        Slug: string;
        ReferenceTitle: string;
        careers_form: {
            LeftInsights: {
                Title: string;
                Description: string;
                Image: Image;
            };
            FormFields: {
                Form: {
                    Title: string;
                    Description: string;
                    Image?: Image;
                    Link?: Link;
                }[];
                NameLable: string;
                EmailLabel: string;
                PhoneLabel: string;
                GeneralText: string;
                RecipientEmails: string;
                ButtonLabel: string;
            };
        };
    }[];
}

export async function getCareerDetailsData(slug: string) {
    const data = await client.request<CareerDetailResponse>(GET_CAREER_DETAIL, {
        filters: {
            Slug: {
                eq: `/${slug}`,
            },
        },
    });

    return data;
}
