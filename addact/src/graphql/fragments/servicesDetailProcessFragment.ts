import { OUR_PROCESS_FIELDS, type OurProcess, type ProcessItem } from "./ourProcessFragment";
import type { HeadingFragmentType } from "./headingFragment";
import type { ContentError } from "./blogContentErrorFragment";

export type ServicesDetailProcessTitleItem = HeadingFragmentType | Partial<ContentError>;

export type ServicesDetailProcessItem = OurProcess;

export type ServicesDetailProcessType = {
  our_process?: ServicesDetailProcessItem;
};

export interface OurProcessData {
  Title: HeadingFragmentType[];
  ProcessData: ProcessItem[];
}

export type { OurProcess, ProcessItem };

export const SERVICES_DETAIL_PROCESS_FIELDS = `
  our_process: ourProcess {
    ${OUR_PROCESS_FIELDS}
    link {
      ...LinkFields
    }
  }
`;


