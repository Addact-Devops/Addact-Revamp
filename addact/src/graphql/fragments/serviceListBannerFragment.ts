import { Image, Link } from "@/types/common";
import { BANNER_TITLE_DESCRIPTION_FIELDS } from "./componentBannerFieldsFragment";

export type ServiceListBannerItem = {
  BannerDescription: string;
  BannerTitle: string;
  BannerImage: Image;
  BannerLink: Link;
};

export type ServiceListBannerType = {
  Banner: {
    Banner: ServiceListBannerItem[];
  };
};

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



