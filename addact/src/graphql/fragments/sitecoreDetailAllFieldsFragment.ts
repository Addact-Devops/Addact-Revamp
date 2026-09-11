import { gql } from "graphql-request";
import { SEO_FIELDS, type SeoType } from "./seoFragment";
import { BANNER_SECTION_FIELDS, type BannerSection } from "./bannerSectionFragment";
import { CTA_FIELDS, type CTAFragmentType } from "./ctaFragment";
import { FAQ_FIELDS, type FAQFragmentType } from "./faqFragment";
import { WHY_ADDACT_FIELDS, type WhyAddactType } from "./whyAddactFragment";
import { OUR_INSIGHTS_TITLE_FIELDS, type OurInsightsTitleType } from "./ourInsightsTitleFragment";
import { TECH_STACK_FIELDS, type TechStackType } from "./techStackFragment";
import { INDUSTRY_FIELDS, type IndustryType } from "./industryFragment";
import { OUR_PROCESS_FIELDS, type OurProcess } from "./ourProcessFragment";
import type { OurServiceType } from "./ourServiceFragment";

export type SitecoreDetailAllFieldsType = BannerSection &
  WhyAddactType &
  OurInsightsTitleType &
  TechStackType &
  IndustryType & {
    SEO?: SeoType;
    cta?: CTAFragmentType;
    faq?: FAQFragmentType;
    ourService?: OurServiceType[];
    ourprocess?: OurProcess;
  };

export const SITECORE_DETAIL_ALL_FIELDS_FRAGMENT = gql`
  fragment SitecoreDetailAllFields on SitecoreDetail {
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

