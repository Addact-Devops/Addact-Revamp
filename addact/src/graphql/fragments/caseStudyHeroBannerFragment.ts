export const CASE_STUDY_HERO_BANNER_FIELDS = `
  HeroBanner {
    ... on ComponentBlogHeroBannerBlogHeroBanner {
      id
      BannerTitle
      BannerDescription
      PublishDate
      BannerImage {
        width
        name
        height
        url
      }
      blogcategory {
        Category {
          CategoryTitle
        }
      }
      author {
        Author {
          AuthorName
          designation {
            DesignationTitle
          }
        }
      }
      ReadNow {
        id
        href
        label
        target
        isExternal
      }
    }
  }
`;
