import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin and mutating API routes
  const isAdminRoute = pathname.startsWith("/admin");
  const isProtectedApi =
    (pathname.startsWith("/api/projects") && req.method === "POST") ||
    pathname.startsWith("/api/upload");

  if (!isAdminRoute && !isProtectedApi) {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    if (authValue) {
      const [user, pwd] = atob(authValue).split(":");

      const validUser = process.env.ADMIN_USER;
      const validPassword = process.env.ADMIN_PASSWORD;

      if (user === validUser && pwd === validPassword) {
        return NextResponse.next();
      }
    }
  }

  // Request browser Basic Auth prompt
  return new NextResponse("Unauthorized access.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure CMS Admin"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/projects", "/api/upload"],
};