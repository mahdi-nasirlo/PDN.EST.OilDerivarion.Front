import {getSession} from "next-auth/react";
import {Session} from "next-auth";

const getTokenFromSession = async (): Promise<string | null | undefined> => {
    const session = await getSession();

    if (session !== null) {

        const sessionData: Session & { access_token?: string } = session
        
        return sessionData.access_token;
    }

    return null;
};
export default getTokenFromSession;