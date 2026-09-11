import type { OurServiceType } from "./ourServiceFragment";
import type { UiUxListingType } from "./uiUxListingFragment";

export type DmSlugOurServiceUnion = OurServiceType | UiUxListingType;

export type DmSlugOurServiceType = {
  ourService?: DmSlugOurServiceUnion[];
};

export const DM_SLUG_OUR_SERVICE_FIELDS = `
  ourService {
    ... on ComponentHomeServiceList { ...OurServiceFields }
    ... on ComponentHomeUiUxLisitng { ...UiUxListingFields }
  }
`;

