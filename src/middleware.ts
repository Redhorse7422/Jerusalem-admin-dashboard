import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value; // Read token from cookies

  const isAuthPage = req.nextUrl.pathname.startsWith("/auth/sign-in");

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|_static|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|css|js)).*)",
  ],
};


// // import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// // const isPublicRoute = createRouteMatcher(["/sign-in"]);

// // export default clerkMiddleware(async (auth, req) => {
// //   if (!isPublicRoute(req)) {
// //     await auth.protect();
// //   }
// // });

// // export const config = {
// //   matcher: [
// //     // Skip Next.js internals and all static files, unless found in search params
// //     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
// //     // Always run for API routes
// //     "/(api|trpc)(.*)",
// //   ],
// // };


// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("auth_token")?.value;

//   if (!token && req.nextUrl.pathname !== "/auth/sign-in") {
//     return NextResponse.redirect(new URL("/auth/sign-in", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/"], // Protect specific routes
// };

// // export const config = {
// //   matcher: [
// //     // Skip Next.js internals and all static files, unless found in search params
// //     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
// //     // Always run for API routes
// //     "/(api|trpc)(.*)",
// //   ],
// // };