import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import type { HeadingFragmentType } from "./headingFragment";
import type { PromoFragmentType } from "./promoFragment";

export type ServiceListWhyAddactItem = {
  Title?: HeadingFragmentType[];
  GlobalCard?: PromoFragmentType[];
  pageReference?: string;
};

export type ServiceListWhyAddactType = {
  why_addact?: ServiceListWhyAddactItem;
};

export interface WhyAddact {
  Title: HeadingFragmentType[];
  GlobalCard: PromoFragmentType[];
  pageReference?: string;
}

export const SERVICE_LIST_WHY_ADDACT_FIELDS = `
  why_addact {
    Title {
      ${BLOG_CONTENT_HEADINGS_FIELDS}
    }
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
    pageReference
  }
`;

