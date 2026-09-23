import { AI_SERVICE_LIST_FIELDS, type ServiceListItem, type ServiceList } from "./aiServiceListFragment";
import type { AIListingContext } from "./aiListingContextFragment";
import type { LinkWithIcon } from "./homeCapabilitiesFragment";

export type { AIListingContext, LinkWithIcon };

export type AIBenefitLink = LinkWithIcon;

export const AI_BENEFIT_FIELDS = `
  title
  ${AI_SERVICE_LIST_FIELDS}
`;

export type AIBenefitItem = ServiceListItem;

export type AIBenefit = ServiceList & {
  title: string;
};


