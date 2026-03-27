import { gql } from "graphql-request";
import client from "../client";

const ourInsights_Query = gql`
  query AddactBlogsAndCaseStudy {
    addactBlogs(pagination: { page: 1, pageSize: 2 }, sort: ["publishedAt:desc"]) {
      documentId
      Slug
      createdAt
      HeadingSection {
        ... on ComponentBaseTemplateCommonSection {
          PageTitle
        }
      }
      BlogBanner {
        ... on ComponentBlogHeroBannerBlogHeroBanner {
          id
          BannerImage {
            width
            url
            name
            height
            alternativeText
          }
          BannerDescription
          BannerTitle
          PublishDate
          ReadNow {
            href
            id
            isExternal
            label
            target
          }
        }
      }
    }
    addactCaseStudies(pagination: { page: 1, pageSize: 2 }, sort: ["publishedAt:desc"]) {
      ReferenceTitle
      Slug
      HeroBanner {
        ... on ComponentBlogHeroBannerBlogHeroBanner {
          BannerImage {
            alternativeText
            height
            name
            url
            width
          }
          BannerTitle
          ReadNow {
            href
            id
            isExternal
            label
            target
          }
          PublishDate
          BannerDescription
        }
      }
    }
  }
`;

export interface AddactBlogsAndCaseStudyResponse {
  addactBlogs: AddactBlog[];
  addactCaseStudies: AddactCaseStudy[];
}

export interface AddactBlog {
  documentId: string;
  Slug: string;
  createdAt: string;
  HeadingSection: BlogHeadingSection[];
  BlogBanner: BlogBanner[];
}

export interface BlogHeadingSection {
  PageTitle: string;
}

export interface BlogBanner {
  id: string;
  BannerImage: BannerImage;
  BannerDescription: string;
  BannerTitle: string;
  PublishDate: string;
  ReadNow: ReadNowLink;
}
export interface AddactCaseStudy {
  ReferenceTitle: string;
  HeroBanner: CaseStudyHeroBanner[];
}

export interface CaseStudyHeroBanner {
  BannerImage: BannerImage;
  BannerTitle: string;
  ReadNow: ReadNowLink;
  PublishDate: string;
  BannerDescription: string;
}
export interface BannerImage {
  width: number;
  height: number;
  url: string;
  name: string;
  alternativeText: string | null;
}

export interface ReadNowLink {
  href: string;
  id: string;
  isExternal: boolean;
  label: string;
  target: string;
}

export async function getOurInsights(): Promise<AddactBlogsAndCaseStudyResponse> {
  const data = await client.request<AddactBlogsAndCaseStudyResponse>(ourInsights_Query);
  return data;
}

// Home Query for insights title and description
const home_Query = gql`
  query Home {
    home {
      ourInshightsTitle {
        CommonTitle {
          ... on ComponentBaseTemplateTitleWithDescription {
            Title
            Description
            Link {
              id
              href
              label
              target
              isExternal
              SubDisc
              Icon {
                alternativeText
                height
                url
                width
              }
            }
          }
        }
      }
    }
  }
`;

export interface HomeResponse {
  home: HomeData;
}

export interface HomeData {
  ourInshightsTitle: OurInsightsTitle;
}

export interface OurInsightsTitle {
  CommonTitle: TitleWithDescription[];
}

export interface TitleWithDescription {
  Title: string;
  Description: string;
  Link: Link;
}

export interface Link {
  id: string;
  href: string;
  label: string;
  target: string;
  isExternal: boolean;
  SubDisc: string | null;
  Icon: Icon | null;
}

export interface Icon {
  alternativeText: string | null;
  height: number;
  url: string;
  width: number;
}

export async function getHomeOurInsightsTitle(): Promise<HomeResponse> {
  const data = await client.request<HomeResponse>(home_Query);
  return data;
}
