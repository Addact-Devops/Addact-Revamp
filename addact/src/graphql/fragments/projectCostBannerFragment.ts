import { BANNER_TITLE_DESCRIPTION_FIELDS } from "./componentBannerFieldsFragment";
import { type ImageFragmentType } from "./imageFragment";

export const PROJECT_COST_BANNER_FIELDS = `
  banner {
    Banner {
      ... on ComponentBannerBanner {
        BannerImage {
          ...ImageFields
        }
        ${BANNER_TITLE_DESCRIPTION_FIELDS}
        BannerLogo {
          ...ImageFields
        }
      }
    }
  }
`;

export type ProjectCostEstimatorBannerType = {
  BannerImage?: ImageFragmentType;
  BannerTitle?: string;
  BannerDescription?: string;
  BannerLogo?: ImageFragmentType;
};
