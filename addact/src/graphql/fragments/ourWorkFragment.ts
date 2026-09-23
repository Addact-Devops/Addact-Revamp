import { LISTING_CONTEXT_FIELDS, type AIListingContext } from "./aiListingContextFragment";
import { CMS_SERVICE_VARIANT_FIELDS, type CmsServiceVariantType } from "./cmsServiceVariantFragment";
import { type TitleDescriptionLowerType } from "./titleDescriptionFragment";
import type { TitleFragmentType } from "./titleFragment";
import type { Image } from "@/types/common";
import type { LinkWithIcon } from "./homeCapabilitiesFragment";

export const OUR_WORK_FIELDS = `
  ourWork {
    serviceTitle
    ${CMS_SERVICE_VARIANT_FIELDS}
    isCarousel
    serviceList {
      ${LISTING_CONTEXT_FIELDS}
      tagLine {
        Title
      }
    }
  }
`;

export type OurWorkTagLine = Required<TitleFragmentType>;

export type OurWorkListingContext = Partial<AIListingContext> &
  TitleDescriptionLowerType & {
    id?: string;
    image?: Image | null;
    link?: LinkWithIcon | null;
  };


export type OurWorkServiceListItem = {
  listingContext: OurWorkListingContext | null;
  tagLine: OurWorkTagLine[];
};

export type OurWork = CmsServiceVariantType & {
  serviceTitle: string | null;
  isCarousel: boolean | null;
  serviceList: OurWorkServiceListItem[];
};





