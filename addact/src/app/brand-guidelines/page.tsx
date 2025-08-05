// src/app/brand-guidelines/page.tsx

import { generatePageMetadata } from "@/utils/generatePageMetadata";
import BrandGuidelinesPageClient from "./BrandGuidelinesPageClient"; // ✅ direct import (it's ok)

export async function generateMetadata() {
    return generatePageMetadata("brandGuideline");
}

export default function Page() {
    return <BrandGuidelinesPageClient />;
}
