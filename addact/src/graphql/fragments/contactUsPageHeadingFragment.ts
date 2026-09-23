// Re-using PAGE_HEADING_FIELDS and PageHeadingType from pageHeadingFragment to avoid duplication
import { PAGE_HEADING_FIELDS, type PageHeadingType } from "./pageHeadingFragment";

export const CONTACT_US_PAGE_HEADING_FIELDS = PAGE_HEADING_FIELDS;

export type ContactUsPageHeadingData = PageHeadingType["PageHeading"];

export type ContactUsPageHeadingType = {
  PageHeading: ContactUsPageHeadingData;
};

