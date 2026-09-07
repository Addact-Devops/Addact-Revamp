import { BANNER_TITLE_DESCRIPTION_FIELDS } from "./componentBannerFieldsFragment";

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

