// Re-using PageHeadingType from pageHeadingFragment to avoid duplicate type definitions
import { type PageHeadingType } from "./pageHeadingFragment";

export const CONTACT_US_PAGE_HEADING_FIELDS = `
  PageHeading {
    PageTitle
    Slug
  }
`;

export type ContactUsPageHeadingData = PageHeadingType["PageHeading"];

export type ContactUsPageHeadingType = {
  PageHeading: ContactUsPageHeadingData;
};
