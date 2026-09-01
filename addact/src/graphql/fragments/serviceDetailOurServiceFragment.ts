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
        ... on ComponentHeadingsH1 {
          id
          h1
        }
        ... on ComponentHeadingsH2 {
          id
          h2
        }
        ... on ComponentHeadingsH3 {
          id
          h3
        }
        ... on ComponentHeadingsH4 {
          id
          h5
        }
        ... on ComponentHeadingsH5 {
          id
          h5
        }
        ... on ComponentHeadingsH6 {
          id
          h6
        }
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
          id
          href
          label
          target
          isExternal
        }
      }
      Description
    }
  }
`;
