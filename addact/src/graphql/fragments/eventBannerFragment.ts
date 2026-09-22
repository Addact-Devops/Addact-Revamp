import {
  COMPONENT_EVENT_BANNER_SECTION_FIELDS,
  type BannerItem,
  type BannerSection,
} from "./componentBannerFieldsFragment";

export const EVENT_BANNER_FIELDS = COMPONENT_EVENT_BANNER_SECTION_FIELDS;

export type EventBannerItem = BannerItem;

export type EventBannerType = {
  EventBanner: BannerSection;
};



