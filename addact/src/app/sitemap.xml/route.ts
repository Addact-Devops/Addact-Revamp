import { NextResponse } from "next/server";
import { getPrimarySitemapXml, getSitemapRevalidateSeconds } from "@/utils/sitemap";

export async function GET() {
  try {
    const xmlData = await getPrimarySitemapXml();

    return new NextResponse(xmlData, {
      headers: {
        "Content-Type": "text/xml",
        "Cache-Control": `public, s-maxage=${getSitemapRevalidateSeconds()}, stale-while-revalidate=59`,
      },
    });
  } catch (error) {
    console.error("Error serving sitemap:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
