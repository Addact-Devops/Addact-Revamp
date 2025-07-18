import { gql } from "graphql-request";
import client from "../client";

const GET_CASE_STUDY_BY_SLUG = gql`
    query AddactCaseStudies($filters: AddactCaseStudyFiltersInput) {
        addactCaseStudies(filters: $filters) {
            Slug
            HeadingSection {
                ... on ComponentBaseTemplateCommonSection {
                    PageTitle
                }
            }
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
                ... on Error {
                    code
                    message
                }
            }
            CaseStudyContent {
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
                ... on ComponentSharedLink {
                    id
                    href
                    label
                    target
                    isExternal
                }
                ... on ComponentSharedImage {
                    id
                    Image {
                        url
                        width
                        name
                        height
                    }
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
            FormTitle {
                CommonTitle {
                    ... on ComponentBaseTemplateTitleWithDescription {
                        Title
                        Description
                    }
                }
            }
            CaseStudyPDF {
                url
                width
                name
                height
            }
        }
    }
`;

export type CaseStudyBySlugResponse = {
    addactCaseStudies: {
        Slug: string;
        HeadingSection: {
            PageTitle: string;
        }[];
        HeroBanner: {
            id: string;
            BannerTitle: string;
            BannerDescription: string;
            PublishDate: string;
            BannerImage: {
                width: number;
                name: string;
                height: number;
                url: string;
            };
            blogcategory: string;
            author: string;
            ReadNow: string;
        }[];
        CaseStudyContent: {
            id: string;
            h2?: string;
            Richtext?: string;
            h3?: string;
        }[];
        FormTitle: {
            CommonTitle: {
                Title: string;
                Description: string;
            }[];
        };
        CaseStudyPDF: {
            url: string;
            width: string;
            name: string;
            height: string;
        };
    }[];
};

export async function getCaseStudyBySlug(slug: string) {
    const data = await client.request<CaseStudyBySlugResponse>(GET_CASE_STUDY_BY_SLUG, {
        filters: {
            Slug: {
                eq: `/${slug}`,
            },
        },
    });

    return data.addactCaseStudies?.[0] || null;
}
