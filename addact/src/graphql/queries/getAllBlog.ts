// graphql/queries/getAllBlog.ts
import { gql } from "graphql-request";
import client from "../client";

const GET_ALL_BLOGS = gql`
    query AddactBlogs {
        blogs {
            PageHeading {
                id
                PageTitle
                Slug
            }
            blogBanner {
                Banner {
                    ... on ComponentBannerBanner {
                        id
                        BannerTitle
                        BannerDescription
                        BannerImage {
                            width
                            url
                            name
                            height
                        }
                        show_searchbox
                    }
                    ... on Error {
                        code
                        message
                    }
                }
            }
        }

        addactBlogs {
            Slug
            documentId
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
                    PublishDate
                    author {
                        Author {
                            AuthorName
                        }
                    }
                    ReadNow {
                        id
                        href
                        label
                        target
                        isExternal
                    }
                    blogcategory {
                        Category {
                            CategoryTitle
                        }
                    }
                }
            }
        }

        blogCategories {
            Category {
                CategoryTitle
            }
        }
    }
`;

type AddactBlogsResponse = {
    addactBlogs: {
        Slug: string;
        documentId: string;
        HeadingSection?: {
            PageTitle?: string;
        }[];
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
            PublishDate?: string;
            author?: {
                Author?: {
                    AuthorName?: string;
                };
            };
            ReadNow?: {
                id?: string;
                href?: string;
                label?: string;
                target?: string;
                isExternal?: boolean;
            };
            blogcategory?: {
                Category?: {
                    CategoryTitle?: string;
                };
            };
        }[];
    }[];
    blogs: {
        PageHeading?: {
            id: string;
            PageTitle?: string;
            Slug?: string;
        };
        blogBanner?: {
            Banner: {
                id?: string;
                BannerTitle?: string;
                BannerDescription?: string;
                BannerImage?: {
                    width: number;
                    url: string;
                    name: string;
                    height: number;
                };
                show_searchbox?: boolean;
                code?: string; // In case of error
                message?: string; // In case of error
            }[];
        };
    };
    blogCategories: {
        Category: {
            CategoryTitle: string;
        };
    }[];
};

export async function getAllBlogs(): Promise<AddactBlogsResponse> {
    const data = await client.request<AddactBlogsResponse>(GET_ALL_BLOGS);
    return data;
}
