export const EVENT_HEADING_SECTION_FIELDS = `
  HeadingSection {
    ... on ComponentBaseTemplateCommonSection { ...CommonSectionFields }
  }
`;

export type EventHeadingSectionItem = {
  PageTitle: string;
};

export type EventHeadingSectionType = {
  HeadingSection: EventHeadingSectionItem[];
};
