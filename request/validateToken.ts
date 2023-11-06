import customFetch from "../lib/server/costumeFetcher";

export const validateToken = async () => {

    const res = await customFetch({url: {path: "/Sso/ValidToken"}, method: "POST"})

    const data: ValidateTokenType | undefined = await res.json()

    if (res.status === 401 && data?.ssoUrl) {

        return {validate: false, data: data}

    }

    return {validate: true, data: null}
}

export interface ValidateTokenType {
    clientId: string,
    redirectUri: string,
    ssoUrl: string
}
