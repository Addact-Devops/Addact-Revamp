import { gql } from "graphql-request";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { REUSE_CARD_FRAGMENT } from "../fragments/reuseCardFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { CAREERS_HERO_BANNER_FIELDS, type CareersHeroBanner } from "../fragments/careersHeroBannerFragment";
import { CAREER_CARD_FIELDS, type CareerCardData, type TitleBlock, type CardPromo } from "../fragments/careerCardFragment";
export type { TitleBlock, CardPromo, CareerCardData, CareersHeroBanner };
import { POSITIONS_TITLE_FIELDS, type PositionsTitleData } from "../fragments/positionsTitleFragment";
import { POSITIONS_FIELDS, type PositionType, type PositionItem, type CardInfoType } from "../fragments/positionsFragment";
export type { CardInfoType, PositionType, PositionsTitleData, PositionItem };
import { PAGE_HEADING_FIELDS, type PageHeadingType } from "../fragments/pageHeadingFragment";
export type { PageHeadingType };
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

export type CareersDataResponse = {
  careers: {
    PageHeading?: PageHeadingType["PageHeading"];
    Banner?: CareersHeroBanner;
    Careercard?: CareerCardData;
    PositionsTitle?: PositionsTitleData;
    positions?: PositionItem[];
  };
};

export const getCareersData = async (): Promise<
  Omit<CareersDataResponse["careers"], "positions"> & { positions: PositionType[] }
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
