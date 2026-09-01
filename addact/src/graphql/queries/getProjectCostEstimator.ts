import { gql } from "graphql-request";
import client from "../client";
import { SEO_FIELDS } from "../fragments/seoFragment";
import { PROJECT_COST_BANNER_FIELDS } from "../fragments/projectCostBannerFragment";
import { PROJECT_COST_CONTENT_FIELDS } from "../fragments/projectCostContentFragment";

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
        ${SEO_FIELDS}
      }
      ${PROJECT_COST_BANNER_FIELDS}
      ${PROJECT_COST_CONTENT_FIELDS}
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
