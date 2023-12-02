export {default} from "next-auth/middleware"

export const config = {
    matcher: [
        "/admin-panel/:path*",
        "/producer/:path*",
        "/state-org-manager/:path*"
    ]
}