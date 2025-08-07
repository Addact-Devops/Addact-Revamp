import { gql } from "graphql-request";
import client from "../client";

const GET_BLOG_BY_SLUG = gql`
    query GetBlogBySlug($filters: AddactBlogFiltersInput) {
        addactBlogs(filters: $filters) {
            Slug

            SEO {
                metaTitle
                metaDescription
                ogTitle
                ogDescription
                ogImage {
                    url
                }
                metaRobots
                twitterCardTitle
                canonicalURL
                structuredData
                languageTag
            }

            HeadingSection {
                ... on ComponentBaseTemplateCommonSection {
                    PageTitle
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
                        Title
                        Description
                    }
                }
            }

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

            contactCard {
                documentId
                pageReference
                createdAt
                updatedAt
                publishedAt
                ContactCard {
                    ... on ComponentCardCard {
                        id
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
                            width
                            url
                            name
                            height
                            alternativeText
                        }
                    }
                    ... on Error {
                        code
                        message
                    }
                }
            }
        }
    }
`;

export type BlogBySlugResponse = {
    addactBlogs: {
        Slug: string;

        SEO?: {
            metaTitle?: string;
            metaDescription?: string;
            ogTitle?: string;
            ogDescription?: string;
            ogImage?: {
                url?: string;
            };
            metaRobots?: string;
            twitterCardTitle?: string;
            canonicalURL?: string;
            structuredData?: Record<string, unknown>; // ✅ fixed: replaced `any` with valid type
            languageTag?: string;
        } | null;

        HeadingSection?: { PageTitle?: string }[];

        BlogBanner?: {
            BannerTitle?: string;
            BannerDescription?: string;
            BannerImage?: {
                alternativeText?: string;
                height?: number;
                name?: string;
                url?: string;
                width?: number;
            };
            PublishDate?: string;
            ReadNow?: {
                id?: string;
                href?: string;
                label?: string;
                target?: string;
                isExternal?: boolean;
            };
            author?: { Author?: { AuthorName?: string } };
            blogcategory?: { Category?: { CategoryTitle?: string } };
        }[];

        BlogContent?: {
            id?: string;
            Richtext?: string;
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
            Image?: {
                alternativeText?: string;
                name?: string;
                height?: number;
                url?: string;
                width?: number;
            };
        }[];

        author?: {
            Author?: {
                AuthorName?: string;
                AuthorDescription?: string;
                AuthorImage?: {
                    alternativeText?: string;
                    height?: number;
                    width?: number;
                    url?: string;
                    name?: string;
                };
                designation?: { DesignationTitle?: string };
            };
        };

        similarstorytitle?: {
            CommonTitle?: {
                Title?: string;
                Description?: string;
            }[];
        };

        similarBlogs?: {
            BlogBanner?: {
                BannerTitle?: string;
                PublishDate?: string;
                BannerImage?: {
                    alternativeText?: string;
                    name?: string;
                    url?: string;
                    width?: number;
                    height?: number;
                };
                ReadNow?: {
                    id?: string;
                    href?: string;
                    label?: string;
                    target?: string;
                    isExternal?: boolean;
                };
                author?: {
                    Author?: {
                        AuthorName?: string;
                    };
                };
                blogcategory?: {
                    Category?: {
                        CategoryTitle?: string;
                    };
                };
            }[];
        }[];

        socialicons?: {
            SocialIcon?: {
                Title?: string;
                ClassName?: string;
                Links?: {
                    id?: string;
                    href?: string;
                    label?: string;
                    target?: string;
                    isExternal?: boolean;
                }[];
                Icons?: {
                    alternativeText?: string;
                    name?: string;
                    height?: number;
                    url?: string;
                    width?: number;
                };
                HoverIcon?: {
                    alternativeText?: string;
                    name?: string;
                    height?: number;
                    url?: string;
                    width?: number;
                };
            }[];
        };

        contactCard?: {
            documentId?: string;
            pageReference?: string;
            createdAt?: string;
            updatedAt?: string;
            publishedAt?: string;
            ContactCard?: {
                id?: string;
                CardTitle?: string;
                CardDescription?: string;
                CardLink?: {
                    id?: string;
                    href?: string;
                    label?: string;
                    target?: string;
                    isExternal?: boolean;
                };
                BgImage?: {
                    width?: number;
                    url?: string;
                    name?: string;
                    height?: number;
                    alternativeText?: string;
                };
            }[];
        };
    }[];
};

// Fetch function
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
