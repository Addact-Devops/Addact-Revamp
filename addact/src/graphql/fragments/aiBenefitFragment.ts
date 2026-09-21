import { AI_LISTING_CONTEXT_FIELDS, type AIListingContext } from "./aiListingContextFragment";
import { type LinkWithIcon } from "./homeCapabilitiesFragment";

export type { AIListingContext, LinkWithIcon };

export type AIBenefitLink = LinkWithIcon;

export const AI_BENEFIT_FIELDS = `
  title
  serviceList {
    listingContext {
      ${AI_LISTING_CONTEXT_FIELDS}
    }
  }
`;

export type AIBenefitItem = {
  listingContext: AIListingContext;
};

export type AIBenefit = {
  title: string;
  serviceList: AIBenefitItem[];
};


