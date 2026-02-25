import { gql } from "graphql-request";
import client from "../client";

const GET_ADDACT_HEADER = gql`
  query AddactHeader {
    addactHeader {
      logo {
        alternativeText
        url
        width
        height
      }
      contactButton {
        title
        image {
          alternativeText
          height
          url
          width
        }
        link {
          id
          href
          label
          target
          isExternal
          SubDisc
          Icon {
            alternativeText
            height
            url
            width
          }
        }
      }
      menu(pagination: { limit: -1 }) {
        id
        link {
          id
          href
          label
          target
          isExternal
          SubDisc
          Icon {
            alternativeText
            url
            width
            height
          }
        }
        card {
          title
          image {
            alternativeText
            url
            width
            height
          }
          link {
            id
            href
            label
            target
            isExternal
            SubDisc
            Icon {
              alternativeText
              width
              url
              height
            }
          }
        }
        subLayers(pagination: { limit: -1 }) {
          id
          link {
            id
            href
            label
            target
            isExternal
            SubDisc
            Icon {
              alternativeText
              width
              url
              height
            }
          }
          card {
            title
            image {
              alternativeText
              width
              url
              height
            }
            link {
              id
              href
              label
              target
              isExternal
              SubDisc
              Icon {
                alternativeText
                width
                url
                height
              }
            }
          }
          subLayers(pagination: { limit: -1 }) {
            id
            link {
              id
              href
              label
              target
              isExternal
              SubDisc
              Icon {
                alternativeText
                height
                url
                width
              }
            }
            card {
              title
              link {
                id
                href
                label
                target
                isExternal
                SubDisc
                Icon {
                  alternativeText
                  height
                  width
                  url
                }
              }
            }
            isCardShow
            isNavHide
          }
          isCardShow
          isNavHide
        }
        isCardShow
        isNavHide
      }
      additionalText
      contactDetails {
        id
        href
        label
        target
        isExternal
        SubDisc
        Icon {
          alternativeText
          url
          width
          height
        }
      }
    }
  }
`;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HeaderImage {
  alternativeText?: string;
  url?: string;
  width?: number;
  height?: number;
}

export interface HeaderLink {
  id?: string;
  href?: string;
  label?: string;
  target?: string;
  isExternal?: boolean;
  SubDisc?: string;
  Icon?: HeaderImage;
}

// Card.link is a single Link (repeatable: false)
export interface HeaderCard {
  title?: string;
  image?: HeaderImage;
  link?: HeaderLink; // SINGLE, not array
}

// Layer 3 — deepest level
export interface HeaderSubLayer2 {
  id?: string;
  link?: HeaderLink;  // SINGLE (repeatable: false)
  card?: HeaderCard;  // SINGLE (repeatable: false)
  isCardShow?: boolean;
  isNavHide?: boolean;
}

// Layer 2
export interface HeaderSubLayer {
  id?: string;
  link?: HeaderLink;           // SINGLE (repeatable: false)
  card?: HeaderCard;           // SINGLE (repeatable: false)
  subLayers?: HeaderSubLayer2[]; // ARRAY (repeatable: true)
  isCardShow?: boolean;
  isNavHide?: boolean;
}

// Layer 1 — top-level menu item
export interface HeaderMenuItem {
  id?: string;
  link?: HeaderLink;           // SINGLE (repeatable: false)
  card?: HeaderCard;           // SINGLE (repeatable: false)
  subLayers?: HeaderSubLayer[]; // ARRAY (repeatable: true)
  isCardShow?: boolean;
  isNavHide?: boolean;
}

// contactButton is a single Card (repeatable: false)
export interface AddactHeaderData {
  logo?: HeaderImage;
  contactButton?: HeaderCard;   // SINGLE (repeatable: false)
  menu?: HeaderMenuItem[];      // ARRAY (repeatable: true)
  additionalText?: string;
  contactDetails?: HeaderLink[]; // ARRAY (repeatable: true)
}

export interface AddactHeaderResponse {
  addactHeader: AddactHeaderData;
}

// ─── Fetcher ──────────────────────────────────────────────────────────────────

export async function getAddactHeaderData(): Promise<AddactHeaderResponse> {
  const data = await client.request<AddactHeaderResponse>(GET_ADDACT_HEADER);
  return data;
}
