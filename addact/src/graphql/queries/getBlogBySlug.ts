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
import { BLOG_CONTENT_FIELDS } from "../fragments/blogContentFragment";
import { BLOG_AUTHOR_FIELDS } from "../fragments/blogAuthorFragment";
import { BLOG_SIMILAR_STORY_TITLE_FIELDS } from "../fragments/blogSimilarStoryTitleFragment";
import { BLOG_SIMILAR_BLOGS_FIELDS } from "../fragments/blogSimilarBlogsFragment";
import { BLOG_SOCIAL_ICONS_FIELDS } from "../fragments/blogSocialIconsFragment";
import { BLOG_CONTACT_CARD_FIELDS } from "../fragments/blogContactCardFragment";
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

    BlogContent?: {
      id?: string;
      Richtext?: string;
      h1?: string;
      h2?: string;
      h3?: string;
      h4?: string;
      h5?: string;
      h6?: string;
      href?: string;
      label?: string;
      target?: string;
      isExternal?: boolean;
      Image?: {
        alternativeText?: string;
        name?: string;
        height?: number;
        url?: string;
        width?: number;
      };
    }[];

    author?: {
      Author?: {
        AuthorName?: string;
        AuthorDescription?: string;
        AuthorImage?: {
          alternativeText?: string;
          height?: number;
          width?: number;
          url?: string;
          name?: string;
        };
        designation?: { DesignationTitle?: string };
      };
    };

    similarstorytitle?: {
      CommonTitle?: {
        Title?: string;
        Description?: string;
      }[];
    };

    similarBlogs?: {
      BlogBanner?: {
        BannerTitle?: string;
        PublishDate?: string;
        BannerImage?: {
          alternativeText?: string;
          name?: string;
          url?: string;
          width?: number;
          height?: number;
        };
        ReadNow?: {
          id?: string;
          href?: string;
          label?: string;
          target?: string;
          isExternal?: boolean;
        };
        author?: {
          Author?: {
            AuthorName?: string;
          };
        };
        blogcategory?: {
          Category?: {
            CategoryTitle?: string;
          };
        };
      }[];
    }[];

    socialicons?: {
      SocialIcon?: {
        Title?: string;
        ClassName?: string;
        Links?: {
          id?: string;
          href?: string;
          label?: string;
          target?: string;
          isExternal?: boolean;
        }[];
        Icons?: {
          alternativeText?: string;
          name?: string;
          height?: number;
          url?: string;
          width?: number;
        };
        HoverIcon?: {
          alternativeText?: string;
          name?: string;
          height?: number;
          url?: string;
          width?: number;
        };
      }[];
    };

    contactCard?: {
      documentId?: string;
      pageReference?: string;
      createdAt?: string;
      updatedAt?: string;
      publishedAt?: string;
      ContactCard?: {
        id?: string;
        CardTitle?: string;
        CardDescription?: string;
        CardLink?: {
          id?: string;
          href?: string;
          label?: string;
          target?: string;
          isExternal?: boolean;
        };
        BgImage?: {
          width?: number;
          url?: string;
          name?: string;
          height?: number;
          alternativeText?: string;
        };
      }[];
    };
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
