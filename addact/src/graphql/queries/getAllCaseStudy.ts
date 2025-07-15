import { gql } from "graphql-request";
import client from "../client";

const GET_ALL_CASE_STUDY = gql`
    query CaseStudyList {
        caseStudy {
            CaseStudyBanner {
                Banner {
                    ... on ComponentBannerBanner {
                        BannerTitle
                        BannerDescription
                        BannerImage {
                            alternativeText
                            name
                            height
                            url
                            width
                        }
                        show_searchbox
                    }
                }
            }
        }
        addactCaseStudies(pagination: { page: 1, pageSize: 50 }) {
            ReferenceTitle
            Slug
            HeroBanner {
                ... on ComponentBlogHeroBannerBlogHeroBanner {
                    PublishDate
                    BannerTitle
                    BannerImage {
                        alternativeText
                        height
                        name
                        url
                        width
                    }
                }
            }
            caseStudySummary
            documentId
        }
    }
`;

type Image = {
    alternativeText: string;
    name: string;
    height: number;
    url: string;
    width: number;
};

export interface IAllCaseStudy {
    caseStudy: {
        CaseStudyBanner: {
            Banner: {
                BannerTitle: string;
                BannerDescription: string;
                BannerImage: Image;
                show_searchbox: boolean;
            }[];
        };
    };
    addactCaseStudies: {
        ReferenceTitle: string;
        Slug: string;
        HeroBanner: {
            PublishDate: string;
            BannerTitle: string;
            BannerImage: Image;
        }[];
        caseStudySummary: string;
        documentId: string;
    }[];
}

export async function getAllCaseStudyData(): Promise<IAllCaseStudy> {
    const data = await client.request<IAllCaseStudy>(GET_ALL_CASE_STUDY);
    return data;
}
