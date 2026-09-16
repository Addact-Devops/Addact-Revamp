import { BLOG_CATEGORY_FIELDS } from "./blogCategoryFragment";
import { BLOG_HERO_BANNER_READ_NOW_FIELDS } from "./blogHeroBannerReadNowFragment";
import { CASE_STUDY_HERO_BANNER_AUTHOR_FIELDS } from "./caseStudyHeroBannerAuthorFragment";
import { BLOG_HERO_BANNER_INNER_FIELDS } from "./blogHeroBannerFragment";
import type { ImageFragmentType } from "./imageFragment";

export const CASE_STUDY_HERO_BANNER_FIELDS = `
  HeroBanner {
    ... on ComponentBlogHeroBannerBlogHeroBanner {
      id
      ${BLOG_HERO_BANNER_INNER_FIELDS}
      ${BLOG_CATEGORY_FIELDS}
      ${CASE_STUDY_HERO_BANNER_AUTHOR_FIELDS}
      ${BLOG_HERO_BANNER_READ_NOW_FIELDS}
    }
  }
`;

export type CaseStudyHeroBannerItem = {
  id: string;
  BannerTitle: string;
  BannerDescription: string;
  PublishDate: string;
  BannerImage: ImageFragmentType & { name: string };
  blogcategory?: string;
  author?: string;
  ReadNow?: string;
};


export type CaseStudyHeroBannerType = {
  HeroBanner: CaseStudyHeroBannerItem[];
};


