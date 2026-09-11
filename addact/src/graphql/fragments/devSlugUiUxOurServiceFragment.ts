import type { CmsListingType } from "./cmsListingFragment";
import type { OurServiceType } from "./ourServiceFragment";
import type { UiUxListingType } from "./uiUxListingFragment";

export type DevSlugUiUxOurServiceUnion = CmsListingType | OurServiceType | UiUxListingType;

export type DevSlugUiUxOurServiceType = {
  ourService?: DevSlugUiUxOurServiceUnion[];
};

export const DEV_SLUG_UI_UX_OUR_SERVICE_FIELDS = `
  ourService {
    ... on ComponentHomeCmsListing { ...CmsListingFields }
    ... on ComponentHomeServiceList { ...OurServiceFields }
    ... on ComponentHomeUiUxLisitng { ...UiUxListingFields }
  }
`;

