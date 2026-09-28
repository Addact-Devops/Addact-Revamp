import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { LINK_IMAGE_FRAGMENT } from "../fragments/linkImageFragment";
import { COMMON_SECTION_FRAGMENT } from "../fragments/commonSectionFragment";
import { SEO_FIELDS, type SeoType, type SEO, type BlogBySlugSEO } from "../fragments/seoFragment";
export type { SeoType, SEO, BlogBySlugSEO };
import {
  EVENT_HEADING_SECTION_FIELDS,
  type EventHeadingSectionType,
} from "../fragments/eventHeadingSectionFragment";
export type { EventHeadingSectionType };
import {
  BLOG_HERO_BANNER_FIELDS,
  type BlogBanner,
  type BlogBannerItem,
  type BlogBySlugBannerItem,
} from "../fragments/blogHeroBannerFieldsFragment";
export type { BlogBanner, BlogBannerItem, BlogBySlugBannerItem };
import { BLOG_CONTENT_FIELDS, type BlogContentType } from "../fragments/blogContentFragment";
export type { BlogContentType };
import type { BlogAuthorType } from "../fragments/blogAuthorFragment";
export type { BlogAuthorType };
import type { TitleDescriptionType } from "../fragments/titleDescriptionFragment";

export type BlogSimilarStoryTitleItem = TitleDescriptionType;

export type BlogSimilarStoryTitleType = {
  similarstorytitle?: {
    CommonTitle?: BlogSimilarStoryTitleItem[];
  };
};
export type BlogSimilarBlogItem = {
  BlogBanner?: BlogBannerItem[];
};

export type BlogSimilarBlogsType = {
  similarBlogs?: BlogSimilarBlogItem[];
};
import {
  BLOG_SOCIAL_ICONS_FIELDS,
  type BlogSocialIconsType,
} from "../fragments/blogSocialIconsFragment";
export type { BlogSocialIconsType };
import {
  BLOG_CONTACT_CARD_FIELDS,
  type BlogContactCardType,
} from "../fragments/blogContactCardFragment";
export type { BlogContactCardType };
import client from "../client";

const GET_BLOG_BY_SLUG = gql`
  ${LINK_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${SHARED_IMAGE_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  ${RICHTEXT_FRAGMENT}
  ${LINK_IMAGE_FRAGMENT}
  ${COMMON_SECTION_FRAGMENT}
  query GetBlogBySlug($filters: AddactBlogFiltersInput) {
    addactBlogs(filters: $filters) {
      Slug

      SEO { ${SEO_FIELDS} }

      ${EVENT_HEADING_SECTION_FIELDS}

      ${BLOG_HERO_BANNER_FIELDS}

      ${BLOG_CONTENT_FIELDS}

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

      similarstorytitle {
        CommonTitle {
          ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
        }
      }

      similarBlogs {
        ${BLOG_HERO_BANNER_FIELDS}
      }

      ${BLOG_SOCIAL_ICONS_FIELDS}

      ${BLOG_CONTACT_CARD_FIELDS}
    }
  }
`;

export type BlogBySlugResponse = {
  addactBlogs: {
    Slug: string;

    SEO?: BlogBySlugSEO | null;

    HeadingSection?: EventHeadingSectionType["HeadingSection"];

    BlogBanner?: BlogBySlugBannerItem[];

    BlogContent?: BlogContentType["BlogContent"];

    author?: BlogAuthorType["author"];

    similarstorytitle?: BlogSimilarStoryTitleType["similarstorytitle"];

    similarBlogs?: BlogSimilarBlogsType["similarBlogs"];

    socialicons?: BlogSocialIconsType["socialicons"];

    contactCard?: BlogContactCardType["contactCard"];
  }[];
};

// Fetch function
export async function getBlogBySlug(slug: string) {
  const data = await client.request<BlogBySlugResponse>(GET_BLOG_BY_SLUG, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });

  return data.addactBlogs?.[0] || null;
}
