export const CLIENT_TESTIMONIALS_FIELDS = `
  clientTestimonials {
    Title
    Item {
      quote
      author_name
      author_position
      rating
    }
    bgText
    rating
    ratingImage {
      alternativeText
      height
      url
      width
    }
  }
`;
