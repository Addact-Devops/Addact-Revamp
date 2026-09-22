import {
  CASE_STUDY_BANNER_SECTION_FIELDS,
  type HeroBannerFragmentType,
} from "./heroBannerFragment";

export const CASE_STUDY_BANNER_FIELDS = CASE_STUDY_BANNER_SECTION_FIELDS;


export type CaseStudyBannerItem = HeroBannerFragmentType;

export type CaseStudyBannerType = {
  CaseStudyBanner: {
    Banner: CaseStudyBannerItem[];
  };
};

export type { HeroBannerFragmentType };


