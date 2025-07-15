// src/graphql/queries/getAboutUs.ts

import { gql } from "graphql-request";
import client from "../client";

// -----------------------------
// ✅ About Us Hero Banner
// -----------------------------

export type AboutUsBannerType = {
    BannerTitle?: string;
    BannerDescription?: string;
    BannerImage?: {
        url?: string;
        height?: number;
        width?: number;
    } | null;
};

export type AboutUsHeroBannerResponse = {
    aboutUs?: {
        HeroBanner?: {
            Banner?: AboutUsBannerType[];
        };
    };
};

const bannerQuery = gql`
    query AboutUs {
        aboutUs {
            HeroBanner {
                Banner {
                    ... on ComponentBannerBanner {
                        BannerTitle
                        BannerDescription
                        BannerImage {
                            url
                            height
                            width
                        }
                    }
                }
            }
        }
    }
`;

export const getAboutUsHeroBanner = async (): Promise<AboutUsBannerType | null> => {
    try {
        const res = await client.request<AboutUsHeroBannerResponse>(bannerQuery);
        return res?.aboutUs?.HeroBanner?.Banner?.[0] || null;
    } catch (error) {
        console.error("Error fetching About Us banner:", error);
        return null;
    }
};

// -----------------------------
// ✅ Quote
// -----------------------------

export type QuoteData = {
    aboutUs: {
        Quote: {
            AuthorName: string;
            AuthorMessage: string;
            AuthorImage: {
                url: string;
                alternativeText: string | null;
            };
        };
    };
};

const quoteQuery = gql`
    query AboutUs {
        aboutUs {
            Quote {
                AuthorImage {
                    alternativeText
                    url
                }
                AuthorMessage
                AuthorName
            }
        }
    }
`;

export const getAboutUsQuote = async (): Promise<QuoteData> => {
    const data = await client.request(quoteQuery);
    return data as QuoteData;
};

// -----------------------------
// ✅ About Us Content
// -----------------------------

type ParagraphBlock = {
    type: "paragraph";
    children: {
        type: string;
        text: string;
    }[];
};

export type AboutUsContentData = {
    aboutUs: {
        AboutUsContent: {
            SubTitle: string;
            Title: string;
            Content: ParagraphBlock[];
            Image: {
                url: string;
                alternativeText?: string | null;
            };
        };
    };
};

const aboutContentQuery = gql`
    query AboutUs {
        aboutUs {
            AboutUsContent {
                SubTitle
                Title
                Content
                Image {
                    url
                    alternativeText
                }
            }
        }
    }
`;

export const getAboutUsContent = async (): Promise<AboutUsContentData> => {
    const data = await client.request(aboutContentQuery);
    return data as AboutUsContentData;
};

// -----------------------------
// ✅ Our Vision & Mission
// -----------------------------

export type VisionMissionItem = {
    SubTitle: string;
    Title: string;
    Description: ParagraphBlock[];
    Image: {
        url: string;
        alternativeText?: string | null;
    };
};

export type OurVisionMissionData = {
    aboutUs: {
        OurVisionMission: VisionMissionItem[];
    };
};

const visionQuery = gql`
    query AboutUs {
        aboutUs {
            OurVisionMission {
                SubTitle
                Title
                Description
                Image {
                    alternativeText
                    url
                }
            }
        }
    }
`;

export const getOurVisionMission = async (): Promise<OurVisionMissionData> => {
    const data = await client.request(visionQuery);
    return data as OurVisionMissionData;
};

// -----------------------------
// ✅ CTA Section
// -----------------------------

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
    CTADescription: DescriptionNode[];
    CTAImage: { Image: CTAImageType }[];
    CTALink: CTALinkType[];
};

type AboutUsCTAResponse = {
    aboutUs: {
        aboutUsCTA: CTAType;
    };
};

const ctaQuery = gql`
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
    const res = await client.request<AboutUsCTAResponse>(ctaQuery);
    return res?.aboutUs?.aboutUsCTA || null;
};

// -----------------------------
// ✅ Brand Value
// -----------------------------

export type BrandValueType = {
    Title: string;
    SubTitle: string;
    Content: {
        type: string;
        children: { text: string }[];
    }[];
    Image: {
        url: string;
        alternativeText: string | null;
        width: number | null;
        height: number | null;
    };
};

type BrandValueQueryResponse = {
    aboutUs: {
        BrandValue: BrandValueType;
    };
};

const brandValueQuery = gql`
    query AboutUs {
        aboutUs {
            BrandValue {
                Title
                SubTitle
                Content
                Image {
                    url
                    alternativeText
                    width
                    height
                }
            }
        }
    }
`;

export const getBrandValue = async (): Promise<BrandValueType> => {
    const res = await client.request<BrandValueQueryResponse>(brandValueQuery);
    return res.aboutUs.BrandValue;
};

// -----------------------------
// ✅ We Are Addact
// -----------------------------

type ContentChild = {
    text: string;
};

type ContentBlock = {
    type: string;
    children: ContentChild[];
};

export type WeAreAddactType = {
    Image: {
        url: string;
        alternativeText: string | null;
        height: number;
        width: number;
    };
    SubTitle: string;
    Title: string;
    Content: ContentBlock[];
    NumberContent: {
        Number: string;
        Content: string;
    }[];
};

const addactQuery = gql`
    query AboutUs {
        aboutUs {
            WeAreAddact {
                Image {
                    url
                    alternativeText
                    height
                    width
                }
                SubTitle
                Title
                Content
                NumberContent {
                    Number
                    Content
                }
            }
        }
    }
`;

export const getWeAreAddact = async (): Promise<WeAreAddactType> => {
    const res = await client.request<{ aboutUs: { WeAreAddact: WeAreAddactType } }>(addactQuery);
    return res.aboutUs.WeAreAddact;
};
