import type { OurServiceType } from "./ourServiceFragment";
import type { TitleDescriptionType, IdTitleDescriptionType } from "./titleDescriptionFragment";
import type { HeadingFragmentType } from "./headingFragment";
import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";

export const HIRE_SLUG_OUR_SERVICE_FIELDS = `
  ourService {
    ... on ComponentHomeServiceList { ...OurServiceFields }
  }
`;

export type HireSlugOurServiceType = {
  ourService: OurServiceType[];
};

export type GlobalCardItem = IdTitleDescriptionType & {
  Image?: ImageFragmentType;
  Link?: LinkFragmentType;
  sub_service_page?: {
    Slug: string;
  };
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


