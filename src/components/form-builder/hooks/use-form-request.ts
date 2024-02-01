// export interface ReturnedTypeFormRequest {
//     data: {
//         schema: {
//             jsonVersion: number,
//             json: string
//         },
//         records?: any
//     } | undefined | null,
//     isLoading: boolean,
//     mutate: () => void,
//     onSet: (data: any) => any
// }

import {useGetForm} from "@/hooks/form-maker/use-get-form";
import {useSetForm} from "@/hooks/form-maker/use-set-form";

const useFormRequest = (uid: string | undefined) => {

    const get = useGetForm(uid)

    const set = useSetForm(uid)

    return {
        get,
        set
    }
};

export default useFormRequest;