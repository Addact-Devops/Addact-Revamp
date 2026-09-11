import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { TITLE_FRAGMENT } from "../fragments/titleFragment";
import { FOOTER_FIELDS, type Footer } from "../fragments/footerFragment";
export type { Footer, FooterImage, FooterImageBlock, FooterAddressInformation, FooterLinksGroup, FooterNavLink, FooterMilestonesTitle, FooterSocialLink } from "../fragments/footerFragment";
import client from "../client";

const GET_FOOTER = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${SHARED_IMAGE_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  ${TITLE_FRAGMENT}
  query Footers {
    footers {
      ${FOOTER_FIELDS}
    }
  }
`;

export type FooterResponse = {
  footers: Footer[];
};

// Footer and supporting types moved to footerFragment.ts

// ✅ Fetch footer data safely
export async function getFooterData() {
  const data = await client.request<FooterResponse>(GET_FOOTER);

  const footer = data.footers?.[0];

  // ✅ Clean up invalid AddressInformation entries (e.g., nulls or bad shapes)
  if (footer?.AddressInformation) {
    footer.AddressInformation = footer.AddressInformation.filter(
      (item) => item && typeof item.Title === "string",
    );
  }

  return footer || null;
}
