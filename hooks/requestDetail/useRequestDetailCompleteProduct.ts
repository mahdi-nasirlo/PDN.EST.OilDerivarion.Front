import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../lib/server/mutationFetcher";

const UseRequestDetailCompleteMaterial = (): {
    isMutating: boolean,
    trigger: (uid: { requestMasterUid: string }) => any
} => {

    const {isMutating, trigger} = useSWRMutation("RequestDetail/CompleteProduct", mutationFetcher)

    return {isMutating, trigger}
};

export default UseRequestDetailCompleteMaterial;