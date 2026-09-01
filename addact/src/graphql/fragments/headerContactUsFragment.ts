export const HEADER_CONTACT_US_FIELDS = `
  contact_us {
    ... on ComponentSharedLink {
      id
      href
      label
      target
      isExternal
    }
  }
`;
