import { CLIENT_TESTIMONIALS_ITEM_FIELDS } from "./clientTestimonialsItemFragment";

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
