import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const country = req.headers.get("x-vercel-ip-country") || "";

  if (["PK", "CN"].includes(country)) {
    return new NextResponse("Access Denied", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/:path*"],
};
