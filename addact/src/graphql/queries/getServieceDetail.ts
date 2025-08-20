import { gql } from "graphql-request";
import client from "../client";
import { Heading, Image, Link } from "./getHomePage";

const ServiceDetailBySlug = gql`
    query SubServicePages($filters: SubServicePageFiltersInput) {
        subServicePages(filters: $filters) {
            ReferenceTitle
            HeroBanner {
                BannerTitle
                BannerDescription
                BannerImage {
                    alternativeText
                    height
                    name
                    url
                    width
                }
                BannerLink {
                    id
                    href
                    label
                    isExternal
                }
            }
            our_service {
                Titeldescription {
                    Description
                    Title
                }
                FirstTabDisplayName
                SecondTabDisplayName
                ForEnterprisesBrands {
                    GlobalCard {
                        ... on ComponentBaseTemplatePromo {
                            Description
                            Title
                            id
                        }
                    }
                    Title {
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
                    }
                }
                ReferenceTitle
                team_feature {
                    Cards {
                        Description
                        Title
                        id
                        Link {
                            id
                            href
                            label
                            target
                            isExternal
                        }
                    }
                    Description
                }
            }
            our_process {
                Title {
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
                }
                ProcessData {
                    ... on ComponentBaseTemplateTitleWithDescription {
                        id
                        Title
                        Description
                    }
                }
            }
            why_addact {
                Title {
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
                    ... on Error {
                        code
                        message
                    }
                }
                GlobalCard {
                    ... on ComponentBaseTemplatePromo {
                        Description
                        Image {
                            alternativeText
                            height
                            name
                            url
                            width
                        }
                        Title
                    }
                }
            }
            cta2 {
                CtaDescription
                CtaImage {
                    alternativeText
                    height
                    name
                    url
                    width
                }
                CtaLink {
                    id
                    href
                    label
                    isExternal
                }
                CtaTitle
            }
            cta {
                CtaDescription
                CtaImage {
                    alternativeText
                    height
                    name
                    url
                    width
                }
                CtaLink {
                    id
                    href
                    label
                    isExternal
                }
                CtaTitle
            }
            faq {
                Title
                FAQ {
                    Title
                    Description
                }
            }
            contact_us {
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
                RecipientEmails
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

export interface ServiceDetailResponse {
    subServicePages: SubServicePage[];
}

export interface SubServicePage {
    ReferenceTitle: string;
    SEO?: {
        metaTitle?: string;
        metaDescription?: string;
        ogTitle?: string;
        ogDescription?: string;
        ogImage?: {
            url?: string;
        };
        metaRobots?: string;
        twitterCardTitle?: string;
        canonicalURL?: string;
        structuredData?: Record<string, unknown>;
        languageTag?: string;
    } | null;
    HeroBanner: {
        BannerTitle: string;
        BannerDescription: string;
        BannerImage: Image;
        BannerLink: Link;
    };
    our_process: OurProcessData;
    our_service: OurServiceData;
    why_addact: WhyAddact;
    cta2: CTA2;
    cta: null;
    faq: {
        Title: string;
        FAQ: {
            id?: string;
            Title: string;
            Description: string;
        }[];
    };
    contact_us: CONTACTUS;
}

export interface OurProcessData {
    Title: Heading[];
    ProcessData: {
        id: string;
        Title: string;
        Description: string;
    }[];
}
export interface CONTACTUS {
    pageReference: string;
    RecipientEmails: string;
    Form: {
        id: string;
        Title: string;
        Description: string;
        Image: Image;
        Link: Link;
    }[];
}
export interface CTA2 {
    CtaDescription: string;
    CtaImage: Image;
    CtaLink: Link;
    CtaTitle: string;
}

export interface WhyAddact {
    Title: Heading[];

    GlobalCard: {
        id?: string;
        Title: string;
        Description: string;
        Image: Image;
        Link?: Link | null;
    }[];

    pageReference?: string;
}

export interface OurServiceData {
    Titeldescription?: {
        Description: string;
        Title: string;
    }[];

    FirstTabDisplayName: string;
    SecondTabDisplayName: string;

    ForEnterprisesBrands: {
        GlobalCard: {
            id: string;
            Title: string;
            Description: string;
            Image?: Image;
            Link?: Link;
            sub_service_page?: {
                Slug: string;
            };
        }[];

        Title: {
            id?: string;
            h2: string;
        }[];
    };

    ReferenceTitle: string;

    team_feature: {
        documentId?: string;
        ReferenceTitle?: string;
        Description: string;
        Cards: {
            id: string;
            Title: string;
            Description: string;
            Link?: Link;
        }[];
        createdAt?: string;
        updatedAt?: string;
        publishedAt?: string;
    };
}

// Fetch function
export async function getServiceDetailBySlug(slug: string): Promise<SubServicePage> {
    const data = await client.request<ServiceDetailResponse>(ServiceDetailBySlug, {
        filters: {
            Slug: {
                eq: `/${slug}`,
            },
        },
    });

    return data.subServicePages?.[0];
}
