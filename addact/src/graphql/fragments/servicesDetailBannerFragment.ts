import {
  COMPONENT_BANNER_SECTION_FIELDS,
  type BannerSection,
  type BannerItem,
  type BannerLink,
} from "./componentBannerFieldsFragment";

export const SERVICES_DETAIL_BANNER_FIELDS = `
  Banner: banner {
    ${COMPONENT_BANNER_SECTION_FIELDS}
  }
`;

export type { BannerSection, BannerItem, BannerLink };
