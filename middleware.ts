// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  // const publicPaths = ["/signin", "/signup"];
  // const isPublic = publicPaths.some((path) =>
  //   req.nextUrl.pathname.startsWith(path)
  // );

  // if (isPublic && token) {
  //   // ✅ logged in user should not see signin/signup
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  // if (!isPublic && !token) {
  //   // ✅ no token → protect route
  //   return NextResponse.redirect(new URL("/signin", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
