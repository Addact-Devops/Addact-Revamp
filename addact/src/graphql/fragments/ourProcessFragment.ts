import { Heading, Link } from "@/types/common";

export const OUR_PROCESS_FIELDS = `
  Title {
    ... on ComponentHeadingsH6 { ...Heading6Fields }
    ... on ComponentHeadingsH5 { ...Heading5Fields }
    ... on ComponentHeadingsH4 { ...Heading4Fields }
    ... on ComponentHeadingsH3 { ...Heading3Fields }
    ... on ComponentHeadingsH2 { ...Heading2Fields }
    ... on ComponentHeadingsH1 { ...HeadingFields }
    ... on Error {
      code
      message
    }
  }
  ProcessData {
    ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
  }
`;

import { type LinkWithIcon } from "./homeCapabilitiesFragment";

export type ProcessItem = {
  id?: string;
  Title: string;
  Description: string;
  Link?: LinkWithIcon;
};

export type ProcessDataItem = ProcessItem;

// Re-using Link from @/types/common to avoid duplicate LinkProps definition
export type LinkProps = Link;

export type OurProcess = {
  Title: Heading[];
  ProcessData: ProcessDataItem[];
  link?: LinkProps;
};

export type OurProcessDetails = OurProcess;

export type OurProcessData = {
  home: {
    ourprocess: OurProcessDetails;
  };
};
