export const BLOG_HERO_BANNER_FIELDS = `
  BlogBanner {
    ... on ComponentBlogHeroBannerBlogHeroBanner {
      BannerTitle
      BannerDescription
      BannerImage {
        alternativeText
        height
        name
        url
        width
      }
      PublishDate
      ReadNow {
        id
        href
        label
        target
        isExternal
      }
      author {
        Author {
          AuthorName
        }
      }
      blogcategory {
        Category {
          CategoryTitle
        }
      }
    }
  }
`;
