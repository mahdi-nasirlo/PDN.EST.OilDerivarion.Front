import {NextRequest, NextResponse} from "next/server";

export default async function middleware(request: NextRequest) {

    const pathname = request.nextUrl.pathname

    const hasApiToken = request.cookies.has('accessToken')

    const params = request.nextUrl.searchParams


    if (pathname.startsWith('/dashboard') && !hasApiToken) {
        console.log('/auth/login')
        // return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    if (pathname.startsWith('/auth') && hasApiToken) {
        console.log('/dashboard')
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (pathname === '/') {
        console.log("/")
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (request.nextUrl.searchParams.has('code')) {

        const token = await getToken(request, params.get('code') || '', request.nextUrl.origin + request.nextUrl.pathname);

        if (token) {

            const response = NextResponse.redirect(new URL('/dashboard', request.url));

            response.cookies.set("accessToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 60 * 60,
            });

            return response;
        }

    }

    if (params.has('logout')) {
        const response = NextResponse.redirect(new URL('/auth/login', request.url))

        response.cookies.delete('accessToken')

        return response
    }
}

export const config = {
    matcher: ['/auth/:path*', '/dashboard/:path*', '/'],
}

async function getToken(request: NextRequest, code: string, redirectUrl: string) {

    let data = {
        "code": code,
        "RedirectUri": redirectUrl
    }

    // console.log(data)

    const response = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/security/getToken`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
    }

    const responseData = await response.json();

    console.log(responseData.data?.access_token)
    return responseData.data?.access_token
}