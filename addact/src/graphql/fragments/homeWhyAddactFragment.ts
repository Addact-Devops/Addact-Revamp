import { gql } from "graphql-request";
import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { PROMO_INNER_FIELDS } from "./promoFragment";
import { Heading } from "@/types/common";

export const HOME_WHY_ADDACT_FRAGMENT = gql`
  fragment HomeWhyAddactFields on Home {
    whyaddact {
      Title {
        ${BLOG_CONTENT_HEADINGS_FIELDS}
      }
      pageReference
      GlobalCard {
        ... on ComponentBaseTemplatePromo {
          ${PROMO_INNER_FIELDS}
        }
      }
    }
  }
`;

export type GlobalCard2Image = {
  alternativeText: string | null;
  height: number;
  name?: string;
  url: string;
  width: number;
};

export type GlobalCard2Link = {
  id: string;
  href: string;
  label: string | null;
  target?: string | null;
  isExternal: boolean;
  SubDisc?: string | null;
  Icon?: GlobalCard2Image | null;
};

export type GlobalCard2 = {
  id?: string;
  Title: string;
  Description: string;
  Image: GlobalCard2Image;
  Link?: GlobalCard2Link | null;
};

export type Whyaddact = {
  Title: Heading[];
  pageReference?: string;
  GlobalCard: GlobalCard2[];
};

export type HomeWhyAddactType = {
  whyaddact: Whyaddact;
};


