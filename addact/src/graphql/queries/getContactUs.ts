import { gql } from "graphql-request";
import client from "../client"; // Adjust path if needed
import { Image, Link } from "@/types/common";

export const GET_CONTACT_US = gql`
    query Contactus {
        contactus {
            PageHeading {
                PageTitle
                Slug
            }
            banner {
                Banner {
                    ... on ComponentBannerBanner {
                        BannerImage {
                            url
                            alternativeText
                            width
                            height
                        }
                        BannerTitle
                        BannerDescription
                        BannerLink {
                            href
                            label
                        }
                    }
                }
            }
            AddactTeamImage {
                url
                alternativeText
                width
                height
            }
            TitleLine1
            TitleLine2
            Descriptions
            ContactUsAvailability {
                Days
                Availability
            }
            AddressContent {
                OfficeCountry
                OfficeCity
                Address
                ContactUsEmailPhone {
                    Label
                    Link
                }
                MapIframe
            }
            ContactUsFormBlock {
                LeftTitle
                LeftDescription
                LeftBackgroundImage {
                    url
                    alternativeText
                    width
                    height
                }
                RightTitle
                RightDescription
                RecipientEmails
            }
            contactus {
                Form {
                    ... on ComponentBaseTemplatePromo {
                        id
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
                            id
                            href
                            label
                            target
                            isExternal
                        }
                    }
                }
                pageReference
            }
            SEO {
                metaTitle
                metaDescription
                ogTitle
                ogDescription
                ogImage {
                    url
                }
                metaRobots
                twitterCardTitle
                canonicalURL
                structuredData
                languageTag
            }
        }
    }
`;

export interface ImageType {
    url: string;
    alternativeText: string;
    width: number;
    height: number;
}

export interface RichTextBlock {
    type: string;
    children: {
        text: string;
        type?: string;
    }[];
}

export interface ContactUsResponse {
    contactus: {
        PageHeading: {
            PageTitle: string;
            Slug: string;
        };
        banner: {
            Banner: {
                BannerImage: ImageType;
                BannerTitle: string;
                BannerDescription: string;
                BannerLink: {
                    href: string;
                    label: string;
                };
            }[];
        };
        AddactTeamImage: ImageType;
        TitleLine1: string;
        TitleLine2: string;
        Descriptions: RichTextBlock[];
        ContactUsAvailability: {
            Days: string;
            Availability: string;
        }[];
        AddressContent: {
            OfficeCountry: string;
            OfficeCity: string;
            Address: string;
            ContactUsEmailPhone: {
                Label: string;
                Link: string;
            }[];
            MapIframe: RichTextBlock[];
        };
        ContactUsFormBlock: {
            LeftTitle: string;
            LeftDescription: string;
            LeftBackgroundImage: ImageType;
            RightTitle: string;
            RightDescription: string;
            RecipientEmails: string;
        };
        contactus: CONTACTUS;
        SEO?: {
            metaTitle?: string;
            metaDescription?: string;
            ogTitle?: string;
            ogDescription?: string;
            ogImage?: { url?: string };
            metaRobots?: string;
            twitterCardTitle?: string;
            canonicalURL?: string;
            structuredData?: Record<string, unknown>;
            languageTag?: string;
        } | null;
    };
}

export interface CONTACTUS {
    pageReference: string;
    Form: {
        id: string;
        Title: string;
        Description: string;
        Image: Image;
        Link: Link;
    }[];
}

export async function getContactUsData(): Promise<ContactUsResponse> {
    const data = await client.request<ContactUsResponse>(GET_CONTACT_US);
    return data;
}
