import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
// Re-using Whyaddact and GlobalCard2 from homeWhyAddactFragment to avoid duplicate type definitions
import { type Whyaddact, type GlobalCard2 } from "./homeWhyAddactFragment";

export const WHY_WORK_WITH_US_FIELDS = `
  Title {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
  }
  pageReference
  GlobalCard {
    ... on ComponentBaseTemplatePromo {
      id
      Title
      Description
      Image {
        ...ImageFields
      }
      Link {
        ...LinkFields
      }
    }
  }
`;

export type { Whyaddact, GlobalCard2 };

export type WhyWorkWithUsType = {
  whyaddact: Whyaddact;
};
