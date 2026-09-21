import { COMPONENT_BANNER_SECTION_FIELDS, type ComponentBannerItem, type BannerSection } from "./componentBannerFieldsFragment";

export const EVENT_BANNER_FIELDS = `
  EventBanner {
    ${COMPONENT_BANNER_SECTION_FIELDS}
  }
`;

export type EventBannerItem = ComponentBannerItem;

export type EventBannerType = {
  EventBanner: BannerSection;
};


