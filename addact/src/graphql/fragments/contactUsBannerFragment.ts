import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";
import { Image } from "@/types/common";

export const CONTACT_US_BANNER_FIELDS = `
  banner {
    Banner {
      ... on ComponentBannerBanner {
        ${COMPONENT_BANNER_FIELDS}
      }
    }
  }
`;

export type ContactUsBannerLink = {
  href: string;
  label: string;
};

export type ContactUsBannerItem = {
  BannerImage: Image;
  BannerTitle: string;
  BannerDescription: string;
  BannerLink: ContactUsBannerLink;
};

export type ContactUsBanner = {
  Banner: ContactUsBannerItem[];
};

export type ContactUsBannerType = {
  banner: ContactUsBanner;
};
