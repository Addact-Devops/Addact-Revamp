import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { COMMON_SECTION_FRAGMENT } from "../fragments/commonSectionFragment";
import { SEO_FIELDS } from "../fragments/seoFragment";
import { EVENT_BLOG_HERO_BANNER_FIELDS } from "../fragments/eventBlogHeroBannerFragment";
import { EVENT_CONTENT_FIELDS } from "../fragments/eventContentFragment";
import { EVENT_HEADING_SECTION_FIELDS } from "../fragments/eventHeadingSectionFragment";
import { EVENT_CONTACT_US_CARD_FIELDS } from "../fragments/eventContactUsCardFragment";
import client from "../client";
import { Heading, Image } from "@/types/common";

const GET_EVENT_DETAIL_PAGE = gql`
  ${IMAGE_FRAGMENT}
  ${SHARED_IMAGE_FRAGMENT}
  ${RICHTEXT_FRAGMENT}
  ${COMMON_SECTION_FRAGMENT}
  query AddactsEvents($filters: AddactEventsFiltersInput) {
    addactsEvents(filters: $filters) {
      ${EVENT_BLOG_HERO_BANNER_FIELDS}
      ${EVENT_CONTENT_FIELDS}
      ${EVENT_HEADING_SECTION_FIELDS}
      ${EVENT_CONTACT_US_CARD_FIELDS}
      SEO { ${SEO_FIELDS} }
    }
  }
`;

export interface EventDetailResponse {
  addactsEvents: {
    EventBanner: {
      BannerDescription: string;
      BannerImage: Image;
      BannerTitle: string;
      PublishDate: string;
      eventLocation: string;
    }[];
    EventContent: Heading[];
    HeadingSection: {
      PageTitle: string;
    }[];
    contact_us_card: {
      ButtonLabel: string;
      CompanyName: string;
      EmailLabel: string;
      NameLable: string;
      RequirementsLabel: string;
      RecipientEmails: string;
      PhoneLabel: string;
      Form: {
        Title: string;
        Description: string;
      }[];
    };
    SEO?: {
      metaTitle?: string;
      metaDescription?: string;
      ogTitle?: string;
      ogDescription?: string;
      ogImage?: { url?: string };
      metaRobots?: string;
      twitterCardTitle?: string;
      canonicalURL?: string;
      structuredData?: Record<string, unknown>;
      languageTag?: string;
    } | null;
  }[];
}

export async function getEventDetailBySlug(slug: string): Promise<EventDetailResponse> {
  const data = await client.request<EventDetailResponse>(GET_EVENT_DETAIL_PAGE, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });
  return data;
}
