import { gql } from "graphql-request";
import client from "../client";

const GET_BLOG_BY_SLUG = gql`
    query GetBlogBySlug($filters: AddactBlogFiltersInput) {
        addactBlogs(filters: $filters) {
            Slug
            HeadingSection {
                ... on ComponentBaseTemplateCommonSection {
                    PageTitle
                    BlogTag {
                        Category {
                            CategoryTitle
                        }
                    }
                }
            }
            BlogBanner {
                ... on ComponentBlogHeroBannerBlogHeroBanner {
                    BannerTitle
                    BannerDescription
                    BannerImage {
                        url
                        width
                        height
                        name
                        alternativeText
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
            BlogContent {
                ... on ComponentHeadingsH1 {
                    id
                    h1
                }
                ... on ComponentHeadingsH2 {
                    id
                    h2
                }
                ... on ComponentHeadingsH3 {
                    id
                    h3
                }
                ... on ComponentHeadingsH4 {
                    id
                    h5
                }
                ... on ComponentHeadingsH5 {
                    id
                    h5
                }
                ... on ComponentHeadingsH6 {
                    id
                    h6
                }
                ... on ComponentSharedImage {
                    id
                    Image {
                        url
                        width
                        height
                        name
                        alternativeText
                    }
                }
                ... on ComponentSharedLink {
                    id
                    href
                    label
                    isExternal
                    target
                }
                ... on ComponentBaseTemplateRichtext {
                    id
                    Richtext
                }
                ... on Error {
                    code
                    message
                }
            }
            author {
                Author {
                    AuthorName
                    AuthorDescription
                    AuthorImage {
                        url
                        width
                        height
                        name
                        alternativeText
                    }
                    designation {
                        DesignationTitle
                    }
                }
            }
            contactcard {
                ContactCard {
                    ... on ComponentCardCard {
                        id
                        CardTitle
                        CardDescription
                        CardLink {
                            id
                            href
                            label
                            isExternal
                            target
                        }
                    }
                }
            }
            similarstorytitle {
                CommonTitle {
                    ... on ComponentBaseTemplateTitleWithDescription {
                        Title
                        Description
                    }
                }
            }
            similarBlogs {
                BlogBanner {
                    ... on ComponentBlogHeroBannerBlogHeroBanner {
                        BannerTitle
                        BannerDescription
                        BannerImage {
                            url
                            width
                            height
                            name
                            alternativeText
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
            socialicons {
                SocialIcon {
                    ... on ComponentBaseTemplateLinkImage {
                        Title
                        ClassName
                        Links {
                            id
                            href
                            label
                            isExternal
                            target
                        }
                        Icons {
                            url
                            width
                            height
                            name
                            alternativeText
                        }
                        HoverIcon {
                            url
                            width
                            height
                            name
                            alternativeText
                        }
                    }
                }
            }
        }
    }
`;

type BlogBySlugResponse = {
    addactBlogs: {
        Slug: string;
        HeadingSection?: { PageTitle?: string }[];
        BlogBanner?: {
            BannerTitle?: string;
            BannerDescription?: string;
            BannerImage?: {
                url: string;
                width: number;
                height: number;
                name: string;
                alternativeText?: string;
            };
            blogcategory?: {
                Category: {
                    id: string;
                    CategoryTitle: string;
                };
            };
        }[];
        BlogContent?: any[];
        author?: {
            Author?: {
                AuthorName: string;
                AuthorDescription: string;
                AuthorImage?: {
                    url: string;
                    width: number;
                    height: number;
                    name: string;
                    alternativeText?: string;
                };
                designation?: {
                    DesignationTitle: string;
                };
            };
        };

        contactcard?: {
            ContactCard?: {
                id: string;
                CardTitle: string;
                CardDescription: string;
                CardLink?: {
                    href: string;
                    label: string;
                    isExternal: boolean;
                    target: string;
                };
            };
        };
    }[];
};

// Function to fetch a blog by slug
export async function getBlogBySlug(slug: string) {
    const data = await client.request<BlogBySlugResponse>(GET_BLOG_BY_SLUG, {
        filters: {
            Slug: {
                eq: `/${slug}`,
            },
        },
    });

    return data.addactBlogs?.[0] || null;
}
