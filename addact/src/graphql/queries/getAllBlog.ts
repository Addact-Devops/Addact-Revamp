import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HERO_BANNER_FRAGMENT } from "../fragments/heroBannerFragment";
import { COMMON_SECTION_FRAGMENT } from "../fragments/commonSectionFragment";
import { BLOGS_PAGE_HEADING_FIELDS, type BlogsPageHeadingType } from "../fragments/blogsPageHeadingFragment";
import { BLOG_HERO_BANNER_FIELDS, type BlogBannerItem } from "../fragments/blogHeroBannerFieldsFragment";
import type { BaseHeading } from "../fragments/pageHeadingFragment";
import type { HeroBannerFragmentType } from "../fragments/heroBannerFragment";
import type { ContentError } from "../fragments/blogContentErrorFragment";
import type { SlugType } from "@/types/common";
import client from "../client";

export type BlogPageBannerItem = HeroBannerFragmentType & Partial<ContentError> & {
  id?: string;
};

export type BlogPageBannerType = {
  blogBanner?: {
    Banner: BlogPageBannerItem[];
  };
};

export type Category = {
  CategoryTitle: string;
};

export type BlogCategoryItem = {
  Category: Category;
};

export type BlogCategoriesType = {
  blogCategories: BlogCategoryItem[];
};

export type BlogCardItem = Required<SlugType> & {
  documentId: string;
  HeadingSection?: Partial<BaseHeading>[];
  BlogBanner?: BlogBannerItem[];
  blog_category?: BlogCategoryItem;
};

const GET_ALL_BLOGS = gql`
  ${LINK_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${HERO_BANNER_FRAGMENT}
  ${COMMON_SECTION_FRAGMENT}
  query AddactBlogs($page: Int, $pageSize: Int, $sort: [String]) {
    blogs {
      ${BLOGS_PAGE_HEADING_FIELDS}
      blogBanner {
        Banner {
          ... on ComponentBannerBanner {
            id
            ...HeroBannerFields
          }
          ... on Error {
            code
            message
          }
        }
      }
    }

    addactBlogs(pagination: { page: $page, pageSize: $pageSize }, sort: $sort) {
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
    }

    blogCategories {
      Category {
        CategoryTitle
      }
    }
  }
`;

type AddactBlogsResponse = {
  blogs: {
    PageHeading?: BlogsPageHeadingType["PageHeading"];
    blogBanner?: BlogPageBannerType["blogBanner"];
  };
  addactBlogs: BlogCardItem[];
  blogCategories: BlogCategoriesType["blogCategories"];
};

type InitialDataResponse = Omit<AddactBlogsResponse, "addactBlogs"> & {
  addactBlogs: AddactBlogsResponse["addactBlogs"];
  hasMore: boolean;
};

export type {
  BlogsPageHeadingType,
  AddactBlogsResponse,
  InitialDataResponse,
};


// Fetch initial page + metadata
export async function getInitialBlogs(): Promise<InitialDataResponse> {
  const pageSize = 50;
  const page = 1;
  const sort = ["createdAt:desc"];

  const data = await client.request<AddactBlogsResponse>(GET_ALL_BLOGS, {
    page,
    pageSize,
    sort,
  });

  return {
    blogs: data.blogs,
    blogCategories: data.blogCategories,
    addactBlogs: data?.addactBlogs || [],
    hasMore: (data?.addactBlogs || []).length === pageSize,
  };
}

// Fetch next page of blogs
export async function getNextBlogs(
  page: number,
): Promise<{ blogs: AddactBlogsResponse["addactBlogs"]; hasMore: boolean }> {
  const pageSize = 50;
  const sort = ["createdAt:desc"];

  const data = await client.request<AddactBlogsResponse>(GET_ALL_BLOGS, {
    page,
    pageSize,
    sort,
  });

  return {
    blogs: data?.addactBlogs || [],
    hasMore: (data?.addactBlogs || []).length === pageSize,
  };
}
