import { gql } from "graphql-request";



export const REUSE_CARD_FRAGMENT = gql`
  fragment ReuseCardFields on ComponentReuseCard {
    AerrowIcon {
      ...ImageFields
    }
    HoverIcon {
      ...ImageFields
    }
    Icon {
      ...ImageFields
    }
    LogoLink {
      ...LinkFields
    }
    LogoTitle
    TitleIcon {
      Icon {
        ...ImageFields
      }
      Title
    }
  }
`;
