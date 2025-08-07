import { generatePageMetadata } from "@/utils/generatePageMetadata";
import CaseStudyListing from "./CaseStudyListing"; // Direct import (MUST be a client component)

// ✅ Server-side SEO
export async function generateMetadata() {
    return generatePageMetadata("event");
}

export default function PortfolioPage() {
    return <CaseStudyListing />;
}
