import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { TITLE_DESCRIPTION_IMAGE_FIELDS } from "./aboutUsBrandValueFragment";
import type { HeadingFragmentType } from "./headingFragment";
import type { RichtextFragmentType } from "./richtextFragment";
import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";

export type WhyAddactTitleItem =
  | HeadingFragmentType
  | RichtextFragmentType
  | { code?: string; message?: string };

export type WhyAddactPromoItem = {
  Title?: string;
  Description?: string;
  Image?: ImageFragmentType;
};

export type ServiceDetailWhyAddactItem = {
  Title?: WhyAddactTitleItem[];
  GlobalCard?: WhyAddactPromoItem[];
};

export type ServiceDetailWhyAddactType = {
  why_addact?: ServiceDetailWhyAddactItem;
};

export interface WhyAddact {
  Title: HeadingFragmentType[];
  GlobalCard: {
    id?: string;
    Title: string;
    Description: string;
    Image: ImageFragmentType;
    Link?: LinkFragmentType | null;
  }[];
  pageReference?: string;
}

export const SERVICE_DETAIL_WHY_ADDACT_FIELDS = `
  why_addact {
    Title {
      ${BLOG_CONTENT_HEADINGS_FIELDS}
      ... on ComponentBaseTemplateRichtext { ...RichtextFields }
      ... on Error {
        code
        message
      }
    }
    GlobalCard {
      ... on ComponentBaseTemplatePromo {
        ${TITLE_DESCRIPTION_IMAGE_FIELDS}
      }
    }
  }
`;
