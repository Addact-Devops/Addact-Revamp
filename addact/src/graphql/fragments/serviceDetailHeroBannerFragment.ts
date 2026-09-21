import {
  BANNER_IMAGE_LINK_FIELDS,
  type HeroBannerFragmentType,
} from "./componentBannerFieldsFragment";

export const SERVICE_DETAIL_HERO_BANNER_FIELDS = `
  HeroBanner {
    ${BANNER_IMAGE_LINK_FIELDS}
  }
`;

export type ServiceDetailHeroBanner = HeroBannerFragmentType;


