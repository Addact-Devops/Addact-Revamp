import { DESIGN_FLOW_GIF_FIELDS, type DesignFlowGifType } from "./designFlowGifFragment";
import { DESIGN_FLOW_ICON_FIELDS, type DesignFlowIconType } from "./designFlowIconFragment";

export type FlowItemType = DesignFlowGifType &
  DesignFlowIconType & {
    title?: string;
    information?: string;
  };

export type DesignFlowTabType = {
  tabTitle?: string;
  flow?: FlowItemType[];
};

export type DesignFlowTabsType = {
  tabsAndFlow?: DesignFlowTabType[];
};

export const DESIGN_FLOW_TABS_FIELDS = `
  tabsAndFlow {
    tabTitle
    flow {
      title
      information
      ${DESIGN_FLOW_GIF_FIELDS}
      ${DESIGN_FLOW_ICON_FIELDS}
    }
  }
`;

