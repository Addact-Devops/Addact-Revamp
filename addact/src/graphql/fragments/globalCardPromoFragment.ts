export const GLOBAL_CARD_PROMO_FIELDS = `
  GlobalCard {
    ... on ComponentBaseTemplatePromo {
      Title
      Description
      Image {
        ...ImageFields
      }
    }
  }
`;

