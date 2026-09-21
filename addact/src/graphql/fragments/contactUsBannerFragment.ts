import { COMPONENT_BANNER_SECTION_FIELDS, type ComponentBannerItem } from "./componentBannerFieldsFragment";

export const CONTACT_US_BANNER_FIELDS = `
  banner {
    ${COMPONENT_BANNER_SECTION_FIELDS}
  }
`;

export type ContactUsBannerItem = ComponentBannerItem;

export type ContactUsBanner = {
  Banner: ContactUsBannerItem[];
};

export type ContactUsBannerType = {
  banner: ContactUsBanner;
};

