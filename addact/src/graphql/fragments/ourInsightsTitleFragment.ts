import { Image, Link } from "@/types/common";

export const OUR_INSIGHTS_TITLE_FIELDS = `
  ourInshightsTitle {
    CommonTitle {
      ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
    }
  }
`;

export type TitleWithDescription = {
  Title: string;
  Description: string;
  Link: Link & {
    SubDisc: string | null;
    Icon: Image | null;
  };
};

export type OurInsightsTitle = {
  CommonTitle: TitleWithDescription[];
};

export type OurInshightsTitle = OurInsightsTitle;

export type OurInsightsTitleType = {
  ourInshightsTitle: OurInsightsTitle;
};
