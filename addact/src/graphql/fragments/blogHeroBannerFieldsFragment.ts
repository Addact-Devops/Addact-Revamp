import type { HeaderLink } from "./linkFragment";
import type { ImageFragmentType } from "./imageFragment";
import type { BlogAuthorType as BannerAuthor } from "./blogAuthorFragment";

export type BlogCategory = {
  blogcategory?: {
    Category?: {
      CategoryTitle?: string;
    };
  };
};

export type ReadNow = {
  ReadNow?: HeaderLink;
};

export type BlogHeroBannerItem = {
  BannerTitle?: string;
  BannerDescription?: string;
  PublishDate?: string;
  BannerImage: ImageFragmentType;
};

export type BlogHeroBannerType = {
  HeroBanner: BlogHeroBannerItem[];
};

export const BLOG_HERO_BANNER_FULL_INNER_FIELDS = `
  BannerTitle
  BannerDescription
  PublishDate
  BannerImage {
    ...ImageFields
  }
  ReadNow {
    ...LinkFields
  }
  author {
    Author {
      AuthorName
      AuthorImage {
        ...ImageFields
      }
      AuthorDescription
      designation {
        DesignationTitle
      }
    }
  }
  blogcategory {
    Category {
      CategoryTitle
    }
  }
`;

export const COMPONENT_BLOG_HERO_BANNER_FULL_FIELDS = `
  ... on ComponentBlogHeroBannerBlogHeroBanner {
    ${BLOG_HERO_BANNER_FULL_INNER_FIELDS}
  }
`;

export const BLOG_HERO_BANNER_FIELDS = `BlogBanner { ${COMPONENT_BLOG_HERO_BANNER_FULL_FIELDS} }`;
export const HERO_BANNER_FULL_FIELDS = `HeroBanner { ${COMPONENT_BLOG_HERO_BANNER_FULL_FIELDS} }`;

// Composite type merging all sub-fragment shapes directly
export type BlogBySlugBannerItem = Partial<BlogHeroBannerItem> &
  ReadNow &
  BannerAuthor &
  BlogCategory;

export type BlogBannerItem = BlogBySlugBannerItem;

export type BlogBanner = {
  BlogBanner: BlogBannerItem[];
};
