// import {mutationFetcher} from "../../lib/server/mutationFetcher";
import {mutationFetcherGetForLogout} from "../../lib/server/mutationFetcherGetForLogout";
import useSWRMutation from "swr/mutation";

const useSignOut = () => useSWRMutation("/Sso/Logout", mutationFetcherGetForLogout);

export default useSignOut;