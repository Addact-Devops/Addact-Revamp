// app/industries/[slug]/page.tsx

import { Metadata } from "next";
import Script from "next/script";
import { getIndustryBySlug } from "@/graphql/queries/getIndustryBySlug";
import HeroBanner from "@/components/organisms/HeroBanner";
import OurPartners from "@/components/organisms/OurPartners";
import OurCmsExperts from "@/components/organisms/OurCmsExperts";
import WhyAddact from "@/components/organisms/WhyAddact";
import CtaBanner from "@/components/molecules/CtaBanner";
import FAQ from "@/components/organisms/FAQ";
import ContactUs from "@/components/organisms/ContactUs"; // ✅ ADDED

// ✅ import the exact types your OurPartners component expects
import type { PartnerTitle, PartnerImage } from "@/graphql/queries/getOurPartners";
import IndustryChallenges from "@/components/organisms/IndustryChallenges";
import IndustrySolutions from "@/components/organisms/IndustrySolutions";
import IndustryCaseStudies from "@/components/organisms/IndustryCaseStudies";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const industry = await getIndustryBySlug(slug);

    const seo = industry?.SEO;
    if (!seo) return { title: "Industry" };

    return {
        title: seo.metaTitle ?? "Industry",
        description: seo.metaDescription ?? undefined,
        openGraph: {
            title: seo.ogTitle ?? seo.metaTitle ?? undefined,
            description: seo.ogDescription ?? seo.metaDescription ?? undefined,
            images: seo.ogImage?.url ? [{ url: seo.ogImage.url }] : [],
        },
        twitter: { title: seo.twitterCardTitle ?? seo.metaTitle ?? undefined },
        alternates: { canonical: seo.canonicalURL || undefined },
        robots: seo.metaRobots
            ? { index: seo.metaRobots.includes("index"), follow: seo.metaRobots.includes("follow") }
            : { index: true, follow: true },
    };
}

export default async function Page({ params }: { params: Params }) {
    const { slug } = await params;
    const industry = await getIndustryBySlug(slug);
    const structuredData = industry?.SEO?.structuredData;

    // ✅ Hero banner (first item)
    const hero = industry?.HeroBanner?.Banner?.[0];

    // =========================
    // ✅ Partners (normalize to required shapes)
    // =========================
    const normalizedPartnerTitleBlocks: PartnerTitle[] = ((industry?.OurPartner?.Title ?? []) as any[])
        .map((t) => {
            if (t?.h1) return { h1: t.h1 } as PartnerTitle;
            if (t?.h2) return { h2: t.h2 } as PartnerTitle;
            if (t?.h3) return { h3: t.h3 } as PartnerTitle;
            if (t?.h5) return { h5: t.h5 } as PartnerTitle;
            if (t?.h6) return { h6: t.h6 } as PartnerTitle;
            return null;
        })
        .filter(Boolean) as PartnerTitle[];

    const normalizedPartnerImages: PartnerImage[] = ((industry?.OurPartner?.Image ?? []) as any[])
        .map((x) => {
            const url = x?.Image?.url ?? "";
            if (!url) return null;
            return {
                Image: {
                    url,
                    alternativeText: (x?.Image?.alternativeText ?? null) as string | null,
                },
            } as PartnerImage;
        })
        .filter(Boolean) as PartnerImage[];

    // =========================
    // ✅ CMS Experts (Tech_Stack) -> pass as overrides to component
    // =========================
    const cmsTitle = industry?.Tech_Stack?.ExpertiseTitle?.[0]?.Title ?? "";
    const cmsItems =
        (industry?.Tech_Stack?.CMS ?? []).map((c: any, idx: number) => ({
            id: String(idx),
            Title: c?.Title ?? "",
            Links: {
                id: String(idx),
                href: c?.Links?.href ?? "#",
                label: c?.Links?.label ?? c?.Title ?? "Learn more",
                target: c?.Links?.target ?? "self",
                isExternal: c?.Links?.isExternal ?? c?.Links?.target === "blank",
            },
            Icons: {
                url: c?.Icons?.url ?? "",
                alternativeText: c?.Icons?.alternativeText ?? "Service Icon",
                width: c?.Icons?.width ?? 113,
                height: c?.Icons?.height ?? 64,
                name: c?.Icons?.name ?? c?.Title ?? "icon",
            },
            ClassName: c?.ClassName ?? "",
        })) ?? [];

    // ✅ Why Addact (industry variant is `global_card`)
    const whyAddactData = industry?.global_card ?? null;

    // ✅ CTA Banner (industry variant is `banner`) – adapt to home CTA shape
    const ctaData = industry?.banner ?? null;
    const ctaAdapted = ctaData?.Banner?.[0]
        ? {
              CTAImage: [
                  {
                      Image: {
                          url: ctaData.Banner[0].BannerImage?.url || "",
                          alternativeText: ctaData.Banner[0].BannerImage?.alternativeText ?? null,
                          width: ctaData.Banner[0].BannerImage?.width ?? 0,
                          height: ctaData.Banner[0].BannerImage?.height ?? 0,
                      },
                  },
              ],
              CTALink: [
                  {
                      id: "0",
                      href: ctaData.Banner[0].BannerLink?.href || "#",
                      label: ctaData.Banner[0].BannerLink?.label || "",
                      target: ctaData.Banner[0].BannerLink?.target || "self",
                      isExternal: ctaData.Banner[0].BannerLink?.target === "blank",
                  },
              ],
              Title: [{ h2: ctaData.Banner[0].BannerTitle || "" }],
              CTADescription: [],
          }
        : null;

    // ✅ FAQ (industry variant is `faq`) – adapt to home FAQ shape (non-null strings)
    const faqRaw = industry?.faq ?? null;
    const faqAdapted = faqRaw
        ? {
              ReferenceTitle: faqRaw.ReferenceTitle ?? "",
              Title: faqRaw.Title ?? "",
              FAQ: (faqRaw.FAQ ?? []).map((q: any) => ({
                  Title: q?.Title ?? "",
                  Description: q?.Description ?? "",
              })),
          }
        : null;

    // =========================
    // ✅ ContactUs (industry variant is `ContactUs`) – adapt to home contact_us shape
    // =========================
    const contactRaw = industry?.ContactUs ?? null;
    const contactAdapted = contactRaw
        ? {
              pageReference: contactRaw.pageReference ?? "",
              Form: (contactRaw.Form ?? []).map((f: any, i: number) => ({
                  id: String(i),
                  Title: f?.Title ?? "",
                  Description: f?.Description ?? "",
                  Image: f?.Image
                      ? {
                            url: f.Image.url ?? "",
                            alternativeText: f.Image.alternativeText ?? null,
                            width: f.Image.width ?? 0,
                            height: f.Image.height ?? 0,
                        }
                      : null,
              })),
              NameLable: contactRaw.NameLable ?? "",
              CompanyName: contactRaw.CompanyName ?? "",
              RequirementsLabel: contactRaw.RequirementsLabel ?? "",
              ButtonLabel: contactRaw.ButtonLabel ?? "",
              EmailLabel: contactRaw.EmailLabel ?? "",
              RecipientEmails: contactRaw.RecipientEmails ?? "",
          }
        : null;

    return (
        <>
            {structuredData && (
                <Script id="structured-data" type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </Script>
            )}

            <main className="industry-detail-page">
                {/* ✅ Hero Banner (image/video auto) */}
                {hero && (
                    <HeroBanner
                        title={hero.BannerTitle || ""}
                        description={hero.BannerDescription || ""}
                        backgroundImageUrl={hero?.BannerImage?.url || ""}
                        button={
                            hero?.BannerLink?.label && hero?.BannerLink?.href
                                ? { label: hero.BannerLink.label, url: hero.BannerLink.href }
                                : undefined
                        }
                        showAnchorLinks={false}
                    />
                )}

                {/* ✅ Partners from this industry */}
                <OurPartners titleBlocks={normalizedPartnerTitleBlocks} images={normalizedPartnerImages} />

                {industry?.OurChallenges && <IndustryChallenges data={industry.OurChallenges} />}

                {industry?.OurSolutions && <IndustrySolutions data={industry.OurSolutions} />}

                {/* ✅ CMS Experts from this industry */}
                <OurCmsExperts title={cmsTitle} items={cmsItems} />

                {industry?.ProjectHighlightTitle && <IndustryCaseStudies title={industry.ProjectHighlightTitle} />}

                {/* ✅ Why Addact from this industry */}
                {whyAddactData && <WhyAddact data={whyAddactData} />}

                {/* ✅ CTA Banner from this industry – adapted to home shape */}
                {ctaAdapted && <CtaBanner data={ctaAdapted as any} />}

                {/* ✅ FAQ from this industry – adapted to home shape */}
                {faqAdapted && <FAQ data={faqAdapted as any} />}

                {/* ✅ Contact Us from this industry – adapted to home shape */}
                {contactAdapted && <ContactUs data={contactAdapted as any} />}
            </main>
        </>
    );
}
