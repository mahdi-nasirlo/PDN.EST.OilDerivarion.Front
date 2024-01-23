
import { generalResponseZod } from "@/types/api-response"
import { z } from "zod"

const ssoApi = {
    checkToken: {
        url: "/Sso/CheckToken",
        response: generalResponseZod.extend({
                data: z.object({
                clientId: z.string(),
                redirectUri: z.string(),
                ssoUrl: z.string()
            })
        })
    },
    getToken: {
        url: "/Sso/GetToken",
        response: generalResponseZod.extend({
            data: z.object({
                access_token: z.string(),
                token_type: z.string()
            })
        }),
        type: z.object({
            code: z.string()
        })
    }
}

export {ssoApi}