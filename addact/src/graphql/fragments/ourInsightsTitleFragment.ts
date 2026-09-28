import type { TitleWithDescriptionFragmentType } from "./titleWithDescriptionFragment";
import type { LinkFragmentType } from "./linkFragment";

export const OUR_INSIGHTS_TITLE_FIELDS = `
  ourInshightsTitle {
    CommonTitle {
      ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
    }
  }
`;

export type TitleWithDescription = Required<Pick<TitleWithDescriptionFragmentType, "Title" | "Description">> & {
  Link?: LinkFragmentType;
};

export type OurInsightsTitle = {
  CommonTitle: TitleWithDescription[];
};

export type OurInshightsTitle = OurInsightsTitle;

export type OurInsightsTitleType = {
  ourInshightsTitle: OurInsightsTitle;
};
