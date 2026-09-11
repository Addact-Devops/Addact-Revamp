import { CLIENT_TESTIMONIALS_ITEM_FIELDS, type TestimonialItem } from "./clientTestimonialsItemFragment";

export const CLIENT_TESTIMONIALS_FIELDS = `
  clientTestimonials {
    Title
    ${CLIENT_TESTIMONIALS_ITEM_FIELDS}
    bgText
    rating
    ratingImage {
      ...ImageFields
    }
  }
`;

export type ClientTestimonialItem = {
  Title: string;
  Item: TestimonialItem[];
  bgText: string;
  rating: string;
  ratingImage: {
    alternativeText: string;
    height: number;
    url: string;
    width: number;
  };
};

export type ClientTestimonialResponse = {
  clientTestimonials: ClientTestimonialItem[];
};
