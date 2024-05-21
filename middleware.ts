import { NextRequest } from "next/server";
import { i18n } from "@/i18n.config";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import * as jose from "jose";
import { decodeJWT } from "@/app/util/authentication";

// When reactivating french check commit from SSA-1885

export const middleware = async (request: NextRequest) => {
  const accessToken: RequestCookie | undefined =
    request.cookies.get("access_token");

  let decodedAccessToken: false | jose.JWTPayload = false;
  if (accessToken?.value) {
    decodedAccessToken = await decodeJWT(accessToken.value);
  }

  const refreshToken: RequestCookie | undefined =
    request.cookies.get("refresh_token");

  const { pathname } = request.nextUrl;
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (process.env.NODE_ENV !== "development") {
    if (!accessToken || !refreshToken || !decodedAccessToken) {
      return Response.redirect(
        `${process.env.NEXT_PUBLIC_PORTAL_APP_URL}/en/login`,
      );
    }
  }

  // If pathname does not have locale, add it and redirect
  if (!pathnameHasLocale) {
    request.nextUrl.pathname = `/en${pathname}`;
    return Response.redirect(request.nextUrl);
  }

  // If tokens are present and pathname has locale, continue without redirecting
  return;
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images png and svg
     */
    "/((?!api|_next/static|_next/image|.*.png|.*.svg|favicon.ico).*)",
  ],
};
