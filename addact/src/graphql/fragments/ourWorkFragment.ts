import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";
import { CMS_SERVICE_VARIANT_FIELDS, type CmsServiceVariantType } from "./cmsServiceVariantFragment";
import type { Image } from "@/types/common";
import type { LinkWithIcon } from "./homeCapabilitiesFragment";

export const OUR_WORK_FIELDS = `
  ourWork {
    serviceTitle
    ${CMS_SERVICE_VARIANT_FIELDS}
    isCarousel
    serviceList {
      listingContext {
        id
        ${AI_LISTING_CONTEXT_FIELDS}
      }
      tagLine {
        Title
      }
    }
  }
`;

export type OurWorkServiceListItem = {
  listingContext: {
    id: string;
    title: string | null;
    description: string | null;
    image: Image | null;
    link: LinkWithIcon | null;
  } | null;
  tagLine: {
    Title: string;
  }[];
};

export type OurWork = CmsServiceVariantType & {
  serviceTitle: string | null;
  isCarousel: boolean | null;
  serviceList: OurWorkServiceListItem[];
};




