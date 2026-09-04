import { gql } from "graphql-request";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { REUSE_CARD_FRAGMENT } from "../fragments/reuseCardFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { CAREERS_HERO_BANNER_FIELDS } from "../fragments/careersHeroBannerFragment";
import { CAREER_CARD_FIELDS } from "../fragments/careerCardFragment";
import { POSITIONS_TITLE_FIELDS } from "../fragments/positionsTitleFragment";
import { POSITIONS_FIELDS } from "../fragments/positionsFragment";
import { PAGE_HEADING_FIELDS } from "../fragments/pageHeadingFragment";
import client from "../client";

const endpoint = process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT;

if (!endpoint) {
  throw new Error("Missing NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT in environment variables.");
}

const query = gql`
  ${LINK_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${REUSE_CARD_FRAGMENT}
  ${RICHTEXT_FRAGMENT}
  query CareersData {
    careers {
      ${PAGE_HEADING_FIELDS}
      Banner { ${CAREERS_HERO_BANNER_FIELDS} }
      Careercard { ${CAREER_CARD_FIELDS} }
      ${POSITIONS_TITLE_FIELDS}
      ${POSITIONS_FIELDS}
    }
  }
`;

export type ImageType = {
  url: string;
  name?: string;
  width?: number;
  height?: number;
  alternativeText?: string;
};

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
  Image?: ImageType;
  Link?: {
    id: string;
    href: string;
    label: string;
    target: string;
    isExternal: boolean;
  };
};

export type CardInfoType = {
  AerrowIcon?: ImageType;
  HoverIcon?: ImageType;
  Icon?: ImageType;
  LogoLink?: {
    id: string;
    href: string;
    label: string;
    target: string;
    isExternal: boolean;
  };
  LogoTitle?: string;
  TitleIcon?: {
    Title?: string;
    Icon: ImageType;
  }[];
};

export type PositionType = {
  id: string;
  EventTitle: string;
  CardInfo: CardInfoType[];
};

type CareersDataResponse = {
  careers: {
    PageHeading?: {
      PageTitle?: string;
      Slug?: string;
    };
    Banner?: {
      Banner?: {
        BannerTitle?: string;
        BannerDescription?: string;
        show_searchbox?: boolean;
        BannerImage: ImageType;
      }[];
    };
    Careercard?: {
      Title: TitleBlock[];
      GlobalCard: CardPromo[];
    };
    PositionsTitle?: {
      Title?: string;
      Description?: string;
    };
    positions?: Omit<PositionType, "id">[];
  };
};

export const getCareersData = async (): Promise<
  CareersDataResponse["careers"] & { positions: PositionType[] }
> => {
  const res = await client.request<CareersDataResponse>(query);
  if (!res.careers) {
    return {
      positions: [],
    };
  }
  const positionsWithId = res.careers.positions?.map((p, index) => ({
    ...p,
    id: String(index),
  })) as PositionType[];

  return {
    ...res.careers,
    positions: positionsWithId,
  };
};
