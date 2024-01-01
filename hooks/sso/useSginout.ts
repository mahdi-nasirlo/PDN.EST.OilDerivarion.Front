import {mutationFetcher} from "../../lib/server/mutationFetcher";
import useSWRMutation from "swr/mutation";

const useSignOut = () => useSWRMutation("/Sso/Logout", mutationFetcher);

export default useSignOut;