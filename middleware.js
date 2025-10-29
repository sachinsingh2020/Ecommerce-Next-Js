import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { USER_DASHBOARD, WEBSITE_LOGIN } from "./routes/WebsiteRoute";
import { ADMIN_DASHBOARD } from "./routes/AdminPanelRoute";

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;

  try {
    const accessToken = request.cookies.get("access_token")?.value;

    // -------------------------------
    // 1️⃣ NO TOKEN → only /auth allowed
    // -------------------------------
    if (!accessToken) {
      // Allow only login/register routes if not logged in
      if (pathname.startsWith("/auth")) {
        return NextResponse.next();
      }

      // Redirect all protected routes to login
      if (pathname.startsWith("/admin") || pathname.startsWith("/my-account")) {
        return NextResponse.redirect(new URL(WEBSITE_LOGIN, origin));
      }

      return NextResponse.next();
    }

    // -------------------------------
    // 2️⃣ VERIFY TOKEN
    // -------------------------------
    const { payload } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(process.env.SECRET_KEY)
    );
    const role = payload.role;

    // -------------------------------
    // 3️⃣ Already logged in → block /auth
    // -------------------------------
    if (pathname.startsWith("/auth")) {
      const redirectTo =
        role === "admin"
          ? new URL(ADMIN_DASHBOARD, origin)
          : new URL(USER_DASHBOARD, origin);
      return NextResponse.redirect(redirectTo);
    }

    // -------------------------------
    // 4️⃣ Role-based access control
    // -------------------------------
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL(WEBSITE_LOGIN, origin));
    }

    if (pathname.startsWith("/my-account") && role !== "user") {
      return NextResponse.redirect(new URL(WEBSITE_LOGIN, origin));
    }

    // -------------------------------
    // ✅ Default: allow request
    // -------------------------------
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error.message);
    // On invalid/expired token, force logout
    const response = NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url));
    response.cookies.delete("access_token");
    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*", "/my-account/:path*", "/auth/:path*"],
};
