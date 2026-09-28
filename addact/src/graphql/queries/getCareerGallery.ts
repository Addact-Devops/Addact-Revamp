import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { GALLERY_TITLES_FRAGMENT, type GalleryTitlesType } from "../fragments/galleryTitlesFragment";
export type { GalleryTitlesType };
import {
  CAREER_GALLERY_CATEGORIES_FIELDS,
  type CareerGalleryCategoriesType,
} from "../fragments/careerGalleryCategoriesFragment";

import client from "../client";
export type GallerySection = GalleryTitlesType;

export type CareerGallerySectionType = {
  careers: {
    Gallery?: GallerySection[];
  };
};

const endpoint = process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT;

if (!endpoint) {
  throw new Error("Missing NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT in environment variables.");
}

const query = gql`
  ${IMAGE_FRAGMENT}
  ${GALLERY_TITLES_FRAGMENT}
  query CareerGalleryData {
     careers {
    Gallery {
      ... on ComponentAddactComponentGalleryTitles { ...GalleryTitlesFields }
    }
  }
    ${CAREER_GALLERY_CATEGORIES_FIELDS}
  }
`;

export type GalleryResponse = CareerGallerySectionType & CareerGalleryCategoriesType;

export const getCareerGalleryData = async (): Promise<GalleryResponse> => {
  const res = await client.request<GalleryResponse>(query);
  return res;
};
