export const DM_SLUG_OUR_SERVICE_FIELDS = `
  ourService {
    ... on ComponentHomeServiceList { ...OurServiceFields }
    ... on ComponentHomeUiUxLisitng { ...UiUxListingFields }
  }
`;
