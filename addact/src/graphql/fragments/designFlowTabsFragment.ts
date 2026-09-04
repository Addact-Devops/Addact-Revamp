import { DESIGN_FLOW_GIF_FIELDS } from "./designFlowGifFragment";
import { DESIGN_FLOW_ICON_FIELDS } from "./designFlowIconFragment";

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
