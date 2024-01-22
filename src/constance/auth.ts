import { z } from "zod"

const ssoApi = {
    checkToken: {
        url: "/Sso/CheckToken",
        type: z.object({
                clientId: z.string(),
                redirectUri: z.string(),
                ssoUrl: z.string()
        })
    }
}

export {ssoApi}