import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { BLOG_CONTENT_ERROR_FIELDS, type ContentError } from "./blogContentErrorFragment";
import { COMPONENT_PROMO_FIELDS, type PromoFragmentType } from "./promoFragment";
import type { HeadingFragmentType } from "./headingFragment";
import type { RichtextFragmentType } from "./richtextFragment";

export const CAREER_CARD_FIELDS = `
  Title {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    ${BLOG_CONTENT_ERROR_FIELDS}
  }
  GlobalCard {
    ${COMPONENT_PROMO_FIELDS}
    ${BLOG_CONTENT_ERROR_FIELDS}
  }
`;

export type TitleBlock = HeadingFragmentType & RichtextFragmentType & Partial<ContentError>;

export type CardPromo = Partial<PromoFragmentType> & {
  id: string;
};

export type CareerCardData = {
  Title: TitleBlock[];
  GlobalCard: CardPromo[];
};

export type CareerCardType = {
  Careercard: CareerCardData;
};

