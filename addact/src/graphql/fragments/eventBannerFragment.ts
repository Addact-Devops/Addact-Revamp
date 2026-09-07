import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";

export const EVENT_BANNER_FIELDS = `
  EventBanner {
    Banner {
      ... on ComponentBannerBanner {
        ${COMPONENT_BANNER_FIELDS}
      }
    }
  }
`;
