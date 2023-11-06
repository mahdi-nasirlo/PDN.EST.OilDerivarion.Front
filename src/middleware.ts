export {default} from "next-auth/middleware"

export const config = {
    matcher: [
        "/admin-panel/:path*",
        "/producer/:path*",
        "/state-org-manager/:path*"
    ]
}

// export async function middleware(request: NextRequest) {
//
//
// }

// export default async function middleware(request: NextRequest) {
//
//     const pathname = request.nextUrl.pathname
//
//     const hasApiToken = request.cookies.has('accessToken')
//
//     const params = request.nextUrl.searchParams
//
//     checkAuthentication()
//
//     if (pathname.startsWith('/dashboard') && !hasApiToken) {
//         console.log('/auth/login')
//         // return NextResponse.redirect(new URL('/auth/login', request.url))
//     }
//
//     if (pathname.startsWith('/auth') && hasApiToken) {
//         return NextResponse.redirect(new URL('/dashboard', request.url));
//     }
//
//     if (pathname === '/') {
//         return NextResponse.redirect(new URL('/login', request.url));
//     }
//
//     if (request.nextUrl.searchParams.has('code') && pathname !== "/getToken") {
//
//         return NextResponse.redirect(new URL("/getToken?code=" + request.nextUrl.searchParams.get("code"), request.url))
//         // try {
//         //     console.log(request.nextUrl.searchParams.get("code"))
//         //
//         //     const token = await getToken(request, params.get('code') || '', request.nextUrl.origin + request.nextUrl.pathname);
//         //
//         //     if (token) {
//         //
//         //         const response = NextResponse.redirect(new URL(pathname, request.url));
//         //
//         //         response.cookies.set("accessToken", token, {
//         //             httpOnly: false,
//         //             secure: false,
//         //             sameSite: "none",
//         //             maxAge: 60 * 60,
//         //         });
//         //
//         //         return response;
//         //     }
//         //
//         // } catch (e) {
//         //
//         //     return NextResponse.redirect(new URL("/login", request.url))
//         //
//         // }
//
//     }
//
//     if (params.has('logout')) {
//         const response = NextResponse.redirect(new URL('/auth/login', request.url))
//
//         response.cookies.delete('accessToken')
//
//         return response
//     }
// }
//
// const checkAuthentication = async () => {
//
//     const session = await customFetch({
//         url: {
//             path: process.env.NEXTAUTH_URL + "/api/auth/session", absolute: true
//         }
//     })
//
//     const res = await session.json()
//
//     console.log(res, session.url)
//
// }
//
// async function getToken(request: NextRequest, code: string, redirectUrl: string) {
//
//     let data = {
//         "code": code,
//         "RedirectUri": redirectUrl
//     }
//
//     const response = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/api/V1/Sso/GetToken`, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     });
//
//     const responseData = await response.json();
//
//     console.log(responseData?.data?.access_token)
//     return responseData?.data?.access_token
// }