import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { TITLE_DESCRIPTION_IMAGE_FIELDS } from "./aboutUsBrandValueFragment";
import { BLOG_CONTENT_ERROR_FIELDS, type ContentError } from "./blogContentErrorFragment";
import { type TitleDescriptionType, type IdTitleDescriptionType } from "./titleDescriptionFragment";
import type { HeadingFragmentType } from "./headingFragment";
import type { RichtextFragmentType } from "./richtextFragment";
import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";

export type WhyAddactTitleItem =
  | HeadingFragmentType
  | RichtextFragmentType
  | Partial<ContentError>;

export type WhyAddactPromoItem = TitleDescriptionType & {
  Image?: ImageFragmentType;
};

export type ServiceDetailWhyAddactItem = {
  Title?: WhyAddactTitleItem[];
  GlobalCard?: WhyAddactPromoItem[];
};

export type ServiceDetailWhyAddactType = {
  why_addact?: ServiceDetailWhyAddactItem;
};

export type WhyAddactCard = Required<IdTitleDescriptionType> & {
  Image: ImageFragmentType;
  Link?: LinkFragmentType | null;
};

export interface WhyAddact {
  Title: HeadingFragmentType[];
  GlobalCard: WhyAddactCard[];
  pageReference?: string;
}

export const SERVICE_DETAIL_WHY_ADDACT_FIELDS = `
  why_addact {
    Title {
      ${BLOG_CONTENT_HEADINGS_FIELDS}
      ... on ComponentBaseTemplateRichtext { ...RichtextFields }
      ${BLOG_CONTENT_ERROR_FIELDS}
    }
    GlobalCard {
      ... on ComponentBaseTemplatePromo {
        ${TITLE_DESCRIPTION_IMAGE_FIELDS}
      }
    }
  }
`;
