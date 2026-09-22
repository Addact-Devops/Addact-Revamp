import {
  COMPONENT_NESTED_BANNER_FIELDS,
  type BannerSection,
  type ComponentBannerItem,
} from "./componentBannerFieldsFragment";

export const CONTACT_US_BANNER_FIELDS = COMPONENT_NESTED_BANNER_FIELDS;


export type ContactUsBannerItem = ComponentBannerItem;
export type ContactUsBanner = BannerSection;

export type ContactUsBannerType = {
  banner: ContactUsBanner;
};

