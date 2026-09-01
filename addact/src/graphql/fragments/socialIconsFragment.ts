export const SOCIAL_ICONS_FIELDS = `
  social_icons {
    SocialIcon {
      ... on ComponentBaseTemplateLinkImage { ...LinkImageFields }
    }
  }
`;
