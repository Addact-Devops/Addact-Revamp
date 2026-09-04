export const POSITIONS_FIELDS = `
  positions {
    EventTitle
    CardInfo {
      ... on ComponentReuseCard { ...ReuseCardFields }
    }
  }
`;
