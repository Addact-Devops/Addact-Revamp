import { Image } from "@/types/common";

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

export type AISolveProblem = {
  title: string;
  aiSolveProblemList: {
    list: {
      title: string;
      image: Image | null;
      bgImage: Image | null;
    };
  }[];
};

