import { gql } from "graphql-request";
import client from "../client";

const GET_FOOTER = gql`
    query Footers {
        footers {
            Logo {
                Image {
                    alternativeText
                    height
                    name
                    url
                    width
                }
            }
            BackGroundImage {
                Image {
                    alternativeText
                    height
                    name
                    url
                    width
                }
            }
            BackGroundImageMobile {
                Image {
                    alternativeText
                    height
                    name
                    url
                    width
                }
            }
            AddressInfo {
                ... on ComponentBaseTemplateTitleWithDescription {
                    Title
                    Description
                }
            }
            footerlinks {
                NavLink {
                    ... on ComponentBaseTemplateTitle {
                        Title
                    }
                    ... on ComponentSharedLink {
                        id
                        href
                        label
                        target
                        isExternal
                    }
                }
            }
            milestonestitle {
                CommonTitle {
                    ... on ComponentBaseTemplateTitleWithDescription {
                        Title
                        Description
                    }
                }
            }
            milestonesimage {
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
            CopyrightText
            SiteSlog
        }
    }
`;

export type FooterResponse = {
    footers: {
        Logo?: {
            Image?: {
                alternativeText?: string;
                height?: number;
                name?: string;
                url?: string;
                width?: number;
            };
        };
        BackGroundImage?: {
            Image?: {
                alternativeText?: string;
                height?: number;
                name?: string;
                url?: string;
                width?: number;
            };
        };
        BackGroundImageMobile?: {
            Image?: {
                alternativeText?: string;
                height?: number;
                name?: string;
                url?: string;
                width?: number;
            };
        };
        AddressInfo?: {
            Title?: string;
            Description?: string;
        }[];
        footerlinks?: {
            NavLink?: (
                | { Title?: string }
                | {
                      id?: string;
                      href?: string;
                      label?: string;
                      target?: string;
                      isExternal?: boolean;
                  }
            )[];
        }[];
        milestonestitle?: {
            CommonTitle?: {
                Title?: string;
                Description?: string;
            }[];
        };
        milestonesimage?: {
            Image?: {
                alternativeText?: string;
                height?: number;
                name?: string;
                url?: string;
                width?: number;
            } | null;
        }[];
        CopyrightText?: string;
        SiteSlog?: string;
    }[];
};

// Fetch footer data
export async function getFooterData() {
    const data = await client.request<FooterResponse>(GET_FOOTER);
    return data.footers?.[0] || null;
}
