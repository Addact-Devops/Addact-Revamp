import { generatePageMetadata } from "@/utils/generatePageMetadata";
import CaseStudyListing from "./CaseStudyListing"; // Direct import (MUST be a client component)
import { Fragment } from "react";

// ✅ Server-side SEO
export async function generateMetadata() {
  return generatePageMetadata("caseStudy");
}

export default function PortfolioPage() {
  return (
    <Fragment>
      <CaseStudyListing />
    </Fragment>
  );
}
