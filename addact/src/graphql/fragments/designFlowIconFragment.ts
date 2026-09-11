import { ImageFragmentType } from "./imageFragment";

export type DesignFlowIconType = {
  icon?: ImageFragmentType;
};

export const DESIGN_FLOW_ICON_FIELDS = `
  icon {
    ...ImageFields
  }
`;

