import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";
import { type ImageFragmentType } from "./imageFragment";
// Re-using LinkWithIcon from homeCapabilitiesFragment to avoid duplicate type definitions
import { type LinkWithIcon } from "./homeCapabilitiesFragment";

export const AI_BENEFIT_FIELDS = `
  title
  serviceList {
    listingContext {
      ${AI_LISTING_CONTEXT_FIELDS}
    }
  }
`;

export type { LinkWithIcon };

export type AIBenefitLink = {
  id: string;
  href: string;
  label: string | null;
  target?: string | null;
  isExternal: boolean;
  SubDisc: string | null;
  Icon: ImageFragmentType | null;
};

export type AIBenefit = {
  title: string;
  serviceList: {
    listingContext: {
      title: string;
      description: string;
      image: ImageFragmentType;
      link: AIBenefitLink;
    };
  }[];
};


