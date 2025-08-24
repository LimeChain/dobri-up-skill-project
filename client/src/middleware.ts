import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function validateToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.API_URL}${process.env.API_URL_PREFIX}/auth/verify`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/login", "/register"];

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  let isValidToken = false;
  if (tokenCookie?.value) {
    isValidToken = await validateToken(tokenCookie.value);
  }

  if (isValidToken && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isValidToken && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
