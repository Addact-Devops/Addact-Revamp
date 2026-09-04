import { ABOUT_US_WE_ARE_ADDACT_NUMBER_FIELDS } from "./aboutUsWeAreAddactNumberFragment";

export const ABOUT_US_WE_ARE_ADDACT_FIELDS = `
  WeAreAddact {
    Image {
          ...ImageFields
        }
    SubTitle
    Title
    Content
    ${ABOUT_US_WE_ARE_ADDACT_NUMBER_FIELDS}
  }
`;
