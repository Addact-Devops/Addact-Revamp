import BlogListClient from "./BlogListClient";
import { generatePageMetadata } from "@/utils/generatePageMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata("blogs");
}

export default function BlogListPage() {
    return (
        <main className="bg-[#0E0D0D]">
            <BlogListClient />
        </main>
    );
}
