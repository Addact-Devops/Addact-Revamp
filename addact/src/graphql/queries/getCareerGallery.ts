import { gql } from "graphql-request";
import { GALLERY_TITLES_FRAGMENT } from "../fragments/galleryTitlesFragment";
import { CAREER_GALLERY_SECTION_FIELDS } from "../fragments/careerGallerySectionFragment";
import { CAREER_GALLERY_CATEGORIES_FIELDS } from "../fragments/careerGalleryCategoriesFragment";
import client from "../client";

const endpoint = process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT;

if (!endpoint) {
  throw new Error("Missing NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT in environment variables.");
}

const query = gql`
  ${GALLERY_TITLES_FRAGMENT}
  query CareerGalleryData {
    ${CAREER_GALLERY_SECTION_FIELDS}
    ${CAREER_GALLERY_CATEGORIES_FIELDS}
  }
`;

type GalleryCategory = {
  Name: string;
  Images: {
    Image: {
      url: string;
      alternativeText: string | null;
    };
    Year: number | null;
  }[];
};

type GallerySection = {
  Title?: string;
  SubTitle?: string;
};

type GalleryResponse = {
  careers: {
    Gallery?: GallerySection[];
  };
  galleryCategories: GalleryCategory[];
};

export const getCareerGalleryData = async (): Promise<GalleryResponse> => {
  const res = await client.request<GalleryResponse>(query);
  return res;
};
