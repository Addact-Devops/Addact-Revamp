import type { LinkFragmentType } from "./linkFragment";

export type FooterSocialMediaType = {
  socialMedia?: LinkFragmentType[];
};

export const FOOTER_SOCIAL_MEDIA_FIELDS = `
  socialMedia {
    ...LinkFields
  }
`;


