import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import type { HeadingFragmentType } from "./headingFragment";
import type { LinkFragmentType } from "./linkFragment";
import type { ProcessItem } from "./ourProcessFragment";

export type ServicesDetailProcessTitleItem = HeadingFragmentType | { code?: string; message?: string };

export type ServicesDetailProcessItem = {
  Title?: ServicesDetailProcessTitleItem[];
  link?: LinkFragmentType;
  ProcessData?: ProcessItem[];
};

export type ServicesDetailProcessType = {
  our_process?: ServicesDetailProcessItem;
};

export interface OurProcessData {
  Title: HeadingFragmentType[];
  ProcessData: {
    id: string;
    Title: string;
    Description: string;
  }[];
}


export const SERVICES_DETAIL_PROCESS_FIELDS = `
  our_process: ourProcess {
    Title {
      ${BLOG_CONTENT_HEADINGS_FIELDS}
      ... on Error {
        code
        message
      }
    }
    link {
      ...LinkFields
    }
    ProcessData {
      ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
    }
  }
`;

