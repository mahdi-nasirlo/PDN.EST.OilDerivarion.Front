import {useEffect} from 'react';
import {useValidation} from "@/hooks/use-validation";
import useRequestPackageInfo from "@/hooks/material/use-request-package-part-info";
import useRequestPackagePartUpdateProcessDescription
    from "@/hooks/material/use-request-package-part-update-process-description";
import {z} from "zod";

const useUiRequestProductDescriptionForm = (uid: string) => {

    const requestInfo = useRequestPackageInfo(uid)

    const updateDesc = useRequestPackagePartUpdateProcessDescription()

    const [form, rule] = useValidation(updateDesc.type)

    useEffect(() => {

        if (requestInfo.data) {
            form.setFieldsValue(requestInfo.data)
        }

    }, [requestInfo.data])

    const onFinish = async (data: z.infer<typeof updateDesc.type>) => {

        await updateDesc.mutateAsync({
            part_UID: uid,
            process_description: data.process_description
        })
        
    }

    return {requestInfo, form, rule, updateDesc, onFinish}
};

export default useUiRequestProductDescriptionForm;