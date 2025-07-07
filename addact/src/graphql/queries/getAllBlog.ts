// graphql/queries/getAllBlog.ts
import { gql } from "graphql-request";
import client from "../client";

const GET_ALL_BLOGS = gql`
    query AddactBlogs($page: Int, $pageSize: Int) {
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

        addactBlogs(pagination: { page: $page, pageSize: $pageSize }) {
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
                code?: string;
                message?: string;
            }[];
        };
    }; // ✅ blogs is an object
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
    blogCategories: {
        Category: {
            CategoryTitle: string;
        };
    }[];
};

export async function getAllBlogs(): Promise<AddactBlogsResponse> {
    const pageSize = 50;
    let page = 1;
    const allBlogs: AddactBlogsResponse["addactBlogs"] = [];
    let blogMeta: Omit<AddactBlogsResponse, "addactBlogs"> | null = null;

    while (true) {
        const data = await client.request<AddactBlogsResponse>(GET_ALL_BLOGS, {
            page,
            pageSize,
        });

        if (page === 1) {
            blogMeta = {
                blogs: data.blogs,
                blogCategories: data.blogCategories,
            };
        }

        const currentBatch = data?.addactBlogs || [];
        allBlogs.push(...currentBatch);

        if (currentBatch.length < pageSize) break;
        page++;
    }

    return {
        addactBlogs: allBlogs,
        blogs: blogMeta?.blogs || {},
        blogCategories: blogMeta?.blogCategories || [],
    };
}
