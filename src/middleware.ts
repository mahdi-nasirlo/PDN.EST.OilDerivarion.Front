export {default} from "next-auth/middleware"

export const config = {
    matcher: [
        "/:path",
        "/admin-panel/:path*",
        "/producer/:path*",
        "/state-org-manager/:path*"
    ]
}