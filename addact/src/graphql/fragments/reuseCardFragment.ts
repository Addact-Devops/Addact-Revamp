import { gql } from "graphql-request";
import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";

export type TitleIconItem = {
  Icon?: ImageFragmentType;
  Title?: string;
};

export type ReuseCardFragmentType = {
  AerrowIcon?: ImageFragmentType;
  HoverIcon?: ImageFragmentType;
  Icon?: ImageFragmentType;
  LogoLink?: LinkFragmentType;
  LogoTitle?: string;
  TitleIcon?: TitleIconItem | TitleIconItem[];
};

export const REUSE_CARD_INNER_FIELDS = `
  AerrowIcon {
    ...ImageFields
  }
  HoverIcon {
    ...ImageFields
  }
  Icon {
    ...ImageFields
  }
  LogoLink {
    ...LinkFields
  }
  LogoTitle
  TitleIcon {
    Icon {
      ...ImageFields
    }
    Title
  }
`;

export const REUSE_CARD_FIELDS = `
  ... on ComponentReuseCard {
    ${REUSE_CARD_INNER_FIELDS}
  }
`;

export const REUSE_CARD_FRAGMENT = gql`
  fragment ReuseCardFields on ComponentReuseCard {
    ${REUSE_CARD_INNER_FIELDS}
  }
`;


