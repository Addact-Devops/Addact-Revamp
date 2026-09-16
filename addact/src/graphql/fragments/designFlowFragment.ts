import { DESIGN_FLOW_TABS_FIELDS } from "./designFlowTabsFragment";
import { TITLE_DESCRIPTION_LOWER_FIELDS } from "./titleDescriptionFragment";
import { Image } from "@/types/common";

export const DESIGN_FLOW_FIELDS = `
  designFlow {
    ${TITLE_DESCRIPTION_LOWER_FIELDS}
    ${DESIGN_FLOW_TABS_FIELDS}
  }
`;

export type DesignFlowItem = {
  title: string;
  information: string;
  gif: Image | null;
  icon: Image | null;
};

export type DesignFlowTab = {
  tabTitle: string;
  flow: DesignFlowItem[];
};

export type DesignFlow = {
  title: string;
  description: string;
  tabsAndFlow: DesignFlowTab[];
};


