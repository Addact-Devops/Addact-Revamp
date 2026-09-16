import { TITLE_DESCRIPTION_LOWER_FIELDS } from "./titleDescriptionFragment";
import { Image } from "@/types/common";
import { type LinkWithIcon } from "./homeCapabilitiesFragment";

export const AI_LISTING_CONTEXT_FIELDS = `
  ${TITLE_DESCRIPTION_LOWER_FIELDS}
  image {
    ...ImageFields
  }
  link {
    ...LinkFields
  }
`;

export type AIListingContext = {
  title: string;
  description: string;
  image: Image | null;
  link: LinkWithIcon;
};

