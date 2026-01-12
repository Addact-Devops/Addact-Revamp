import { NextResponse } from 'next/server';

export async function GET() {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const SITEMAP_URL = `${STRAPI_URL}/api/strapi-5-sitemap-plugin/sitemap.xml`;

  try {
    const response = await fetch(SITEMAP_URL, {
      method: 'GET',
      headers: {
        // Optional: Include auth token if your sitemap is private
        // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(`Error fetching sitemap: ${response.status} ${response.statusText}`);
      return new NextResponse('Error fetching sitemap', { status: response.status });
    }

    const xmlData = await response.text();

    return new NextResponse(xmlData, {
      headers: {
        'Content-Type': 'text/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
      },
    });
  } catch (error) {
    console.error('Error serving sitemap:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
