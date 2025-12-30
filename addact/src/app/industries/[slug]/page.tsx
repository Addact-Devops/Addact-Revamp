// app/industries/[slug]/page.tsx

import { Metadata } from "next";
import Script from "next/script";
import { getIndustryBySlug } from "@/graphql/queries/getIndustryBySlug";
import HeroBanner from "@/components/organisms/HeroBanner";
import OurPartners from "@/components/organisms/OurPartners";
import OurCmsExpertsWithAnimation from "@/components/organisms/OurCmsExpertsWithAnimation";
import CtaBanner from "@/components/molecules/CtaBanner";
import FAQ from "@/components/organisms/FAQ";
import ContactUs from "@/components/organisms/ContactUs";

// ✅ import the exact types your OurPartners component expects
import type {
  PartnerTitle,
  PartnerImage,
} from "@/graphql/queries/getOurPartners";
import IndustryChallenges from "@/components/organisms/IndustryChallenges";
import IndustrySolutionsWithAnimation from "@/components/organisms/IndustrySolutionsWithAnimation";
import IndustryCaseStudies from "@/components/organisms/IndustryCaseStudies";
import WhyAddact from "@/components/organisms/WhyAddactWithAnimation";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";

type Params = Promise<{ slug: string }>;

// ---------- Local helper types (no `any`) ----------
type ImgBasic = {
  url?: string;
  alternativeText?: string; // use undefined instead of null to match most component shapes
  width?: number;
  height?: number;
  name?: string;
};

type LinkBasic = {
  href: string;
  label: string;
  target?: "self" | "blank" | "parent" | "top";
  isExternal?: boolean;
};

type CmsItemRaw = {
  Title?: string;
  Links?: Partial<LinkBasic>;
  Icons?: Partial<ImgBasic>;
  ClassName?: string;
};

type FaqRawItem = {
  Title?: string | null;
  Description?: string | null;
};

type ContactFormRawItem = {
  Title?: string | null;
  Description?: string | null;
  Image?: {
    url?: string | null;
    alternativeText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
};

// Accept null/undefined safely from Strapi
const normalizeTarget = (
  t: string | null | undefined
): "self" | "blank" | "parent" | "top" =>
  t === "blank" || t === "parent" || t === "top" ? t : "self";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);

  const seo = industry?.SEO;
  if (!seo) return { title: "Industry" };

  // ✅ FIX: Properly derive robots from Strapi value(s) with correct priority.
  // Accepts values like "noindex", "index,follow", "noindex,nofollow", etc.
  const robotsRaw = (seo.metaRobots || "").toString().toLowerCase();
  const tokens = robotsRaw.split(/[,\s]+/).filter(Boolean); // normalize into tokens

  const hasNoindex = tokens.includes("noindex");
  const hasIndex = tokens.includes("index");
  const hasNofollow = tokens.includes("nofollow");
  const hasFollow = tokens.includes("follow");

  const robots: Metadata["robots"] = {
    // explicit "noindex" wins; otherwise "index" if present; default true
    index: hasNoindex ? false : hasIndex ? true : true,
    // explicit "nofollow" wins; otherwise "follow" if present; default true
    follow: hasNofollow ? false : hasFollow ? true : true,
  };

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
    robots, // ✅ use the computed robots object
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
  const partnerTitleRaw = Array.isArray(industry?.OurPartner?.Title)
    ? (industry?.OurPartner?.Title as unknown[])
    : [];

  const normalizedPartnerTitleBlocks: PartnerTitle[] = partnerTitleRaw
    .map((t: unknown) => {
      const obj = t as Record<string, unknown> | null;
      if (!obj) return null;
      if (typeof obj.h1 === "string") return { h1: obj.h1 } as PartnerTitle;
      if (typeof obj.h2 === "string") return { h2: obj.h2 } as PartnerTitle;
      if (typeof obj.h3 === "string") return { h3: obj.h3 } as PartnerTitle;
      if (typeof obj.h5 === "string") return { h5: obj.h5 } as PartnerTitle;
      if (typeof obj.h6 === "string") return { h6: obj.h6 } as PartnerTitle;
      return null;
    })
    .filter(Boolean) as PartnerTitle[];

  const partnerImagesRaw = Array.isArray(industry?.OurPartner?.Image)
    ? (industry?.OurPartner?.Image as unknown[])
    : [];

  const normalizedPartnerImages: PartnerImage[] = partnerImagesRaw
    .map((x: unknown) => {
      const obj = x as {
        Image?: { url?: string; alternativeText?: string | null };
      } | null;
      const url = obj?.Image?.url ?? "";
      if (!url) return null;
      return {
        Image: {
          url,
          alternativeText: obj?.Image?.alternativeText ?? undefined,
        },
      } as PartnerImage;
    })
    .filter(Boolean) as PartnerImage[];

  // =========================
  // ✅ CMS Experts (Tech_Stack) -> pass as overrides to component
  // =========================
  const cmsTitle = industry?.Tech_Stack?.ExpertiseTitle?.[0]?.Title ?? "";

  const cmsRaw: CmsItemRaw[] = Array.isArray(industry?.Tech_Stack?.CMS)
    ? (industry?.Tech_Stack?.CMS as CmsItemRaw[])
    : [];

  // Build array compatible with common OverrideItem shapes
  const cmsItems = cmsRaw.map((c: CmsItemRaw, idx: number) => ({
    id: String(idx),
    Title: c?.Title ?? "",
    Links: {
      id: String(idx),
      href: c?.Links?.href ?? "#",
      label: c?.Links?.label ?? c?.Title ?? "Learn more",
      target: normalizeTarget(c?.Links?.target as string | null | undefined),
      isExternal:
        normalizeTarget(c?.Links?.target as string | null | undefined) ===
        "blank",
    },
    Icons: {
      url: c?.Icons?.url ?? "",
      alternativeText: c?.Icons?.alternativeText ?? undefined,
      width: c?.Icons?.width ?? 113,
      height: c?.Icons?.height ?? 64,
      name: c?.Icons?.name ?? c?.Title ?? "icon",
    } as ImgBasic,
    ClassName: c?.ClassName ?? "",
  }));

  // ✅ Why Addact (industry variant is `global_card`)
  const whyAddactData = industry?.global_card ?? null;

  // ✅ FAQ (industry variant is `faq`) – adapt to home FAQ shape (non-null strings)
  const faqRaw = industry?.faq ?? null;
  const faqAdapted = faqRaw
    ? {
        ReferenceTitle: faqRaw.ReferenceTitle ?? "",
        Title: faqRaw.Title ?? "",
        FAQ: (Array.isArray(faqRaw.FAQ)
          ? (faqRaw.FAQ as FaqRawItem[])
          : []
        ).map((q): { Title: string; Description: string } => ({
          Title: q?.Title ?? "",
          Description: q?.Description ?? "",
        })),
      }
    : null;

  // ✅ ContactUs (industry variant is `ContactUs`) – adapt to home contact_us shape
  const contactRaw = industry?.ContactUs ?? null;
  const contactAdapted = contactRaw
    ? {
        pageReference: contactRaw.pageReference ?? "",
        Form: (Array.isArray(contactRaw?.Form)
          ? (contactRaw.Form as ContactFormRawItem[])
          : []
        ).map((f, i) => ({
          id: String(i),
          Title: f?.Title ?? "",
          Description: f?.Description ?? "",
          Image: f?.Image
            ? {
                url: f.Image.url ?? "",
                alternativeText: f.Image.alternativeText ?? undefined,
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

  // ✅ Project Highlights items directly from industry query (new)
  const projectHighlightItems =
    industry?.ProjectHighlights?.addact_case_studies ?? [];
  const projectHighlightsTitle =
    industry?.ProjectHighlights?.Title ?? "Project Highlights";

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
        <OurPartners
          titleBlocks={normalizedPartnerTitleBlocks}
          images={normalizedPartnerImages}
        />

        {industry?.OurChallenges && (
          <IndustryChallenges data={industry.OurChallenges as never} />
        )}

        {industry?.OurSolutions && (
          <IndustrySolutionsWithAnimation
            data={industry.OurSolutions as never}
          />
        )}

        {/* ✅ CMS Experts from this industry */}
        <OurCmsExpertsWithAnimation
          title={cmsTitle}
          items={cmsItems as never}
        />

        {!!projectHighlightItems.length && (
          <IndustryCaseStudies
            title={projectHighlightsTitle}
            items={projectHighlightItems as never}
          />
        )}

        {/* ✅ Why Addact from this industry */}
        {whyAddactData && <WhyAddact data={whyAddactData as never} />}

        <ClientTestimonials />

        {/* ✅ CTA Banner from this industry – adapted to home shape */}
        {industry?.cta && <CtaBanner data={industry?.cta as never} />}

        {/* ✅ FAQ from this industry – adapted to home shape */}
        {faqAdapted && <FAQ data={faqAdapted as never} />}

        {/* ✅ Contact Us from this industry – adapted to home shape */}
        {contactAdapted && <ContactUs data={contactAdapted as never} />}
      </main>
    </>
  );
}
