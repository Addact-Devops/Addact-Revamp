export const VIDEO_LIST_FIELDS = `
  VideoList(pagination: { limit: -1 }) {
    Content {
      Title
      Description
      Link {
        ...LinkFields
      }
    }
    Iframe {
      Richtext
    }
  }
`;

export type VideoContentType = {
  Content: {
    Title: string;
    Description: string;
    Link: {
      isExternal: boolean;
      href: string;
      label: string;
    };
  };
  Iframe: {
    Richtext: string;
  };
};

export type VideoPageResponse = {
  videoListing: {
    PageHeading: {
      PageTitle: string;
      Slug: string;
    };
    banner: {
      Banner: {
        BannerTitle?: string;
        BannerDescription?: string;
        BannerImage?: {
          url?: string;
          width?: number;
          height?: number;
          alternativeText?: string | null;
        };
      }[];
    };
    VideoList: VideoContentType[];
  };
};
