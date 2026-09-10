import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HERO_BANNER_FRAGMENT } from "../fragments/heroBannerFragment";
import { COMMON_SECTION_FRAGMENT } from "../fragments/commonSectionFragment";
import { BLOGS_PAGE_HEADING_FIELDS, type BlogsPageHeadingType } from "../fragments/blogsPageHeadingFragment";
import { BLOG_PAGE_BANNER_FIELDS, type BlogPageBannerType } from "../fragments/blogPageBannerFragment";
import { BLOG_CARD_FIELDS, type BlogCardItem } from "../fragments/blogCardFragment";
import { BLOG_CATEGORIES_FIELDS, type BlogCategoriesType } from "../fragments/blogCategoriesFragment";
import client from "../client";

const GET_ALL_BLOGS = gql`
  ${LINK_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${HERO_BANNER_FRAGMENT}
  ${COMMON_SECTION_FRAGMENT}
  query AddactBlogs($page: Int, $pageSize: Int, $sort: [String]) {
    blogs {
      ${BLOGS_PAGE_HEADING_FIELDS}
      ${BLOG_PAGE_BANNER_FIELDS}
    }

    addactBlogs(pagination: { page: $page, pageSize: $pageSize }, sort: $sort) {
      ${BLOG_CARD_FIELDS}
    }

    ${BLOG_CATEGORIES_FIELDS}
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
