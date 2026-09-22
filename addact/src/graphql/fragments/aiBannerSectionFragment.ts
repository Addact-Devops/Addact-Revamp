import {
  COMPONENT_NESTED_UPPER_BANNER_FIELDS,
  type BannerSection,
  type BannerItem,
  type BannerLink,
} from "./componentBannerFieldsFragment";
import { type LinkWithIcon } from "./homeCapabilitiesFragment";

export const AI_BANNER_SECTION_FIELDS = COMPONENT_NESTED_UPPER_BANNER_FIELDS;

export type { BannerSection, BannerItem, BannerLink, LinkWithIcon };

export type AiBannerSectionType = {
  Banner: BannerSection;
};


