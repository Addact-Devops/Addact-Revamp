import { gql } from "graphql-request";
import client from "../client";

const industries_Query = gql`
    query industriesWeServes {
        industriesWeServes {
            TitleDescription {
                Title
                Description
            }
            Industries {
                Icons {
                    alternativeText
                    height
                    name
                    url
                    width
                }
                LinkIcons {
                    id
                    href
                    label
                    target
                    isExternal
                }
                Title
            }
        }
    }
`;
export async function getIndustriesWeServe(): Promise<IndustriesResponse> {
    const data = await client.request<IndustriesResponse>(industries_Query);
    return data;
}
export type IndustryIcon = {
    alternativeText?: string | null;
    height: number;
    name: string;
    url: string;
    width: number;
};

export type IndustryLink = {
    id: string;
    href: string;
    label: string;
    target: string;
    isExternal: boolean;
};

export type Industry = {
    Icons: IndustryIcon | null;
    LinkIcons: IndustryLink[];
    Title: string;
};

export type IndustriesWeServeEntry = {
    TitleDescription: {
        Title: string;
        Description: string;
    };
    Industries: Industry[];
};

export type IndustriesResponse = {
    industriesWeServes: IndustriesWeServeEntry[];
};
