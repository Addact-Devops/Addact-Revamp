import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";

export type WebinarContentItem = {
  id?: string;
  Richtext?: string;
  h1?: string;
  h2?: string;
  h3?: string;
  h4?: string;
  h5?: string;
  h6?: string;
  href?: string;
  label?: string;
  target?: string;
  isExternal?: boolean;
  Image?: {
    alternativeText?: string;
    name?: string;
    height?: number;
    url?: string;
    width?: number;
  };
};

export type WebinarContentType = {
  WebinarContent?: WebinarContentItem[];
};

export const WEBINAR_CONTENT_FIELDS = `
  WebinarContent {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    ... on ComponentSharedImage { ...SharedImageFields }
    ...LinkFields
  }
`;

