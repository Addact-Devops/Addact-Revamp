import {
  COMPONENT_BANNER_SECTION_FIELDS,
  type BannerSection,
  type BannerItem,
  type BannerLink,
} from "./componentBannerFieldsFragment";
import { type LinkWithIcon } from "./homeCapabilitiesFragment";

export const AI_BANNER_SECTION_FIELDS = `
  Banner {
    ${COMPONENT_BANNER_SECTION_FIELDS}
  }
`;

export type { BannerSection, BannerItem, BannerLink, LinkWithIcon };

export type AiBannerSectionType = {
  Banner: BannerSection;
};


