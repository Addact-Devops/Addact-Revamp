import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { GALLERY_TITLES_FRAGMENT } from "../fragments/galleryTitlesFragment";
export type { GalleryTitlesType } from "../fragments/galleryTitlesFragment";
import { CAREER_GALLERY_SECTION_FIELDS, type CareerGallerySectionType } from "../fragments/careerGallerySectionFragment";
import { CAREER_GALLERY_CATEGORIES_FIELDS, type CareerGalleryCategoriesType } from "../fragments/careerGalleryCategoriesFragment";
export type { CareerGallerySectionType, CareerGalleryCategoriesType };

import client from "../client";

const endpoint = process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT;

if (!endpoint) {
  throw new Error("Missing NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT in environment variables.");
}

const query = gql`
  ${IMAGE_FRAGMENT}
  ${GALLERY_TITLES_FRAGMENT}
  query CareerGalleryData {
    ${CAREER_GALLERY_SECTION_FIELDS}
    ${CAREER_GALLERY_CATEGORIES_FIELDS}
  }
`;

export type GalleryResponse = CareerGallerySectionType & CareerGalleryCategoriesType;

export const getCareerGalleryData = async (): Promise<GalleryResponse> => {
  const res = await client.request<GalleryResponse>(query);
  return res;
};
