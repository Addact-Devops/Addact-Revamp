import { gql } from "graphql-request";
import { SEO_FIELDS } from "./seoFragment";
import { BANNER_SECTION_FIELDS } from "./bannerSectionFragment";
import { CTA_FIELDS } from "./ctaFragment";
import { FAQ_FIELDS } from "./faqFragment";
import { WHY_ADDACT_FIELDS } from "./whyAddactFragment";
import { OUR_INSIGHTS_TITLE_FIELDS } from "./ourInsightsTitleFragment";
import { TECH_STACK_FIELDS } from "./techStackFragment";
import { INDUSTRY_FIELDS } from "./industryFragment";
import { OUR_PROCESS_FIELDS } from "./ourProcessFragment";

export const CMS_DETAIL_ALL_FIELDS_FRAGMENT = gql`
  fragment CmsDetailAllFields on CmsDetail {
    SEO {
      ${SEO_FIELDS}
    }
    ${BANNER_SECTION_FIELDS}
    cta {
      ${CTA_FIELDS}
    }
    ${WHY_ADDACT_FIELDS}
    faq {
      ${FAQ_FIELDS}
    }
    ${OUR_INSIGHTS_TITLE_FIELDS}
    techStack {
      ${TECH_STACK_FIELDS}
    }
    ourService {
      ... on ComponentHomeSitecoreListing {
        ...SitecoreListingFields
      }
      ... on ComponentHomeServiceList {
        ...OurServiceFields
      }
    }
    industry {
      ${INDUSTRY_FIELDS}
    }
    ourprocess {
      ${OUR_PROCESS_FIELDS}
    }
  }
`;
