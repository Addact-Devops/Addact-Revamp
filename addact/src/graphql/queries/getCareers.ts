// src/graphql/queries/getCareers.ts

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
            PositionsTitle {
                Title
                Description
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
                            Title
                        }
                    }
                }
            }
        }
    }
`;

export type ImageType = {
    url: string;
    name?: string;
    width?: number;
    height?: number;
    alternativeText?: string;
};

export type TitleBlock =
    | { id: string; h1: string }
    | { id: string; h2: string }
    | { id: string; h3: string }
    | { id: string; h4?: string; h5?: string; h6?: string }
    | { id: string; Richtext: string };

export type CardPromo = {
    id: string;
    Title?: string;
    Description?: string;
    Image?: ImageType;
    Link?: {
        id: string;
        href: string;
        label: string;
        target: string;
        isExternal: boolean;
    };
};

export type CardInfoType = {
    AerrowIcon?: ImageType;
    HoverIcon?: ImageType;
    Icon?: ImageType;
    LogoLink?: {
        id: string;
        href: string;
        label: string;
        target: string;
        isExternal: boolean;
    };
    LogoTitle?: string;
    TitleIcon?: {
        Title?: string;
        Icon: ImageType;
    }[];
};

export type PositionType = {
    id: string;
    EventTitle: string;
    CardInfo: CardInfoType[];
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
                BannerImage: ImageType;
            }[];
        };
        Careercard?: {
            Title: TitleBlock[];
            GlobalCard: CardPromo[];
        };
        PositionsTitle?: {
            Title?: string;
            Description?: string;
        };
        positions?: Omit<PositionType, "id">[];
    };
};

export const getCareersData = async (): Promise<CareersDataResponse["careers"] & { positions: PositionType[] }> => {
    const res = await client.request<CareersDataResponse>(query);
    const positionsWithId = res.careers.positions?.map((p, index) => ({
        ...p,
        id: String(index),
    })) as PositionType[];

    return {
        ...res.careers,
        positions: positionsWithId,
    };
};
