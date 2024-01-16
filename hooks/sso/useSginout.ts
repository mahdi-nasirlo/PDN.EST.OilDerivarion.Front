import {mutationFetcher} from "../../lib/server/mutationFetcher";
import useSWRMutation from "swr/mutation";


const useSignOut = () => useSWRMutation("/Sso/Logout", () => customeFetcher({
    url: {path: "/Sso/Logout"},
    method: "GET"
}))

export default useSignOut;