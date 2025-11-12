import { withAuth } from "next-auth/middleware";

// Helper function to handle redirect with callback URL
const redirectWithCallback = (target, req) => {
  const { pathname, searchParams } = req.nextUrl;
  const targetUrl = new URL(target, req.url);
  const currentRelative = pathname + (req.nextUrl.search || "");
  const existingCallback = searchParams.get("callbackUrl");
  const callbackValue = existingCallback || currentRelative;

  if (callbackValue) {
    targetUrl.searchParams.set("callbackUrl", callbackValue);
  }

  return Response.redirect(targetUrl);
};

// Main middleware function
const middleware = (req) => {
  const token = req.nextauth?.token;
  const pathname = req.nextUrl.pathname;
  const isDashboardAuth = pathname.startsWith("/dashboard/auth");
  const isUserAuth = pathname.startsWith("/user/auth");
  const isDashboard = pathname.startsWith("/dashboard");
  const isUser = pathname.startsWith("/user");

  // If no token, handle redirects based on the requested path
  if (!token) {
    if (isDashboard) {
      if (!isDashboardAuth) {
        return redirectWithCallback("/dashboard/auth", req);
      }
    } else if (isUser) {
      if (!isUserAuth) {
        return redirectWithCallback("/user/auth", req);
      }
    }
    return;
  }

  // If token exists, handle role-based redirects
  if (token) {
    if (isDashboardAuth || isUserAuth) {
      if (token.role === "ADMIN" && isDashboardAuth) {
        return Response.redirect(new URL("/dashboard", req.url));
      }
      if (token.role !== "ADMIN" && isUserAuth) {
        return Response.redirect(new URL("/user", req.url));
      }
    }

    // Redirect non-admin users trying to access the dashboard
    if (isDashboard && token.role !== "ADMIN") {
      return Response.redirect(new URL("/user", req.url));
    }
  }
};

// Wrap the middleware with `withAuth` to handle session-based authorization
export default withAuth(middleware, {
  callbacks: {
    authorized: ({ token, req }) => {
      const pathname = req.nextUrl.pathname;
      if (pathname.startsWith("/user/auth") || pathname.startsWith("/dashboard/auth")) {
        return true;
      }
      return !!token;
    },
  },
});

// Configure the middleware to match specific paths
export const config = {
  matcher: ["/dashboard/:path*", "/user/:path*"],
};
