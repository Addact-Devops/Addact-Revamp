import { COMPONENT_BANNER_SECTION_FIELDS, type HeroBannerFragmentType } from "./componentBannerFieldsFragment";

export const PROJECT_COST_BANNER_FIELDS = `
  banner {
    ${COMPONENT_BANNER_SECTION_FIELDS}
  }
`;

export type ProjectCostEstimatorBannerType = HeroBannerFragmentType;


