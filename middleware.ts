import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/cabinet", "/catalog", "/orders"];
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.agrow.asia";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isProtected = PROTECTED_ROUTES.some((route) =>
        pathname.startsWith(route)
    );

    if (!isProtected) {
        return NextResponse.next();
    }

    // берём куки из запроса
    const cookieHeader = request.headers.get("cookie") ?? "";

    try {
        const response = await fetch(`${API_URL}/api/v1/iam/me`, {
            method: "GET",
            headers: {
                "Cookie": cookieHeader,
                "X-Client-Type": "web",
            },
        });

        if (!response.ok) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        // пропускаем и сообщаем layout-у что юзер авторизован
        const nextResponse = NextResponse.next();
        nextResponse.headers.set("x-auth-status", "authenticated");
        return nextResponse;

    } catch {
        // бэк недоступен — редиректим на логин
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: ["/cabinet/:path*", "/catalog/:path*", "/orders/:path*"],
};