import { OUR_SERVICE_FIELDS, type OurServiceType } from "./ourServiceFragment";
import type { TitleDescriptionType, IdTitleDescriptionType } from "./titleDescriptionFragment";
import type { HeadingFragmentType } from "./headingFragment";
import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";
import type { SlugType } from "@/types/common";

export const HIRE_SLUG_OUR_SERVICE_FIELDS = OUR_SERVICE_FIELDS;



export type HireSlugOurServiceType = {
  ourService: OurServiceType[];
};

export type GlobalCardItem = IdTitleDescriptionType & {
  Image?: ImageFragmentType;
  Link?: LinkFragmentType;
  sub_service_page?: Required<SlugType>;
};

export type TeamFeatureCardItem = IdTitleDescriptionType & {
  Link?: LinkFragmentType;
};

export interface OurServiceData {
  Titeldescription?: TitleDescriptionType[];

  FirstTabDisplayName: string;
  SecondTabDisplayName: string;

  ForEnterprisesBrands: {
    GlobalCard: GlobalCardItem[];
    Title: HeadingFragmentType[];
  };

  ReferenceTitle: string;

  team_feature: {
    documentId?: string;
    ReferenceTitle?: string;
    Description: string;
    Cards: TeamFeatureCardItem[];
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  };
}


