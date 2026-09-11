import { CLIENT_TESTIMONIALS_ITEM_FIELDS } from "./clientTestimonialsItemFragment";

export const CLIENT_TESTIMONIAL_FIELDS = `
  client_testimonial {
    Title
    ${CLIENT_TESTIMONIALS_ITEM_FIELDS}
  }
`;

