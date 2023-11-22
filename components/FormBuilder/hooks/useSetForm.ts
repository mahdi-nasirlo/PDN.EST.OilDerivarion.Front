import useSWRMutation from "swr/mutation";
import {apiUrl} from "../../../Constants/apiUrl";
import {mutationFetcher} from "../../../lib/server/mutationFetcher";

const useSetForm = (uid: string) => {

    const requestBody = {
        categoryID: uid,
    }

    const {data, error, trigger, reset, isMutating} = useSWRMutation(apiUrl.FormMaker.set.url, mutationFetcher)

    const onSet = async (data: any) => {

        const res = await trigger({...requestBody, records: JSON.stringify(data)})

        return res
    }

    return {
        data,
        error,
        reset,
        isMutating,
        onSet: onSet
    }
};

export default useSetForm;