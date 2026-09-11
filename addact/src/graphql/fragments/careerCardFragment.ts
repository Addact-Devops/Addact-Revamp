import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { BLOG_CONTENT_ERROR_FIELDS } from "./blogContentErrorFragment";
import { PROMO_INNER_FIELDS } from "./promoFragment";
import { Image, Link } from "@/types/common";

export const CAREER_CARD_FIELDS = `
  Title {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    ${BLOG_CONTENT_ERROR_FIELDS}
  }
  GlobalCard {
    ... on ComponentBaseTemplatePromo {
      ${PROMO_INNER_FIELDS}
    }
    ${BLOG_CONTENT_ERROR_FIELDS}
  }
`;

export type TitleBlock =
  | { id: string; h1: string }
  | { id: string; h2: string }
  | { id: string; h3: string }
  | { id: string; h4?: string; h5?: string; h6?: string }
  | { id: string; Richtext: string };

export type CardPromo = {
  id: string;
  Title?: string;
  Description?: string;
  Image?: Image;
  Link?: Link;
};

export type CareerCardData = {
  Title: TitleBlock[];
  GlobalCard: CardPromo[];
};

export type CareerCardType = {
  Careercard: CareerCardData;
};

