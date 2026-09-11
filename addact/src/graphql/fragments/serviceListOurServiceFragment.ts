import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { PROMO_INNER_FIELDS, type PromoFragmentType } from "./promoFragment";
import { ID_TITLE_DESCRIPTION_FIELDS, type IdTitleDescriptionType } from "./titleDescriptionFragment";
import type { HeadingFragmentType } from "./headingFragment";
import type { LinkFragmentType } from "./linkFragment";

export type SubServicePage = {
  Slug?: string;
};

export type EnterprisePromoCard = PromoFragmentType & {
  sub_service_page?: SubServicePage;
};

export type ForEnterprisesBrandsType = {
  GlobalCard?: EnterprisePromoCard[];
  Title?: HeadingFragmentType[];
};

export type TeamFeatureCardType = IdTitleDescriptionType & {
  Link?: LinkFragmentType;
};

export type TeamFeatureType = {
  Description?: string;
  Cards?: TeamFeatureCardType[];
};

export type ServiceListOurServiceItem = {
  FirstTabDisplayName?: string;
  SecondTabDisplayName?: string;
  ForEnterprisesBrands?: ForEnterprisesBrandsType;
  team_feature?: TeamFeatureType;
};

export type ServiceListOurServiceType = {
  our_service?: ServiceListOurServiceItem;
};

export const SERVICE_LIST_OUR_SERVICE_FIELDS = `
  our_service {
    FirstTabDisplayName
    SecondTabDisplayName
    ForEnterprisesBrands {
      GlobalCard {
        ... on ComponentBaseTemplatePromo {
          ${PROMO_INNER_FIELDS}
          sub_service_page {
            Slug
          }
        }
      }
      Title {
        ${BLOG_CONTENT_HEADINGS_FIELDS}
      }
    }
    team_feature {
      Description
      Cards {
        ${ID_TITLE_DESCRIPTION_FIELDS}
        Link {
          ...LinkFields
        }
      }
    }
  }
`;

