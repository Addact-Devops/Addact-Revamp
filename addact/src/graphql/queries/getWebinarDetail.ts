import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import client from "../client";
import { Heading, Image } from "@/types/common";
import { SEO_FIELDS } from "../fragments/seoFragment";
import { WEBINAR_HERO_BANNER_FIELDS } from "../fragments/webinarHeroBannerFragment";
import { WEBINAR_CONTENT_FIELDS } from "../fragments/webinarContentFragment";
import { WEBINAR_SPEAKERS_FIELDS } from "../fragments/webinarSpeakersFragment";
import { WEBINAR_HOST_FIELDS } from "../fragments/webinarHostFragment";

const GET_WEBINAR_DETAIL_PAGE = gql`
  ${IMAGE_FRAGMENT}
  ${SHARED_IMAGE_FRAGMENT}
  ${RICHTEXT_FRAGMENT}
  query AddactWebinars($filters: AddactWebinarFiltersInput) {
    addactWebinars(filters: $filters) {
      SEO { ${SEO_FIELDS} }
      ${WEBINAR_HERO_BANNER_FIELDS}
      ${WEBINAR_CONTENT_FIELDS}
      ${WEBINAR_SPEAKERS_FIELDS}
      ${WEBINAR_HOST_FIELDS}
    }
  }
`;

export interface WebinarDetailResponse {
  addactWebinars: {
    SEO?: {
      metaTitle?: string;
      metaDescription?: string;
      ogTitle?: string;
      ogDescription?: string;
      ogImage?: { url: string };
      metaRobots?: string;
      twitterCardTitle?: string;
      canonicalURL?: string;
      structuredData?: string;
      languageTag?: string;
    };
    HeroBanner: {
      BannerTitle: string;
      BannerDescription: string;
      BannerImage: Image;
      PublishDate: string;
      ReadNow: {
        id: string;
        href: string;
        label: string;
        isExternal: boolean;
      };
    }[];
    WebinarContent: Heading[];
    Speakers: {
      Author: {
        AuthorImage: Image;
        AuthorName: string;
        designation: {
          DesignationTitle: string;
        };
      };
    }[];
    Host: {
      Author: {
        AuthorImage: Image;
        AuthorName: string;
        designation: {
          DesignationTitle: string;
        };
      };
    }[];
  }[];
}

export async function getWebinarDetailBySlug(slug: string): Promise<WebinarDetailResponse> {
  const data = await client.request<WebinarDetailResponse>(GET_WEBINAR_DETAIL_PAGE, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });
  return data;
}
