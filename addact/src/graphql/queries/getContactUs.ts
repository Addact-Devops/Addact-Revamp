import { gql } from "graphql-request";
import client from "../client"; // Adjust path if needed

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
        };
        SEO?: {
            metaTitle?: string;
            metaDescription?: string;
            ogTitle?: string;
            ogDescription?: string;
            ogImage?: { url?: string };
            metaRobots?: string;
            twitterCardTitle?: string;
            canonicalURL?: string;
            structuredData?: any;
            languageTag?: string;
        } | null;
    };
}

export async function getContactUsData(): Promise<ContactUsResponse> {
    const data = await client.request<ContactUsResponse>(GET_CONTACT_US);
    return data;
}
