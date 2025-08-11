import { getServiceListBySlug } from "@/graphql/queries/getServieceList";
import { generatePageMetadata } from "@/utils/generatePageMetadata";
import { notFound } from "next/navigation";
import ContentfulClient from "./ContentfulClient";

export async function generateMetadata() {
    return generatePageMetadata("serviceLists", "/contentful");
}

export default async function ContentfulPage() {
    const service = "contentful";
    const data = await getServiceListBySlug(service);

    if (!data) return notFound();

    return <ContentfulClient data={data} />;
}
