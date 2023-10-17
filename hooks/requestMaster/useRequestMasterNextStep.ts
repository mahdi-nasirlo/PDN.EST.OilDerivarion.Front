import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../lib/server/mutationFetcher";

const useRequestMasterNextStep = (): {
    isMutating: boolean,
    trigger: (uid: { uid: string }) => any
} => {

    const {isMutating, trigger} = useSWRMutation("/RequestMaster/NextStep", mutationFetcher)

    return {isMutating, trigger}
};

export default useRequestMasterNextStep;