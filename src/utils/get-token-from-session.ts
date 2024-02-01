import {getSession} from "next-auth/react";
import {ssoApi} from "../constance/auth";

const key = ssoApi.access_token_Key

const getTokenFromSession = async (): Promise<string | null | undefined> => {

    let lc = localStorage.getItem(key)
    
    if (lc)
        return lc

    const session = await getSession();

    const validate = ssoApi.getSession.type.safeParse(session)

    if (validate.success) {

        const token = validate.data.access_token

        localStorage.setItem(key, token)

        return token;
    }

    return null;
};
export default getTokenFromSession;