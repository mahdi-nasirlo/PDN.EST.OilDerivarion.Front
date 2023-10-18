import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../lib/server/mutationFetcher";
import {mutate} from "swr";

const UseDeleteStep = (): {
    isMutating: boolean,
    trigger: (arg: { "requestMasterUid": string, "stepNumber": number }) => void
} => {

    const {trigger, isMutating} = useSWRMutation("/RequestDetail/DeleteStep", mutationFetcher)

    const handleSubmit = async (arg: { "requestMasterUid": string, "stepNumber": number }) => {

        await trigger(arg)

        await mutate("/RequestDetail/FinalPage")

    }

    return {trigger: handleSubmit, isMutating}

};

export default UseDeleteStep;