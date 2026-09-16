import { Image, Link } from "@/types/common";
import { BLOG_HERO_BANNER_READ_NOW_FIELDS } from "./blogHeroBannerReadNowFragment";
import { BLOG_HERO_BANNER_INNER_FIELDS } from "./blogHeroBannerFragment";

export const OUR_INSIGHTS_CASE_STUDY_FIELDS = `
  addactCaseStudies(pagination: { page: 1, pageSize: 2 }, sort: ["publishedAt:desc"]) {
    ReferenceTitle
    Slug
    HeroBanner {
      ... on ComponentBlogHeroBannerBlogHeroBanner {
        ${BLOG_HERO_BANNER_INNER_FIELDS}
        ${BLOG_HERO_BANNER_READ_NOW_FIELDS}
      }
    }
  }
`;

export type CaseStudyHeroBanner = {
  BannerImage: Image;
  BannerTitle: string;
  ReadNow: Link;
  PublishDate: string;
  BannerDescription: string;
};

export type AddactCaseStudy = {
  ReferenceTitle: string;
  Slug?: string;
  HeroBanner: CaseStudyHeroBanner[];
};

export type OurInsightsCaseStudyType = {
  addactCaseStudies: AddactCaseStudy[];
};
