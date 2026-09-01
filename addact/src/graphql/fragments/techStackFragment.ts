export const TECH_STACK_FIELDS = `
  title
  description
  tab {
    category {
      categoryTitle
    }
    tabContent {
      title
      logo {
        ...ImageFields
      }
    }
  }
`;
