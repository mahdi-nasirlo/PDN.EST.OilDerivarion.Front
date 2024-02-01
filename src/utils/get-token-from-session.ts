import {getSession} from "next-auth/react";
import {ssoApi} from "../constance/auth";

const getTokenFromSession = async (): Promise<string | null | undefined> => {

    let lc = localStorage.getItem("access_token")
    
    if (lc)
        return lc

    const session = await getSession();

    const validate = ssoApi.getSession.type.safeParse(session)

    if (validate.success) {

        const token = validate.data.access_token

        localStorage.setItem("access_token", token)

        return token;
    }

    return null;
};
export default getTokenFromSession;