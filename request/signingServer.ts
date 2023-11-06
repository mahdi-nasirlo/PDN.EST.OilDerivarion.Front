import customFetch from "../lib/server/costumeFetcher";
import {getCsrfToken} from "next-auth/react";

const signingServer = async (code: string) => {

    const res = await customFetch({
        url: {path: "/api/auth/signin/credentials"},
        method: "POST",
        data: {
            csrfToken: getCsrfToken(),
            code: code
        }
    })

};

export default signingServer;