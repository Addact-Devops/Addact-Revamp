import { BLOG_HERO_BANNER_FIELDS } from "./blogHeroBannerFieldsFragment";

export const BLOG_CARD_FIELDS = `
  Slug
  documentId
  HeadingSection {
    ... on ComponentBaseTemplateCommonSection { ...CommonSectionFields }
  }
  ${BLOG_HERO_BANNER_FIELDS}
  blog_category {
    Category {
      CategoryTitle
    }
  }
`;

export type BlogCardItem = {
  Slug: string;
  documentId: string;
  HeadingSection?: {
    PageTitle?: string;
  }[];
  BlogBanner?: {
    BannerTitle?: string;
    BannerDescription?: string;
    BannerImage?: {
      url: string;
      width: number;
      height: number;
      name: string;
      alternativeText?: string;
    };
    PublishDate?: string;
    author?: {
      Author?: {
        AuthorName?: string;
      };
    };
    ReadNow?: {
      id?: string;
      href?: string;
      label?: string;
      target?: string;
      isExternal?: boolean;
    };
    blogcategory?: {
      Category?: {
        CategoryTitle?: string;
      };
    };
  }[];
  blog_category?: {
    Category?: {
      CategoryTitle?: string;
    };
  };
};

export type BlogCardType = BlogCardItem;

