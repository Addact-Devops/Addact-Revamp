import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { TITLE_DESCRIPTION_FIELDS, ID_TITLE_DESCRIPTION_FIELDS, type TitleDescriptionType, type IdTitleDescriptionType } from "./titleDescriptionFragment";
import { RICHTEXT_FIELDS, type RichtextFragmentType } from "./richtextFragment";
import { TEAM_FEATURE_FIELDS } from "./serviceListOurServiceFragment";
import type { HeadingFragmentType } from "./headingFragment";
import type { LinkFragmentType } from "./linkFragment";
import type { ImageFragmentType } from "./imageFragment";
import type { SlugType } from "@/types/common";


export type EnterprisesBrandsTitleItem = HeadingFragmentType | RichtextFragmentType;

export type TeamFeatureCardType = Required<IdTitleDescriptionType> & {
  Link?: LinkFragmentType;
};

export type GlobalCardItem = TeamFeatureCardType & {
  Image?: ImageFragmentType;
  sub_service_page?: Required<SlugType>;
};

export type ForEnterprisesBrandsType = {
  GlobalCard?: GlobalCardItem[];
  Title?: HeadingFragmentType[];
};

export type TeamFeatureType = {
  documentId?: string;
  ReferenceTitle?: string;
  Description?: string;
  Cards?: TeamFeatureCardType[];
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

export type ServiceDetailOurServiceItem = {
  Titeldescription?: Required<TitleDescriptionType>[];
  FirstTabDisplayName?: string;
  SecondTabDisplayName?: string;
  ForEnterprisesBrands?: ForEnterprisesBrandsType;
  ReferenceTitle?: string;
  team_feature?: TeamFeatureType;
};

export type ServiceDetailOurServiceType = {
  our_service?: ServiceDetailOurServiceItem;
};

export type OurServiceData = ServiceDetailOurServiceItem;

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
        ${RICHTEXT_FIELDS}
      }
    }
    ReferenceTitle
    ${TEAM_FEATURE_FIELDS}
  }
`;




