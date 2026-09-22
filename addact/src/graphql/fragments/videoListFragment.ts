import { TITLE_DESCRIPTION_FIELDS, type TitleDescriptionType } from "./titleDescriptionFragment";
import type { BaseHeading } from "./baseHeadingFragment";
import type { BannerSection } from "./componentBannerFieldsFragment";
import type { Link } from "@/types/common";

export const VIDEO_LIST_FIELDS = `
  VideoList(pagination: { limit: -1 }) {
    Content {
      ${TITLE_DESCRIPTION_FIELDS}
      Link {
        ...LinkFields
      }
    }
    Iframe {
      Richtext
    }
  }
`;

export type VideoContentItem = Required<TitleDescriptionType> & {
  Link: Link;
};

export type VideoContentType = {
  Content: VideoContentItem;
  Iframe: {
    Richtext: string;
  };
};

export type VideoPageResponse = {
  videoListing: {
    PageHeading: BaseHeading;
    banner: BannerSection;
    VideoList: VideoContentType[];
  };
};

export type { BaseHeading, BannerSection };

