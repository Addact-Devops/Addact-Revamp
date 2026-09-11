import { gql } from "graphql-request";
import client from "../client";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { SEO_FIELDS, type SeoType as SEO } from "../fragments/seoFragment";
export type { SEO };
import { PROJECT_COST_BANNER_FIELDS, type ProjectCostEstimatorBannerType } from "../fragments/projectCostBannerFragment";
export type { ProjectCostEstimatorBannerType } from "../fragments/projectCostBannerFragment";
import { PROJECT_COST_CONTENT_FIELDS, type ProjectCostEstimatorContentType } from "../fragments/projectCostContentFragment";
export type { ProjectCostEstimatorContentType } from "../fragments/projectCostContentFragment";

// -----------------------------
// ✅ Types
// -----------------------------

export type ProjectCostEstimatorResponse = {
  projectCostEstimator: {
    SEO: SEO | null;
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
