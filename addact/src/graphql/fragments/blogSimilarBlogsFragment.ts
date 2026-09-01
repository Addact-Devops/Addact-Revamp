export const BLOG_SIMILAR_BLOGS_FIELDS = `
  similarBlogs {
    BlogBanner {
      ... on ComponentBlogHeroBannerBlogHeroBanner {
        BannerTitle
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
  }
`;
