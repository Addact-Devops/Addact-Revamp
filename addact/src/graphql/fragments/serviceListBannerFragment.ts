import { BANNER_IMAGE_LINK_FIELDS } from "./componentBannerFieldsFragment";
import type { BannerItem as ServiceListBannerItem, BANNER } from "./homeBannerFragment";

export type { ServiceListBannerItem };

export type ServiceListBannerType = {
  Banner: BANNER;
};

export const SERVICE_LIST_BANNER_FIELDS = `
  Banner {
    Banner {
      ${BANNER_IMAGE_LINK_FIELDS}
    }
  }
`;



