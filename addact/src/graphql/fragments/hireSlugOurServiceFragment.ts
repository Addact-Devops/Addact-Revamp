import type { OurServiceType } from "./ourServiceFragment";

export const HIRE_SLUG_OUR_SERVICE_FIELDS = `
  ourService {
    ... on ComponentHomeServiceList { ...OurServiceFields }
  }
`;

export type HireSlugOurServiceType = {
  ourService: OurServiceType[];
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


