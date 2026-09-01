export const OUR_INSIGHTS_BLOG_FIELDS = `
  addactBlogs(pagination: { page: 1, pageSize: 2 }, sort: ["publishedAt:desc"]) {
    documentId
    Slug
    createdAt
    HeadingSection {
      ... on ComponentBaseTemplateCommonSection { ...CommonSectionFields }
    }
    BlogBanner {
      ... on ComponentBlogHeroBannerBlogHeroBanner {
        id
        BannerImage {
          width
          url
          name
          height
          alternativeText
        }
        BannerDescription
        BannerTitle
        PublishDate
        ReadNow {
          href
          id
          isExternal
          label
          target
        }
      }
    }
  }
`;
