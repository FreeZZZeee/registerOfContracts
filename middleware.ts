import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    apiPrefix,
    authRoutes,
    publicRoutes
} from "@/routes"

export const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isApiRoute = apiPrefix.includes(nextUrl.pathname);
    const isApiRouteId = apiPrefix.includes(nextUrl.pathname.slice(0, nextUrl.pathname.lastIndexOf('/')));

    if (isApiAuthRoute) {
        return;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    if (isApiRoute || isApiRouteId) {
        return;
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        return Response.redirect(new URL(
            `/auth/login?callbackUrl=${encodedCallbackUrl}`,
            nextUrl));
    }

    return;
})

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

