import { gql } from "graphql-request";
import client from "../client";

const GET_HEADER = gql`
    query Headers {
        headers {
            HeaderLogo {
                width
                url
                height
                name
                alternativeText
            }
            main_navigations {
                Parent {
                    HeaderNavLink {
                        ... on ComponentBaseTemplateTitle {
                            Title
                        }
                    }
                    ReferenceTitle
                }
                SubNavLink {
                    ... on ComponentSharedLink {
                        href
                        isExternal
                        id
                        label
                        target
                    }
                }
                ReferenceTitle
                SubNavImage {
                    alternativeText
                    height
                    name
                    url
                    width
                }
            }
            contact_us {
                ... on ComponentSharedLink {
                    id
                    href
                    label
                    target
                    isExternal
                }
            }
        }
    }
`;

export interface HeaderItem {
    HeaderLogo: {
        width: number;
        url: string;
        height: number;
        name: string;
        alternativeText: string;
    };
    main_navigations: {
        Parent: {
            HeaderNavLink: {
                Title: string;
            }[];
            ReferenceTitle: string;
        };
        SubNavLink: {
            href: string;
            isExternal?: boolean;
            id?: string;
            label?: string;
            target?: string;
        }[];
        ReferenceTitle: string;
        SubNavImage: {
            alternativeText: string;
            height: number;
            name: string;
            url: string;
            width: number;
        };
    }[];
    contact_us: {
        id: string;
        href: string;
        label: string;
        target: string;
        isExternal: boolean;
    }[];
}

export interface HeaderResponse {
    headers: HeaderItem[];
}

export interface HeaderProps {
    data: HeaderResponse;
}

export async function getHeaderData(): Promise<HeaderResponse> {
    const data = await client.request<HeaderResponse>(GET_HEADER);
    return data;
}
