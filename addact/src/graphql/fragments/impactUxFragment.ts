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

