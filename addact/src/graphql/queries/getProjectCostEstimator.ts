import { gql } from "graphql-request";
import client from "../client";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { SEO_FIELDS, type SeoType as SEO } from "../fragments/seoFragment";
export type { SEO };
import { TITLE_DESCRIPTION_FIELDS, type TitleDescriptionType } from "../fragments/titleDescriptionFragment";
import { COMPONENT_BANNER_FIELDS, type HeroBannerFragmentType as ProjectCostEstimatorBannerType } from "../fragments/componentBannerFieldsFragment";
export type { ProjectCostEstimatorBannerType };

export type ProjectCostEstimatorContentType = Required<TitleDescriptionType>;

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
  ${LINK_FRAGMENT}
  query ProjectCostEstimator {
    projectCostEstimator {
      SEO {
        ${SEO_FIELDS}
      }
      banner {
        Banner {
          ${COMPONENT_BANNER_FIELDS}
        }
      }
      Content {
        ${TITLE_DESCRIPTION_FIELDS}
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
