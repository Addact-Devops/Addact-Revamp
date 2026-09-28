import { gql } from "graphql-request";
import { IMAGE_FRAGMENT, ImageFragmentType } from "../fragments/imageFragment";
import { LINK_FRAGMENT, LinkFragmentType } from "../fragments/linkFragment";
import { RICHTEXT_FRAGMENT, RichtextFragmentType } from "../fragments/richtextFragment";
import { SEO_FIELDS, type SeoType as SEO, type ThankYouPageSEO } from "../fragments/seoFragment";
export type { SEO, ThankYouPageSEO };
import { type Heading, HEADING_INLINE_FIELDS, HeadingFragmentType } from "../fragments/headingFragment";
import client from "../client";

const GET_THANK_YOU_PAGE = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${RICHTEXT_FRAGMENT}
  query ThankyouPages($filters: ThankyouPageFiltersInput) {
    thankyouPages(filters: $filters) {
      ReferenceTitle
      Slug
      SEO {
        ${SEO_FIELDS}
      }
       Content {
          ... on ComponentBaseTemplateRichtext { ...RichtextFields }
          ...LinkFields
          ${HEADING_INLINE_FIELDS}
        }
       AnimationVideo {
    ...ImageFields
  }
    }
  }
`;
export type AnimationVideo = ImageFragmentType;

export type ThankYouAnimationVideoType = {
  AnimationVideo?: AnimationVideo;
};

export interface ThankYouPageItem {
  ReferenceTitle: string;
  Slug: string;
  Content: Content[];
  AnimationVideo: AnimationVideo;
  SEO?: ThankYouPageSEO | null;
}
export type ThankYouContentItem = HeadingFragmentType | LinkFragmentType | RichtextFragmentType;

export type ThankYouContentType = {
  Content?: ThankYouContentItem[];
};

export type Content = {
  id: string;
  h1?: Heading["h1"];
  Richtext?: RichtextFragmentType["Richtext"];
  href?: string;
  label?: string;
  target?: string;
  isExternal?: boolean;
};

export interface ThankYouPageResponse {
  thankyouPages: ThankYouPageItem[];
}

export async function getThankYouPageBySlug(slug: string): Promise<ThankYouPageResponse> {
  // Ensure slug starts with leading slash because data has leading slash in Slug field
  const cleanSlug = slug.startsWith("/") ? slug : `/${slug}`;

  const data = await client.request<ThankYouPageResponse>(GET_THANK_YOU_PAGE, {
    filters: {
      Slug: {
        eq: cleanSlug,
      },
    },
  });

  return data;
}
