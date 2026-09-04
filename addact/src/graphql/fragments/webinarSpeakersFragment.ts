export const WEBINAR_SPEAKERS_FIELDS = `
  Speakers {
    Author {
      AuthorImage {
        ...ImageFields
      }
      AuthorName
      designation {
        DesignationTitle
      }
    }
  }
`;
