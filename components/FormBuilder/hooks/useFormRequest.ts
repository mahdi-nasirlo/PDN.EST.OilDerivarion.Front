import useGetForm from "./useGetForm";
import useSetForm from "./useSetForm";

const useFormRequest = (uid: string) => {

    const getForm = useGetForm(uid)

    const setForm = useSetForm(uid)

    const onSet = async (data: any) => {

        await setForm.onSet(data)

        await getForm.mutate()

    }

    return {
        data: getForm.data,
        isLoading: getForm.isLoading || getForm.isValidating || setForm.isMutating,
        mutate: getForm.mutate,
        onSet: onSet,
    }
};

export default useFormRequest;