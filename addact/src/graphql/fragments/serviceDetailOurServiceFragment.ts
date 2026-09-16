import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { TITLE_DESCRIPTION_FIELDS, ID_TITLE_DESCRIPTION_FIELDS, type TitleDescriptionType, type IdTitleDescriptionType } from "./titleDescriptionFragment";
import type { HeadingFragmentType } from "./headingFragment";
import type { RichtextFragmentType } from "./richtextFragment";
import type { LinkFragmentType } from "./linkFragment";

export type EnterprisesBrandsTitleItem = HeadingFragmentType | RichtextFragmentType;

export type ForEnterprisesBrandsType = {
  GlobalCard?: IdTitleDescriptionType[];
  Title?: EnterprisesBrandsTitleItem[];
};

export type TeamFeatureCardType = IdTitleDescriptionType & {
  Link?: LinkFragmentType;
};

export type TeamFeatureType = {
  Cards?: TeamFeatureCardType[];
  Description?: string;
};

export type ServiceDetailOurServiceItem = {
  Titeldescription?: TitleDescriptionType;
  FirstTabDisplayName?: string;
  SecondTabDisplayName?: string;
  ForEnterprisesBrands?: ForEnterprisesBrandsType;
  ReferenceTitle?: string;
  team_feature?: TeamFeatureType;
};

export type ServiceDetailOurServiceType = {
  our_service?: ServiceDetailOurServiceItem;
};

export interface OurServiceData {
  Titeldescription?: {
    Description: string;
    Title: string;
  }[];

  FirstTabDisplayName: string;
  SecondTabDisplayName: string;

  ForEnterprisesBrands: {
    GlobalCard: {
      id: string;
      Title: string;
      Description: string;
      Image?: {
        alternativeText: string | null;
        height: number;
        name: string;
        url: string;
        width: number;
      };
      Link?: {
        id: string;
        href: string;
        label: string;
        target: string;
        isExternal: boolean;
      };
      sub_service_page?: {
        Slug: string;
      };
    }[];

    Title: {
      id?: string;
      h2: string;
    }[];
  };

  ReferenceTitle: string;

  team_feature: {
    documentId?: string;
    ReferenceTitle?: string;
    Description: string;
    Cards: {
      id: string;
      Title: string;
      Description: string;
      Link?: {
        id: string;
        href: string;
        label: string;
        target: string;
        isExternal: boolean;
      };
    }[];
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  };
}


export const SERVICE_DETAIL_OUR_SERVICE_FIELDS = `
  our_service {
    Titeldescription {
      ${TITLE_DESCRIPTION_FIELDS}
    }
    FirstTabDisplayName
    SecondTabDisplayName
    ForEnterprisesBrands {
      GlobalCard {
        ... on ComponentBaseTemplatePromo {
          ${ID_TITLE_DESCRIPTION_FIELDS}
        }
      }
      Title {
        ${BLOG_CONTENT_HEADINGS_FIELDS}
        ... on ComponentBaseTemplateRichtext { ...RichtextFields }
      }
    }
    ReferenceTitle
    team_feature {
      Cards {
        ${ID_TITLE_DESCRIPTION_FIELDS}
        Link {
          ...LinkFields
        }
      }
      Description
    }
  }
`;


