import customFetch from "../lib/server/customeFetcher";

interface GetTokenResponseType {
    success: boolean,
    data: {
        token_type: string,
        expires_in: string,
        access_token: string
    }
}

async function getToken(code: string, redirectUrl: string) {

    let data = {
        "code": code,
        "RedirectUri": redirectUrl
    }

    try {

        const res = await customFetch({url: {path: "/Sso/GetToken"}, method: "POST", data})

        const response: GetTokenResponseType = await res.json()

        return response

    } catch (e) {
        console.log("error getToken")
    }

    // return responseData?.data?.access_token
    // console.log(responseData?.data?.access_token)
}

export default getToken