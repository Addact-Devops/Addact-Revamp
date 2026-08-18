import { Image } from "@/types/common";
import client from "../client";
import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { HERO_BANNER_FRAGMENT } from "../fragments/heroBannerFragment";

const GET_PRESS_RELEASE_LIST_PAGE = gql`
  ${IMAGE_FRAGMENT}
  ${HERO_BANNER_FRAGMENT}
  query PressRelease {
    pressRelease {
      PageHeading {
        PageTitle
        Slug
      }
      HeroBanner {
        Banner {
          ... on ComponentBannerBanner {
            ...HeroBannerFields
          }
        }
      }
    }
    addactPressReleases {
      Slug
      HeroBanner {
        ... on ComponentBlogHeroBannerBlogHeroBanner {
          ...HeroBannerFields
        }
      }
      PressReleaseSummary
    }
  }
`;

export interface PressReleaseResponse {
  pressRelease: {
    PageHeading: {
      PageTitle: string;
      Slug: string;
    };
    HeroBanner: {
      Banner: {
        BannerDescription: string;
        BannerTitle: string;
        BannerImage: Image;
      }[];
    };
  };
  addactPressReleases: {
    Slug: string;
    HeroBanner: {
      BannerTitle: string;
      BannerImage: Image;
    }[];
    PressReleaseSummary: string;
  }[];
}

export async function getPressReleaseData(): Promise<PressReleaseResponse> {
  const data = await client.request<PressReleaseResponse>(GET_PRESS_RELEASE_LIST_PAGE);
  return data;
}
