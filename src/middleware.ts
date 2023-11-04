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
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (pathname === '/') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (request.nextUrl.searchParams.has('code')) {

        console.log(request.nextUrl.searchParams.get("code"))

        const token = await getToken(request, params.get('code') || '', request.nextUrl.origin + request.nextUrl.pathname);

        if (token) {

            const response = NextResponse.redirect(new URL(pathname, request.url));

            response.cookies.set("accessToken", token, {
                httpOnly: false,
                secure: false,
                sameSite: "none",
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

async function getToken(request: NextRequest, code: string, redirectUrl: string) {

    let data = {
        "code": code,
        "RedirectUri": redirectUrl
    }

    const response = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/api/V1/Sso/GetToken`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();

    console.log(responseData?.data?.access_token)
    return responseData?.data?.access_token
}