import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { PROMO_INNER_FIELDS } from "./promoFragment";
import { ID_TITLE_DESCRIPTION_FIELDS } from "./titleDescriptionFragment";

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
