import { ImageFragmentType } from "./imageFragment";

export type DesignFlowGifType = {
  gif?: ImageFragmentType;
};

export const DESIGN_FLOW_GIF_FIELDS = `
  gif {
    ...ImageFields
  }
`;

