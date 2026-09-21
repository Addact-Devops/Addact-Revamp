import { Heading, Link } from "@/types/common";
import { HEADING_SELECTION_FIELDS } from "./headingFragment";

export const OUR_PROCESS_FIELDS = `
  Title {
    ${HEADING_SELECTION_FIELDS}
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
