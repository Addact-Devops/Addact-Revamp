import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";
import { Image } from "@/types/common";

export const OUR_WORK_FIELDS = `
  ourWork {
    serviceTitle
    serviceVariant {
      variant
    }
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
    link: {
      id: string;
      href: string;
      label: string | null;
      target: string;
      isExternal: boolean;
      SubDisc: string | null;
      Icon: Image | null;
    } | null;
  } | null;
  tagLine: {
    Title: string;
  }[];
};

export type OurWork = {
  serviceTitle: string | null;
  serviceVariant: {
    variant: string;
  } | null;
  isCarousel: boolean | null;
  serviceList: OurWorkServiceListItem[];
};


