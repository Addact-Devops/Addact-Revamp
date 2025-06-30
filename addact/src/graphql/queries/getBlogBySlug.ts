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
            BlogContent {
                ... on ComponentHeadingsH6 {
                    id
                    h6
                }
                ... on ComponentHeadingsH5 {
                    id
                    h5
                }
                ... on ComponentHeadingsH4 {
                    id
                    h5
                }
                ... on ComponentHeadingsH3 {
                    id
                    h3
                }
                ... on ComponentHeadingsH2 {
                    id
                    h2
                }
                ... on ComponentHeadingsH1 {
                    id
                    h1
                }
                ... on ComponentSharedImage {
                    id
                    Image {
                        alternativeText
                        name
                        height
                        url
                        width
                    }
                }
                ... on ComponentSharedLink {
                    id
                    href
                    label
                    target
                    isExternal
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
                        alternativeText
                        height
                        width
                        url
                        name
                    }
                    designation {
                        DesignationTitle
                    }
                }
            }

            similarstorytitle {
                CommonTitle {
                    ... on ComponentBaseTemplateTitleWithDescription {
                        Description
                        Title
                    }
                }
            }
            similarBlogs {
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
                            target
                            isExternal
                        }
                        Icons {
                            alternativeText
                            name
                            height
                            url
                            width
                        }
                        HoverIcon {
                            alternativeText
                            name
                            height
                            url
                            width
                        }
                    }
                }
            }
            card {
                CardTitle
                CardDescription
                CardLink {
                    id
                    href
                    label
                    target
                    isExternal
                }
                BgImage {
                    height
                    name
                    alternativeText
                    url
                    width
                }
            }
        }
    }
`;

export type BlogBySlugResponse = {
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
        BlogContent?: {
            id: string;
            Richtext?: string;
            Image?: {
                alternativeText: string;
                name: string;
                height: number;
                url: string;
                width: number;
            };
            h1?: string;
            h2?: string;
            h3?: string;
            h4?: string;
            h5?: string;
            h6?: string;
            href?: string;
            label?: string;
            target?: string;
            isExternal?: boolean;
        }[];
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
        card?: {
            CardTitle: string;
            CardDescription: string;
            CardLink: {
                id: string;
                href: string;
                label: string;
                target: string;
                isExternal: boolean;
            };
            BgImage: {
                height: number;
                name: string;
                alternativeText: string;
                url: string;
                width: number;
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
