import { ImageFragmentType } from "./imageFragment";

export type DesignFlowGifType = {
  gif?: ImageFragmentType;
};

export type DesignFlowIconType = {
  icon?: ImageFragmentType;
};

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
      gif {
        ...ImageFields
      }
      icon {
        ...ImageFields
      }
    }
  }
`;
