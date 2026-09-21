import { HERO_BANNER_FULL_FIELDS, type BlogBannerItem } from "./blogHeroBannerFieldsFragment";
import type { ImageFragmentType } from "./imageFragment";

export const CASE_STUDY_HERO_BANNER_FIELDS = `
  ${HERO_BANNER_FULL_FIELDS}
`;

export type CaseStudyHeroBannerItem = BlogBannerItem & {
  id?: string;
  PublishDate: string;
  BannerImage: ImageFragmentType;
};

export type CaseStudyHeroBannerType = {
  HeroBanner: CaseStudyHeroBannerItem[];
};


