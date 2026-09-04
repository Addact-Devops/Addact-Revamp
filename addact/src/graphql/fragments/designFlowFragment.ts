import { DESIGN_FLOW_TABS_FIELDS } from "./designFlowTabsFragment";

export const DESIGN_FLOW_FIELDS = `
  designFlow {
    title
    description
    ${DESIGN_FLOW_TABS_FIELDS}
  }
`;
