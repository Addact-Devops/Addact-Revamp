import { gql } from "graphql-request";
import client from "../graphql/client";

type SEOData = {
    metaTitle?: string;
    metaDescription?: string;
    canonicalURL?: string;
    metaRobots?: string;
    twitterCardTitle?: string;
    structuredData?: Record<string, unknown>;
    languageTag?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: {
        url?: string;
    };
};

type PageData = {
    Slug?: string;
    SEO?: SEOData;
};

type Response<T extends string> = {
    [K in T]: PageData | PageData[];
};

export const fetchSinglePage = async <T extends string>(type: T, slug?: string): Promise<PageData> => {
    try {
        // ✅ For serviceLists (collection-type with slug)
        if (type === "serviceLists" && slug) {
            const query = gql`
                query GetServicePage($slug: String) {
                    serviceLists(filters: { Slug: { eq: $slug } }) {
                        Slug
                        SEO {
                            metaTitle
                            metaDescription
                            canonicalURL
                            metaRobots
                            twitterCardTitle
                            structuredData
                            languageTag
                            ogTitle
                            ogDescription
                            ogImage {
                                url
                            }
                        }
                    }
                }
            `;
            const variables = { slug };
            const response: Response<T> = await client.request(query, variables);
            const items = response[type];
            const matched = Array.isArray(items) ? items[0] || {} : {};
            return matched;
        }

        // ✅ For addactBlogs (blog collection-type with slug)
        if (type === "addactBlogs" && slug) {
            const query = gql`
                query GetBlogSEO($filters: AddactBlogFiltersInput) {
                    addactBlogs(filters: { Slug: { eq: $slug } }) {
                        Slug
                        SEO {
                            metaTitle
                            metaDescription
                            canonicalURL
                            metaRobots
                            twitterCardTitle
                            structuredData
                            languageTag
                            ogTitle
                            ogDescription
                            ogImage {
                                url
                            }
                        }
                    }
                }
            `;
            const variables = {
                filters: {
                    Slug: {
                        eq: slug,
                    },
                },
            };
            const response: Response<T> = await client.request(query, variables);
            const items = response[type];
            const matched = Array.isArray(items) ? items[0] || {} : {};
            return matched;
        }

        // ✅ For single-type pages (e.g. aboutUs, brandGuideline)
        const query = gql`
            query GetPageData {
                ${type} {
                    SEO {
                        metaTitle
                        metaDescription
                        canonicalURL
                        metaRobots
                        twitterCardTitle
                        structuredData
                        languageTag
                        ogTitle
                        ogDescription
                        ogImage {
                            url
                        }
                    }
                }
            }
        `;
        const response: Response<T> = await client.request(query);
        const rawData = response[type];
        const data: PageData = Array.isArray(rawData) ? rawData[0] || {} : rawData;

        // console.log("✅ [SINGLE] Fetched SEO:", data);
        return data;
    } catch (error) {
        console.error("❌ Error fetching page data:", error);
        return {};
    }
};
