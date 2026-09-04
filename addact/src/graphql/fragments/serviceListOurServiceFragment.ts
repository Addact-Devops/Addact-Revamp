import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";

export const SERVICE_LIST_OUR_SERVICE_FIELDS = `
  our_service {
    FirstTabDisplayName
    SecondTabDisplayName
    ForEnterprisesBrands {
      GlobalCard {
        ... on ComponentBaseTemplatePromo {
          id
          Title
          Description
          Image {
            ...ImageFields
          }
          Link {
            ...LinkFields
          }
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
        Description
        Title
        id
        Link {
          ...LinkFields
        }
      }
    }
  }
`;
