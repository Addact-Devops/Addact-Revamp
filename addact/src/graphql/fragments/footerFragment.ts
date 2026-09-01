export const FOOTER_FIELDS = `
  Logo {
    Image {
      alternativeText
      height
      name
      url
      width
    }
  }
  BackGroundImage {
    Image {
      alternativeText
      height
      name
      url
      width
    }
  }
  BackGroundImageMobile {
    Image {
      alternativeText
      height
      name
      url
      width
    }
  }
  AddressInformationMobileBgImg {
    Image {
      alternativeText
      height
      name
      url
      width
    }
  }
  AddressInformation {
    ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
  }

  footerlinks {
    NavLink {
      ... on ComponentBaseTemplateTitle { ...TitleFields }
      ... on ComponentSharedLink {
        id
        href
        label
        target
        isExternal
      }
    }
  }
  milestonestitle {
    CommonTitle {
      ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
    }
  }
  milestonesimage {
    ... on ComponentSharedImage { ...SharedImageFields }
  }
  CopyrightText
  SiteSlog
  socialMedia {
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
`;
