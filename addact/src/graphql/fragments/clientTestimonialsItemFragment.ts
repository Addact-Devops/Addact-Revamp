export const CLIENT_TESTIMONIAL_ITEM_FIELDS = `
  quote
  author_name
  author_position
  rating
`;

export const CLIENT_TESTIMONIALS_ITEM_FIELDS = `
  Item {
    ${CLIENT_TESTIMONIAL_ITEM_FIELDS}
  }
`;

export type TestimonialItem = {
  quote: {
    type: string;
    children: {
      text: string;
      type: string;
    }[];
  }[];
  author_name: string;
  author_position: string;
  rating: string;
};

export type ClientTestimonialsItemType = {
  Item: TestimonialItem[];
};
