// Re-using BannerSection, BannerItem, BannerLink from developmentHeroBannerFragment to avoid duplicate type definitions
import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";
import { type BannerSection, type BannerItem, type BannerLink } from "./developmentHeroBannerFragment";

export const SERVICES_DETAIL_BANNER_FIELDS = `
  Banner: banner {
    Banner {
      ... on ComponentBannerBanner {
        ${COMPONENT_BANNER_FIELDS}
        BannerLogo {
          ...ImageFields
        }
      }
    }
  }
`;

export type { BannerSection, BannerItem, BannerLink };
