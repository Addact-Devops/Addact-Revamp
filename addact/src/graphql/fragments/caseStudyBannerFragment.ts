import { COMPONENT_HERO_BANNER_SEARCHBOX_FIELDS, type HeroBannerFragmentType } from "./heroBannerFragment";

export const CASE_STUDY_BANNER_FIELDS = `
  CaseStudyBanner {
    Banner {
      ${COMPONENT_HERO_BANNER_SEARCHBOX_FIELDS}
    }
  }
`;

export type CaseStudyBannerItem = HeroBannerFragmentType & {
  show_searchbox?: boolean;
};

export type CaseStudyBannerType = {
  CaseStudyBanner: {
    Banner: CaseStudyBannerItem[];
  };
};


