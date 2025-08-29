// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/", // optional: allow landing page
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect(); // everything else requires auth
  }
});

export const config = {
  matcher: [
    // Apply Clerk to everything except static files
    "/((?!_next|.*\\..*).*)",
  ],
};
