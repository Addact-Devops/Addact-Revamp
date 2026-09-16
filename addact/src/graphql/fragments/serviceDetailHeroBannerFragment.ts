import { BANNER_TITLE_DESCRIPTION_FIELDS } from "./componentBannerFieldsFragment";
// import type { BannerTitleDescriptionType } from "./componentBannerFieldsFragment";
import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";

export const SERVICE_DETAIL_HERO_BANNER_FIELDS = `
  HeroBanner {
    ${BANNER_TITLE_DESCRIPTION_FIELDS}
    BannerImage {
      ...ImageFields
    }
    BannerLink {
      ...LinkFields
    }
  }
`;

export type ServiceDetailHeroBanner = {
  BannerTitle?: string;
  BannerDescription?: string;
  BannerImage?: ImageFragmentType;
  BannerLink?: LinkFragmentType;
};

