import { Heading, Link } from "@/types/common";
import { HEADING_SELECTION_FIELDS } from "./headingFragment";
import { BLOG_CONTENT_ERROR_FIELDS } from "./blogContentErrorFragment";
import { COMPONENT_TITLE_WITH_DESCRIPTION_FIELDS } from "./titleWithDescriptionFragment";
import { type TitleDescriptionType } from "./titleDescriptionFragment";
import { type LinkWithIcon } from "./homeCapabilitiesFragment";

export const OUR_PROCESS_FIELDS = `
  Title {
    ${HEADING_SELECTION_FIELDS}
    ${BLOG_CONTENT_ERROR_FIELDS}
  }
  ProcessData {
    ${COMPONENT_TITLE_WITH_DESCRIPTION_FIELDS}
  }
`;

export type ProcessItem = Required<TitleDescriptionType> & {
  id?: string;
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

