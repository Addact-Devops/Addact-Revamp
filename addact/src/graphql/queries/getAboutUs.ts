// src/graphql/queries/getAboutUs.ts

import { gql } from "graphql-request";
import client from "../client";

export type AboutUsBannerType = {
    BannerTitle: string;
    BannerDescription: string;
    BannerImage: {
        url: string;
        height: number;
        width: number;
    } | null;
};

export type AboutUsHeroBannerResponse = {
    aboutUs: {
        HeroBanner: {
            Banner: AboutUsBannerType[];
        };
    };
};

const query = gql`
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
    const res = await client.request<AboutUsHeroBannerResponse>(query);
    return res.aboutUs?.HeroBanner?.Banner?.[0] || null;
};
