import { DESIGN_FLOW_TABS_FIELDS } from "./designFlowTabsFragment";
import { TITLE_DESCRIPTION_LOWER_FIELDS } from "./titleDescriptionFragment";

export const DESIGN_FLOW_FIELDS = `
  designFlow {
    ${TITLE_DESCRIPTION_LOWER_FIELDS}
    ${DESIGN_FLOW_TABS_FIELDS}
  }
`;

