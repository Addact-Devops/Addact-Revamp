import { Image, Link } from "@/types/common";
import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";

export const EVENT_BANNER_FIELDS = `
  EventBanner {
    Banner {
      ... on ComponentBannerBanner {
        ${COMPONENT_BANNER_FIELDS}
      }
    }
  }
`;

export type EventBannerItem = {
  BannerDescription: string;
  BannerImage: Image;
  BannerLink: Link;
  BannerTitle: string;
};

export type EventBannerType = {
  EventBanner: {
    Banner: EventBannerItem[];
  };
};
