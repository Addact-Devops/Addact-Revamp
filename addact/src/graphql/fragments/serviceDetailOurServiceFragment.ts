import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { TITLE_DESCRIPTION_FIELDS, ID_TITLE_DESCRIPTION_FIELDS } from "./titleDescriptionFragment";

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

