import { gql } from "graphql-request";
import client from "../client";
import { Heading, Image, Link } from "./getHomePage";

const ServiceListBySlug = gql`
    query ServiceLists($filters: ServiceListFiltersInput) {
        serviceLists(filters: $filters) {
            ReferenceTitle
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
            Banner {
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
                        BannerLink {
                            id
                            href
                            label
                            target
                            isExternal
                        }
                        BannerTitle
                    }
                }
            }
            cta {
                CTADescription
                pageReference
                CTAImage {
                    ... on ComponentSharedImage {
                        Image {
                            alternativeText
                            height
                            name
                            url
                            width
                        }
                    }
                }
                CTALink {
                    ... on ComponentSharedLink {
                        href
                        id
                        isExternal
                        label
                        target
                    }
                }
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
            }
            cta2 {
                CTADescription
                pageReference
                CTAImage {
                    ... on ComponentSharedImage {
                        Image {
                            alternativeText
                            height
                            name
                            url
                            width
                        }
                    }
                }
                CTALink {
                    ... on ComponentSharedLink {
                        href
                        id
                        isExternal
                        label
                        target
                    }
                }
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
                }
                GlobalCard {
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
            faq {
                Title
                FAQ {
                    Description
                    Title
                    id
                }
            }
            our_service {
                FirstTabDisplayName
                SecondTabDisplayName
                ForEnterprisesBrands {
                    GlobalCard {
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
                            sub_service_page {
                                Slug
                            }
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
                    }
                }
                team_feature {
                    Description
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
        }
    }
`;

export interface ServiceListResponse {
    serviceLists: ServiceList[];
}

export interface ServiceList {
    ReferenceTitle: string;
    Banner: {
        Banner: {
            BannerDescription: string;
            BannerTitle: string;
            BannerImage: {
                alternativeText: string | null;
                height: number;
                name: string;
                url: string;
                width: number;
            };
            BannerLink: {
                id: string;
                href: string;
                label: string;
                target: string;
                isExternal: boolean;
            };
        }[];
    };
    cta: {
        CTADescription?: string | null;
        CTAImage: {
            Image: {
                alternativeText: string | null;
                height: number;
                name: string;
                url: string;
                width: number;
            };
        }[];
        CTALink: {
            href: string;
            id: string;
            isExternal: boolean;
            label: string;
            target: string;
        }[];
        Title: Heading[];
    };
    cta2: CTA2;
    why_addact: WhyAddact;
    faq: {
        Title: string;
        FAQ: {
            id?: string;
            Title: string;
            Description: string;
        }[];
    };
    our_service: OurServiceData;
    contact_us: CONTACTUS;
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
            Image?: {
                alternativeText: string | null;
                height: number;
                name: string;
                url: string;
                width: number;
            };
            Link?: {
                id: string;
                href: string;
                label: string;
                target: string;
                isExternal: boolean;
            };
            sub_service_page?: {
                Slug: string;
            };
        }[];

        Title: {
            id?: string; // optional to support both with and without id
            h2: string;
        }[];
    };

    ReferenceTitle: string;

    team_feature: {
        documentId?: string;
        ReferenceTitle?: string; // optional, not in first version
        Description: string;
        Cards: {
            id: string;
            Title: string;
            Description: string;
            Link?: {
                id: string;
                href: string;
                label: string;
                target: string;
                isExternal: boolean;
            };
        }[];
        createdAt?: string;
        updatedAt?: string;
        publishedAt?: string;
    };
}

export interface WhyAddact {
    Title: {
        id?: string;
        h1?: string;
        h2?: string;
        h3?: string;
        h4?: string;
        h5?: string;
        h6?: string;
    }[];

    GlobalCard: {
        id?: string;
        Title: string;
        Description: string;
        Image: {
            alternativeText: string | null;
            height: number;
            name: string;
            url: string;
            width: number;
        };
        Link?: {
            id: string;
            href: string;
            label: string;
            target: string;
            isExternal: boolean;
        } | null;
    }[];

    pageReference?: string;
}

export interface CTA2 {
    CTADescription: {
        type: string;
        children: {
            text: string;
            type: string;
        }[];
    }[];
    CTAImage: {
        Image: {
            alternativeText: string | null;
            height: number;
            name: string;
            url: string;
            width: number;
        };
    }[];
    CTALink: {
        href: string;
        id: string;
        isExternal: boolean;
        label: string;
        target: string;
    }[];
    Title: {
        id: string;
        h2: string;
    }[];
}

// Fetch function
export async function getServiceListBySlug(slug: string): Promise<ServiceList> {
    const data = await client.request<ServiceListResponse>(ServiceListBySlug, {
        filters: {
            Slug: {
                eq: `/${slug}`,
            },
        },
    });

    return data.serviceLists?.[0];
}
