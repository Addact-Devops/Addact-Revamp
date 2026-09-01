export const AI_SOLVE_PROBLEM_FIELDS = `
  title
  aiSolveProblemList {
    list {
      title
      image {
        ...ImageFields
      }
      bgImage {
        ...ImageFields
      }
    }
  }
`;
