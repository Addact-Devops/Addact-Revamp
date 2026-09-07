import { BANNER_TITLE_DESCRIPTION_FIELDS } from "./componentBannerFieldsFragment";

export const SERVICE_LIST_BANNER_FIELDS = `
  Banner {
    Banner {
      ${BANNER_TITLE_DESCRIPTION_FIELDS}
      BannerImage {
        ...ImageFields
      }
      BannerLink {
        ...LinkFields
      }
    }
  }
`;


