import { gql } from "graphql-request";
import client from "../client";

const GET_HOME_PAGE = gql`
    query Home {
        home {
            documentId
            PageHeading {
                ... on ComponentBaseTemplateBaseHeading {
                    PageTitle
                    Slug
                }
            }
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
                            height
                            name
                            url
                            width
                        }
                        id
                    }
                }
                CTALink {
                    ... on ComponentSharedLink {
                        id
                        href
                        label
                        target
                        isExternal
                    }
                }
                pageReference
            }
            banner {
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
                            href
                            id
                            isExternal
                            label
                            target
                        }
                        BannerTitle
                    }
                }
            }
            ourservices {
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
                        Link {
                            href
                            isExternal
                            label
                            id
                            target
                        }
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
                }
                documentId
                pageReference
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
            whyaddact {
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
                pageReference
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
            }
        }
    }
`;

// Reusable types
export interface Image {
    alternativeText: string;
    height: number;
    name: string;
    url: string;
    width: number;
}

export interface Link {
    id: string;
    href: string;
    label: string;
    target: string;
    isExternal: boolean;
}

export interface Heading {
    id: string;
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
}

export interface CTA {
    Title: Heading[];
    CTAImage: {
        Image: Image;
        id: string;
    }[];
    CTALink: Link[];
    pageReference: string;
}

export interface BANNER {
    Banner: {
        BannerTitle: string;
        BannerDescription: string;
        BannerImage: Image;
        BannerLink: Link;
    }[];
}

export interface OURSERVICES {
    Title: Heading[];
    GlobalCard: {
        id: string;
        Title: string;
        Description: string;
        Image: Image;
        Link: Link;
    }[];
    documentId: string;
    pageReference: string;
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

export interface Whyaddact {
    Title: Heading[];
    pageReference: string;
    GlobalCard: GlobalCard2[];
}

export interface GlobalCard2 {
    id: string;
    Title: string;
    Description: string;
    Image: Image;
    Link: Link;
}

// Main interface
export interface HomeItems {
    documentId: string;
    pageHeading: {
        PageTitle: string;
        Slug: string;
    }[];
    cta: CTA;
    banner: BANNER;
    ourservices: OURSERVICES;
    contactus: CONTACTUS;
    whyaddact: Whyaddact;
}

export interface HomeResponse {
    home: HomeItems;
}

export interface HomeProps {
    data: HomeResponse;
}

export async function getHOmePageData(): Promise<HomeResponse> {
    const data = await client.request<HomeResponse>(GET_HOME_PAGE);
    return data;
}
