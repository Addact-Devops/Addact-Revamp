import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { CARD_FRAGMENT } from "../fragments/cardFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { LINK_IMAGE_FRAGMENT } from "../fragments/linkImageFragment";
import { COMMON_SECTION_FRAGMENT } from "../fragments/commonSectionFragment";
import { SEO_FIELDS } from "../fragments/seoFragment";
import { EVENT_HEADING_SECTION_FIELDS } from "../fragments/eventHeadingSectionFragment";
import { BLOG_HERO_BANNER_FIELDS } from "../fragments/blogHeroBannerFieldsFragment";
import { BLOG_CONTENT_FIELDS, type BlogContentType } from "../fragments/blogContentFragment";
import { BLOG_AUTHOR_FIELDS, type BlogAuthorType } from "../fragments/blogAuthorFragment";
import { BLOG_SIMILAR_STORY_TITLE_FIELDS, type BlogSimilarStoryTitleType } from "../fragments/blogSimilarStoryTitleFragment";
import { BLOG_SIMILAR_BLOGS_FIELDS, type BlogSimilarBlogsType } from "../fragments/blogSimilarBlogsFragment";
import { BLOG_SOCIAL_ICONS_FIELDS, type BlogSocialIconsType } from "../fragments/blogSocialIconsFragment";
import { BLOG_CONTACT_CARD_FIELDS, type BlogContactCardType } from "../fragments/blogContactCardFragment";
import client from "../client";

const GET_BLOG_BY_SLUG = gql`
  ${LINK_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${SHARED_IMAGE_FRAGMENT}
  ${CARD_FRAGMENT}
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

      ${BLOG_AUTHOR_FIELDS}

      ${BLOG_SIMILAR_STORY_TITLE_FIELDS}

      ${BLOG_SIMILAR_BLOGS_FIELDS}

      ${BLOG_SOCIAL_ICONS_FIELDS}

      ${BLOG_CONTACT_CARD_FIELDS}
    }
  }
`;

export type BlogBySlugResponse = {
  addactBlogs: {
    Slug: string;

    SEO?: {
      metaTitle?: string;
      metaDescription?: string;
      ogTitle?: string;
      ogDescription?: string;
      ogImage?: {
        url?: string;
      };
      metaRobots?: string;
      twitterCardTitle?: string;
      canonicalURL?: string;
      structuredData?: Record<string, unknown>; // ✅ fixed: replaced `any` with valid type
      languageTag?: string;
    } | null;

    HeadingSection?: { PageTitle?: string }[];

    BlogBanner?: {
      BannerTitle?: string;
      BannerDescription?: string;
      BannerImage?: {
        alternativeText?: string;
        height?: number;
        name?: string;
        url?: string;
        width?: number;
      };
      PublishDate?: string;
      ReadNow?: {
        id?: string;
        href?: string;
        label?: string;
        target?: string;
        isExternal?: boolean;
      };
      author?: { Author?: { AuthorName?: string } };
      blogcategory?: { Category?: { CategoryTitle?: string } };
    }[];

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
