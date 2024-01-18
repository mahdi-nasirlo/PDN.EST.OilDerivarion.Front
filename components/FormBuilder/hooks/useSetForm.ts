import useSWRMutation from "swr/mutation";
import {apiUrl} from "../../../Constants/apiUrl";
import customFetch from "../../../lib/server/customeFetcher";

const useSetForm = (uid: string) => {

    const requestBody = {
        categoryID: uid,
    }

    const {data, error, trigger, reset, isMutating} = useSWRMutation(
        apiUrl.FormMaker.set.url, 
        (url, arg) => customFetch({url: {path: url}, data: arg.arg, method: "POST"})
        )

    const onSet = async (data: any) => {

        const newData = {...requestBody, records: data ? JSON.stringify(data) : null}

        // @ts-ignore
        const res = await trigger(newData)

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