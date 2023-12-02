import {getCsrfToken} from "next-auth/react";
import customFetch from "../lib/server/customeFetcher";

const signingServer = async (code: string) => {

    const res = await customFetch({
        url: {path: "/api-front/auth/signin/credentials"},
        method: "POST",
        data: {
            csrfToken: getCsrfToken(),
            code: code
        }
    })

};

export default signingServer;