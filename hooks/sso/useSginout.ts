import useSWRMutation from "swr/mutation";
import customeFetcher from "../../lib/server/customeFetcher";

const apiUrl = process.env.NEXT_PUBLIC_API_URL


const useSignOut = () => useSWRMutation("/Sso/Logout", () => customeFetcher({
    url: {path: "/Sso/Logout"},
    method: "GET"
}))

export default useSignOut;