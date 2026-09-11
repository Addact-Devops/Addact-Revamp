import { Image } from "@/types/common";

export const IMPACT_UX_FIELDS = `
  impactUx {
    title
    beforeText
    afterText
    beforeImage {
      ...ImageFields
    }
    afterImage {
      ...ImageFields
    }
    desktopFrame {
      ...ImageFields
    }
    mobileFrame {
      ...ImageFields
    }
  }
`;

export type ImpactUx = {
  title: string;
  beforeText: string;
  afterText: string;
  beforeImage: Image | null;
  afterImage: Image | null;
  desktopFrame: Image | null;
  mobileFrame: Image | null;
};


