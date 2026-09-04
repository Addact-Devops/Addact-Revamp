import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";

export const SERVICE_DETAIL_OUR_SERVICE_FIELDS = `
  our_service {
    Titeldescription {
      Description
      Title
    }
    FirstTabDisplayName
    SecondTabDisplayName
    ForEnterprisesBrands {
      GlobalCard {
        ... on ComponentBaseTemplatePromo {
          Description
          Title
          id
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
        Description
        Title
        id
        Link {
          ...LinkFields
        }
      }
      Description
    }
  }
`;

