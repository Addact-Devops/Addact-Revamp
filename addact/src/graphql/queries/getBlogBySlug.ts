import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { CARD_FRAGMENT } from "../fragments/cardFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { LINK_IMAGE_FRAGMENT } from "../fragments/linkImageFragment";
import { COMMON_SECTION_FRAGMENT } from "../fragments/commonSectionFragment";
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

      SEO {
        metaTitle
        metaDescription
        ogTitle
        ogDescription
        ogImage {
          url
        }
        metaRobots
        twitterCardTitle
        canonicalURL
        structuredData
        languageTag
      }

      HeadingSection {
        ... on ComponentBaseTemplateCommonSection { ...CommonSectionFields }
      }

      BlogBanner {
        ... on ComponentBlogHeroBannerBlogHeroBanner {
          BannerTitle
          BannerDescription
          BannerImage {
            alternativeText
            height
            name
            url
            width
          }
          PublishDate
          ReadNow {
            id
            href
            label
            target
            isExternal
          }
          author {
            Author {
              AuthorName
            }
          }
          blogcategory {
            Category {
              CategoryTitle
            }
          }
        }
      }

      BlogContent {
        ... on ComponentHeadingsH6 {
          id
          h6
        }
        ... on ComponentHeadingsH5 {
          id
          h5
        }
        ... on ComponentHeadingsH4 {
          id
          h5
        }
        ... on ComponentHeadingsH3 {
          id
          h3
        }
        ... on ComponentHeadingsH2 {
          id
          h2
        }
        ... on ComponentHeadingsH1 {
          id
          h1
        }
        ... on ComponentSharedImage { ...SharedImageFields }
        ... on ComponentSharedLink {
          id
          href
          label
          target
          isExternal
        }
        ... on ComponentBaseTemplateRichtext { ...RichtextFields }
        ... on Error {
          code
          message
        }
      }

      author {
        Author {
          AuthorName
          AuthorDescription
          AuthorImage {
            alternativeText
            height
            width
            url
            name
          }
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
        BlogBanner {
          ... on ComponentBlogHeroBannerBlogHeroBanner {
            BannerTitle
            BannerImage {
              alternativeText
              height
              name
              url
              width
            }
            PublishDate
            ReadNow {
              id
              href
              label
              target
              isExternal
            }
            author {
              Author {
                AuthorName
              }
            }
            blogcategory {
              Category {
                CategoryTitle
              }
            }
          }
        }
      }

      socialicons {
        SocialIcon {
          ... on ComponentBaseTemplateLinkImage { ...LinkImageFields }
        }
      }

      contactCard {
        documentId
        pageReference
        createdAt
        updatedAt
        publishedAt
        ContactCard {
          ... on ComponentCardCard { ...CardFields }
          ... on Error {
            code
            message
          }
        }
      }
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
