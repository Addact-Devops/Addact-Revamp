// src/graphql/queries/getIndustryBySlug.ts
import { gql } from "graphql-request";
import client from "../client";

/**
 * Main detail query — filtered by slug.
 * Now includes `faq`, `ContactUs`, and newly added `ProjectHighlights`.
 */
const GET_INDUSTRY_BY_SLUG = gql`
    query GetIndustryBySlug($slug: String!) {
        industryDetailPages(filters: { Slug: { eq: $slug } }) {
            Slug
            ReferenceTitle

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

            HeroBanner {
                Banner {
                    ... on ComponentBannerBanner {
                        BannerTitle
                        BannerDescription
                        BannerImage {
                            url
                            alternativeText
                            width
                            height
                        }
                        BannerLink {
                            href
                            label
                            target
                            SubDisc
                        }
                    }
                }
            }

            OurPartner {
                Title {
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
                }
                Image {
                    ... on ComponentSharedImage {
                        Image {
                            url
                            alternativeText
                        }
                    }
                }
            }

            OurChallenges {
                Title
                NumberTitleContent {
                    Number
                    Title
                    Content
                }
            }

            OurSolutions {
                Title
                SolutionsCards {
                    Title
                    Description
                }
            }

            Tech_Stack {
                ExpertiseTitle {
                    ... on ComponentBaseTemplateTitleWithDescription {
                        Title
                    }
                }
                CMS {
                    ... on ComponentBaseTemplateLinkImage {
                        Title
                        Links {
                            label
                            target
                            href
                            SubDisc
                            Icon {
                                url
                                height
                                alternativeText
                                width
                            }
                        }
                        Icons {
                            url
                            alternativeText
                            width
                            height
                        }
                        ClassName
                    }
                }
            }

            global_card {
                Title {
                    ... on ComponentHeadingsH1 {
                        h1
                        id
                    }
                    ... on ComponentHeadingsH2 {
                        h2
                        id
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
                    ... on ComponentBaseTemplateRichtext {
                        id
                        Richtext
                    }
                }
                GlobalCard {
                    ... on ComponentBaseTemplatePromo {
                        Title
                        Description
                        Image {
                            url
                            alternativeText
                            width
                            height
                        }
                    }
                }
            }

            client_testimonial {
                Title
                Item {
                    quote
                    author_name
                    author_position
                    rating
                }
            }

            banner {
                pageReference
                Banner {
                    ... on ComponentBannerBanner {
                        BannerTitle
                        BannerImage {
                            url
                            alternativeText
                            width
                            height
                        }
                        BannerLink {
                            href
                            label
                            target
                        }
                    }
                }
            }

            faq {
                ReferenceTitle
                Title
                FAQ {
                    Title
                    Description
                }
            }

            ContactUs {
                pageReference
                Form {
                    ... on ComponentBaseTemplatePromo {
                        Title
                        Description
                        Image {
                            url
                            alternativeText
                            width
                            height
                        }
                    }
                }
                NameLable
                CompanyName
                RequirementsLabel
                ButtonLabel
                EmailLabel
                RecipientEmails
            }

            # ✅ Newly added component block
            ProjectHighlights {
                Title
                addact_case_studies {
                    Slug
                    HeroBanner {
                        ... on ComponentBlogHeroBannerBlogHeroBanner {
                            BannerTitle
                            PublishDate
                            BannerImage {
                                url
                                alternativeText
                                width
                                height
                            }
                        }
                    }
                }
            }
        }
    }
`;

/** Slugs helper for SSG/ISR. */
const GET_INDUSTRY_SLUGS = gql`
    query GetIndustrySlugs {
        industryDetailPages {
            Slug
        }
    }
`;

// -------------------- Types --------------------

export type IndustryDetail = {
    Slug: string;
    ReferenceTitle?: string;

    SEO?: {
        metaTitle?: string;
        metaDescription?: string;
        ogTitle?: string;
        ogDescription?: string;
        ogImage?: { url?: string } | null;
        metaRobots?: string | null;
        twitterCardTitle?: string | null;
        canonicalURL?: string | null;
        structuredData?: Record<string, unknown> | null;
        languageTag?: string | null;
    } | null;

    HeroBanner?: {
        Banner?: {
            BannerTitle?: string | null;
            BannerDescription?: string | null;
            BannerImage?: {
                url?: string | null;
                alternativeText?: string | null;
                width?: number | null;
                height?: number | null;
            } | null;
            BannerLink?: {
                href?: string | null;
                label?: string | null;
                target?: string | null;
                SubDisc?: string | null;
            } | null;
        }[];
    } | null;

    OurPartner?: {
        Title?: Array<
            | { id?: string; h1?: string }
            | { id?: string; h2?: string }
            | { id?: string; h3?: string }
            | { id?: string; h5?: string }
            | { id?: string; h6?: string }
        > | null;
        Image?: { Image?: { url?: string; alternativeText?: string | null } | null }[] | null;
    } | null;

    OurChallenges?: {
        Title?: string | null;
        NumberTitleContent?: { Number?: string; Title?: string; Content?: string }[] | null;
    } | null;

    OurSolutions?: {
        Title?: string | null;
        SolutionsCards?: { Title?: string | null; Description?: string | null }[] | null;
    } | null;

    Tech_Stack?: {
        ExpertiseTitle?: { Title?: string | null }[] | null;
        CMS?: Array<{
            Title?: string | null;
            Links?: {
                label?: string | null;
                target?: string | null;
                href?: string | null;
                SubDisc?: string | null;
                Icon?: {
                    url?: string | null;
                    height?: number | null;
                    alternativeText?: string | null;
                    width?: number | null;
                } | null;
            } | null;
            Icons?: {
                url?: string | null;
                alternativeText?: string | null;
                width?: number | null;
                height?: number | null;
            } | null;
            ClassName?: string | null;
        }> | null;
    } | null;

    global_card?: {
        Title?: Array<
            | { id?: string; h1?: string }
            | { id?: string; h2?: string }
            | { id?: string; h3?: string }
            | { id?: string; h5?: string }
            | { id?: string; h6?: string }
            | { id?: string; Richtext?: string }
        > | null;
        GlobalCard?: Array<{
            Title?: string | null;
            Description?: string | null;
            Image?: {
                url?: string | null;
                alternativeText?: string | null;
                width?: number | null;
                height?: number | null;
            } | null;
        }> | null;
    } | null;

    client_testimonial?: {
        Title?: string | null;
        Item?: Array<{
            quote?: unknown;
            author_name?: string | null;
            author_position?: string | null;
            rating?: string | null;
        }> | null;
    } | null;

    banner?: {
        pageReference?: string | null;
        Banner?: Array<{
            BannerTitle?: string | null;
            BannerImage?: {
                url?: string | null;
                alternativeText?: string | null;
                width?: number | null;
                height?: number | null;
            } | null;
            BannerLink?: { href?: string | null; label?: string | null; target?: string | null } | null;
        }> | null;
    } | null;

    faq?: {
        ReferenceTitle?: string | null;
        Title?: string | null;
        FAQ?: { Title?: string | null; Description?: string | null }[] | null;
    } | null;

    ContactUs?: {
        pageReference?: string | null;
        Form?: Array<{
            Title?: string | null;
            Description?: string | null;
            Image?: {
                url?: string | null;
                alternativeText?: string | null;
                width?: number | null;
                height?: number | null;
            } | null;
        }> | null;
        NameLable?: string | null;
        CompanyName?: string | null;
        RequirementsLabel?: string | null;
        ButtonLabel?: string | null;
        EmailLabel?: string | null;
        RecipientEmails?: string | null;
    } | null;

    /** ✅ New type for ProjectHighlights */
    ProjectHighlights?: {
        Title?: string | null;
        addact_case_studies?: Array<{
            Slug?: string | null;
            HeroBanner?: Array<{
                BannerTitle?: string | null;
                PublishDate?: string | null;
                BannerImage?: {
                    url?: string | null;
                    alternativeText?: string | null;
                    width?: number | null;
                    height?: number | null;
                } | null;
            }> | null;
        }> | null;
    } | null;
};

export type IndustryBySlugResponse = {
    industryDetailPages: IndustryDetail[];
};

// -------------------- Fetchers --------------------

export async function getIndustryBySlug(slug: string) {
    const normalized = slug.startsWith("/") ? slug : `/${slug}`;
    const data = await client.request<IndustryBySlugResponse>(GET_INDUSTRY_BY_SLUG, { slug: normalized });
    return data.industryDetailPages?.[0] || null;
}

export async function getAllIndustrySlugs() {
    const data = await client.request<{ industryDetailPages: { Slug: string }[] }>(GET_INDUSTRY_SLUGS);
    return (data.industryDetailPages || []).map((i) => i.Slug?.replace(/^\//, "")).filter(Boolean);
}
