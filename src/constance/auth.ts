
import { generalResponseZod } from "@/types/api-response"
import { z } from "zod"

const ssoApi = {
    getAllUserAccess: {
        url: "/Sso/GetAllUserAccess",
    },
    getUserInfo: {
        url: "/Sso/GetUserInfo",
        response: generalResponseZod.extend({
            data: z.object({
                lastName: z.string(),
                firstName: z.string()
            })
        })
    },
    logout: {
        url: "/Sso/CheckToken",
        response: generalResponseZod.extend({
                data: z.object({
                    clientId: z.string(),
                    redirectUri: z.string(),
                    ssoUrl: z.string()
                }).optional()
            })
    },
    checkToken: {
        url: "/Sso/CheckToken",
        response: generalResponseZod.extend({
                data: z.object({
                    clientId: z.string(),
                    redirectUri: z.string(),
                    ssoUrl: z.string()
                }).optional()
            })
    },
    getToken: {
        url: "/Sso/GetToken",
        response: generalResponseZod.extend({
            data: z.object({
                access_token: z.string().min(10, "توکن اجباری می باشد."),
                token_type: z.string()
            })
        }),
        type: z.object({
            code: z.string()
        })
    }
}

export {ssoApi}