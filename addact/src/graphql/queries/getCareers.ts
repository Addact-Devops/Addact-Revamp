import { gql, GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT;

if (!endpoint) {
    throw new Error("Missing NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT in environment variables.");
}

const client = new GraphQLClient(endpoint);

const query = gql`
    query CareersData {
        careers {
            PageHeading {
                PageTitle
                Slug
            }
            Banner {
                Banner {
                    ... on ComponentBannerBanner {
                        BannerTitle
                        BannerDescription
                        show_searchbox
                        BannerImage {
                            url
                            name
                            width
                            height
                            alternativeText
                        }
                    }
                }
            }
            Careercard {
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
                        id
                        Title
                        Description
                        Image {
                            url
                            width
                            height
                            name
                            alternativeText
                        }
                        Link {
                            id
                            href
                            label
                            target
                            isExternal
                        }
                    }
                    ... on Error {
                        code
                        message
                    }
                }
            }
            positions {
                EventTitle
                CardInfo {
                    ... on ComponentReuseCard {
                        AerrowIcon {
                            url
                            name
                            width
                            height
                            alternativeText
                        }
                        HoverIcon {
                            url
                            name
                            width
                            height
                            alternativeText
                        }
                        Icon {
                            url
                            name
                            width
                            height
                            alternativeText
                        }
                        LogoLink {
                            id
                            href
                            label
                            target
                            isExternal
                        }
                        LogoTitle
                        TitleIcon {
                            Icon {
                                url
                                name
                                width
                                height
                                alternativeText
                            }
                        }
                    }
                }
            }
        }
    }
`;

// Match inline component types exactly
type HeadingBlock =
    | { id: string; h1?: string }
    | { id: string; h2?: string }
    | { id: string; h3?: string }
    | { id: string; h4?: string }
    | { id: string; h5?: string }
    | { id: string; h6?: string }
    | { id: string; Richtext?: string };

type GlobalCardItem = {
    id: string;
    Title?: string | null;
    Description?: string | null;
    Image?: {
        url: string;
        width?: number;
        height?: number;
        name?: string;
        alternativeText?: string | null;
    } | null;
    Link?: {
        href: string;
    } | null;
};

type PositionType = {
    EventTitle: string;
    CardInfo: {
        AerrowIcon?: {
            url: string;
            name?: string;
            width?: number;
            height?: number;
            alternativeText?: string;
        };
        HoverIcon?: {
            url: string;
            name?: string;
            width?: number;
            height?: number;
            alternativeText?: string;
        };
        Icon?: {
            url: string;
            name?: string;
            width?: number;
            height?: number;
            alternativeText?: string;
        };
        LogoLink?: {
            id: string;
            href: string;
            label: string;
            target: string;
            isExternal: boolean;
        };
        LogoTitle?: string;
        TitleIcon?: {
            Icon: {
                url: string;
                name?: string;
                width?: number;
                height?: number;
                alternativeText?: string;
            };
        }[];
    }[];
};

type CareersDataResponse = {
    careers: {
        PageHeading?: {
            PageTitle?: string;
            Slug?: string;
        };
        Banner?: {
            Banner?: {
                BannerTitle?: string;
                BannerDescription?: string;
                show_searchbox?: boolean;
                BannerImage: {
                    url: string;
                    name?: string;
                    width?: number;
                    height?: number;
                    alternativeText?: string;
                };
            }[];
        };
        Careercard?: {
            Title: HeadingBlock[];
            GlobalCard: GlobalCardItem[];
        };
        positions?: PositionType[];
    };
};

export const getCareersData = async (): Promise<CareersDataResponse["careers"]> => {
    const res = await client.request<CareersDataResponse>(query);
    return res.careers;
};
