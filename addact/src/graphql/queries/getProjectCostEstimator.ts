import { gql } from "graphql-request";
import client from "../client";

// -----------------------------
// ✅ Types
// -----------------------------

export type ProjectCostEstimatorBannerType = {
    BannerImage?: {
        url?: string;
        width?: number;
        height?: number;
        alternativeText?: string | null;
    };
    BannerTitle?: string;
    BannerDescription?: string;
    BannerLogo?: {
        url?: string;
        width?: number;
        height?: number;
        alternativeText?: string | null;
    };
};

export type ProjectCostEstimatorContentType = {
    Title: string;
    Description: string;
};

export type ProjectCostEstimatorResponse = {
    projectCostEstimator: {
        SEO: {
            metaTitle?: string;
            metaDescription?: string;
            ogTitle?: string | null;
            ogDescription?: string | null;
            ogImage?: { url: string } | null;
            metaRobots?: string | null;
            twitterCardTitle?: string | null;
            canonicalURL?: string | null;
            structuredData?: string | null;
            languageTag?: string | null;
        };
        banner: {
            Banner: ProjectCostEstimatorBannerType[];
        };
        Content: ProjectCostEstimatorContentType;
    };
};

// -----------------------------
// ✅ Query
// -----------------------------

const projectCostEstimatorQuery = gql`
    query ProjectCostEstimator {
        projectCostEstimator {
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
            banner {
                Banner {
                    ... on ComponentBannerBanner {
                        BannerImage {
                            url
                            alternativeText
                            width
                            height
                        }
                        BannerTitle
                        BannerDescription
                        BannerLogo {
                            url
                            alternativeText
                            width
                            height
                        }
                    }
                }
            }
            Content {
                Title
                Description
            }
        }
    }
`;

// -----------------------------
// ✅ Fetch Function
// -----------------------------

export const getProjectCostEstimatorData = async (): Promise<ProjectCostEstimatorResponse> => {
    const data = await client.request(projectCostEstimatorQuery);
    return data as ProjectCostEstimatorResponse;
};
