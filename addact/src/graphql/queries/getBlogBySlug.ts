import { gql } from "graphql-request";
import client from "../client";

const GET_BLOG_BY_SLUG = gql`
    query GetBlogBySlug($filters: AddactBlogFiltersInput) {
        addactBlogs(filters: $filters) {
            Slug
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
                        url
                        width
                        height
                        name
                        alternativeText
                    }
                    blogcategory {
                        Category {
                            id
                            CategoryTitle
                        }
                    }
                }
            }
            BlogContent {
                ... on ComponentBaseTemplateRichtext {
                    id
                    Richtext
                }
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
                ... on Error {
                    code
                    message
                }
            }
            author {
                Author {
                    AuthorName
                    Designation
                    AuthorDescription
                    AuthorImage {
                        url
                        width
                        height
                        name
                        alternativeText
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
                            href
                            label
                            isExternal
                            target
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
                Designation: string;
                AuthorDescription: string;
                AuthorImage?: {
                    url: string;
                    width: number;
                    height: number;
                    name: string;
                    alternativeText?: string;
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
