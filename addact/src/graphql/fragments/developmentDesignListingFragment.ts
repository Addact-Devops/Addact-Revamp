import { gql } from "graphql-request";
import { CMS_SERVICE_VARIANT_FIELDS } from "./cmsServiceVariantFragment";
import { AI_SERVICE_LIST_FIELDS } from "./aiServiceListFragment";

export const DEVELOPMENT_DESIGN_LISTING_FRAGMENT = gql`
  fragment DevelopmentDesignListingFields on ComponentHomeDevelopmentAndDesignListing {
    id
    serviceTitle
    ${CMS_SERVICE_VARIANT_FIELDS}
    ${AI_SERVICE_LIST_FIELDS}
    isCarousel
  }
`;
