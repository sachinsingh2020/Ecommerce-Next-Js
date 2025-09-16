import { NextResponse } from "next/server";
import { USER_DASHBOARD, WEBSITE_LOGIN } from "./routes/WebsiteRoute";
import { jwtVerify } from "jose";
import { ADMIN_DASHBOARD } from "./routes/AdminPanelRoute";

export async function middleware(request) {
  try {
    const pathname = request.nextUrl.pathname;
    const hasToken = request.cookies.has("access_token");

    if (!hasToken) {
      // if the user is not logged in  and trying to access a protected route, redirect to login page
      if (!pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
      }

      return NextResponse.next();
    }

    // verify token
    const access_token = request.cookies.get("access_token").value;
    const { payload } = await jwtVerify(
      access_token,
      new TextEncoder().encode(process.env.SECRET_KEY)
    );

    const role = payload.role;

    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(
        new URL(
          role === "admin" ? ADMIN_DASHBOARD : USER_DASHBOARD,
          request.nextUrl
        )
      );
    }

    if (pathname.startsWith("admin") && role !== "admin") {
      return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
    }

    if (pathname.startsWith("/my-account") && role != "user") {
      return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/my-account/:path*", "/auth/:path*"],
};
