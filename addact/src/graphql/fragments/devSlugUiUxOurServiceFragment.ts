export const DEV_SLUG_UI_UX_OUR_SERVICE_FIELDS = `
  ourService {
    ... on ComponentHomeCmsListing { ...CmsListingFields }
    ... on ComponentHomeServiceList { ...OurServiceFields }
    ... on ComponentHomeUiUxLisitng { ...UiUxListingFields }
  }
`;
