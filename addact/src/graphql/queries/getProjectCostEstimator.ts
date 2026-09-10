import { gql } from "graphql-request";
import client from "../client";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { SEO_FIELDS } from "../fragments/seoFragment";
import { PROJECT_COST_BANNER_FIELDS, type ProjectCostEstimatorBannerType } from "../fragments/projectCostBannerFragment";
export type { ProjectCostEstimatorBannerType } from "../fragments/projectCostBannerFragment";
import { PROJECT_COST_CONTENT_FIELDS, type ProjectCostEstimatorContentType } from "../fragments/projectCostContentFragment";
export type { ProjectCostEstimatorContentType } from "../fragments/projectCostContentFragment";

// -----------------------------
// ✅ Types
// -----------------------------

// ProjectCostEstimatorBannerType moved to projectCostBannerFragment.ts

// ProjectCostEstimatorContentType moved to projectCostContentFragment.ts

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
  ${IMAGE_FRAGMENT}
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
