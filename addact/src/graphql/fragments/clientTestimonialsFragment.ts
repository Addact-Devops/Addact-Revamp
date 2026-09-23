import { CLIENT_TESTIMONIALS_ITEM_FIELDS, type TestimonialItem } from "./clientTestimonialsItemFragment";
import type { ImageFragmentType } from "./imageFragment";

export const CLIENT_TESTIMONIALS_INNER_FIELDS = `
  Title
  ${CLIENT_TESTIMONIALS_ITEM_FIELDS}
  bgText
  rating
  ratingImage {
    ...ImageFields
  }
`;

export const CLIENT_TESTIMONIALS_FIELDS = `
  clientTestimonials {
    ${CLIENT_TESTIMONIALS_INNER_FIELDS}
  }
`;

export type ClientTestimonialItem = {
  Title: string;
  Item: TestimonialItem[];
  bgText: string;
  rating: string;
  ratingImage: ImageFragmentType;
};

export type ClientTestimonialResponse = {
  clientTestimonials: ClientTestimonialItem[];
};

