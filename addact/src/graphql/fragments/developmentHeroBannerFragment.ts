import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";

export const DEVELOPMENT_HERO_BANNER_FIELDS = `
  Banner {
    ... on ComponentBannerBanner {
      ${COMPONENT_BANNER_FIELDS}
    }
  }
`;
