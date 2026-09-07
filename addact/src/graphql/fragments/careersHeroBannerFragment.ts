import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";

export const CAREERS_HERO_BANNER_FIELDS = `
  Banner {
    ... on ComponentBannerBanner {
      ${COMPONENT_BANNER_FIELDS}
    }
  }
`;
