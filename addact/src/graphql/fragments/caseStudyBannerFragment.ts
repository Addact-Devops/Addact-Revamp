import type { ImageFragmentType } from "./imageFragment";

export const CASE_STUDY_BANNER_FIELDS = `
  CaseStudyBanner {
    Banner {
      ... on ComponentBannerBanner {
        ...HeroBannerFields
        show_searchbox
      }
    }
  }
`;

export type CaseStudyBannerItem = {
  BannerTitle: string;
  BannerDescription: string;
  BannerImage: ImageFragmentType & { alternativeText: string };
  show_searchbox: boolean;
};

export type CaseStudyBannerType = {
  CaseStudyBanner: {
    Banner: CaseStudyBannerItem[];
  };
};

