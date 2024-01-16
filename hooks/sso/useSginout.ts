import useSWRMutation from "swr/mutation";
import customeFetcher from "../../lib/server/customeFetcher";


const useSignOut = () => useSWRMutation("/Sso/Logout", () => customeFetcher({
    url: {path: "/Sso/Logout"},
    method: "GET"
}))

export default useSignOut;